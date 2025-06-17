"use client";

import { useState, useCallback, ChangeEvent, DragEvent } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { UploadCloud, FileImage, FileVideo, FileText, XCircle, Loader2, CheckCircle2 } from "lucide-react";
import type { LucideIcon } from 'lucide-react';

interface FileUploadProps {
  onLinkGenerated: (link: string) => void;
}

const acceptedFileTypes: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png", // Added PNG as it's very common
  "video/mp4": ".mp4",
  "text/html": ".html",
};

const getFileIcon = (fileType: string): LucideIcon => {
  if (fileType.startsWith("image/")) return FileImage;
  if (fileType.startsWith("video/")) return FileVideo;
  if (fileType === "text/html") return FileText;
  return FileText; // Default icon
};

export default function FileUpload({ onLinkGenerated }: FileUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const handleFileProcessing = useCallback(async (file: File) => {
    if (!acceptedFileTypes[file.type]) {
      const err = `Unsupported file type: ${file.type}. Supported types are JPG, PNG, MP4, HTML.`;
      setError(err);
      toast({ title: "Upload Error", description: err, variant: "destructive" });
      setSelectedFile(null);
      return;
    }

    setIsLoading(true);
    setError(null);
    setProgress(0);

    // Simulate upload progress
    let currentProgress = 0;
    const progressInterval = setInterval(() => {
      currentProgress += 10;
      if (currentProgress <= 100) {
        setProgress(currentProgress);
      } else {
        clearInterval(progressInterval);
      }
    }, 150);
    
    // Simulate backend processing
    setTimeout(() => {
      clearInterval(progressInterval);
      setProgress(100);

      const fileExtension = acceptedFileTypes[file.type];
      const fileNameWithoutExtension = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
      const mockFileId = `${fileNameWithoutExtension.replace(/[^a-zA-Z0-9]/g, '-')}-${Date.now()}`;
      const generatedLink = `https://cdn.e-link.com/files/${mockFileId}${fileExtension}`;
      
      onLinkGenerated(generatedLink);
      setIsLoading(false);
      toast({ title: "Link Generated!", description: "Your file link is ready.", variant: "default", className: "bg-green-500 text-white" });
      // Keep selectedFile to show info, or clear it:
      // setSelectedFile(null); 
    }, 1500 + Math.random() * 1000); // Simulate network delay + processing
  }, [onLinkGenerated, toast]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setError(null);
      handleFileProcessing(file);
    }
  };

  const handleDrop = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file) {
      setSelectedFile(file);
      setError(null);
      handleFileProcessing(file);
    }
  }, [handleFileProcessing]);

  const handleDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  }, []);

  const handleDragEnter = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  }, []);


  const clearFile = () => {
    setSelectedFile(null);
    setError(null);
    setIsLoading(false);
    setProgress(0);
    onLinkGenerated(""); // Clear any existing link
  };

  const FileIcon = selectedFile ? getFileIcon(selectedFile.type) : UploadCloud;

  return (
    <Card className={`w-full max-w-lg mx-auto shadow-xl transition-all duration-300 ${isDragging ? 'border-primary ring-2 ring-primary' : ''}`}>
      <CardHeader>
        <CardTitle className="text-2xl font-headline text-center text-primary">Upload Your File</CardTitle>
        <CardDescription className="text-center text-muted-foreground">
          Drag & drop or click to select a file. Supported: JPG, PNG, MP4, HTML.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {!selectedFile || error ? (
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            className={`flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary transition-colors
              ${isDragging ? 'border-primary bg-primary/10' : 'border-border'}`}
            role="button"
            tabIndex={0}
            onClick={() => document.getElementById('fileInput')?.click()}
            onKeyDown={(e) => e.key === 'Enter' && document.getElementById('fileInput')?.click()}
            aria-label="File upload area"
          >
            <UploadCloud className={`h-16 w-16 mb-4 ${isDragging ? 'text-primary' : 'text-muted-foreground'}`} />
            <p className={`text-lg ${isDragging ? 'text-primary' : 'text-muted-foreground'}`}>
              {isDragging ? 'Drop file here' : 'Drag & drop or click to upload'}
            </p>
            <input
              id="fileInput"
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept={Object.keys(acceptedFileTypes).join(",")}
            />
            <p className="text-xs text-muted-foreground mt-2">Max file size: 100MB (simulated)</p>
          </div>
        ) : null}

        {selectedFile && (
          <div className="p-4 border rounded-lg bg-secondary/30 space-y-3">
            <div className="flex items-center space-x-3">
              <FileIcon className="h-10 w-10 text-primary" />
              <div>
                <p className="font-medium text-foreground truncate max-w-xs" title={selectedFile.name}>{selectedFile.name}</p>
                <p className="text-sm text-muted-foreground">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            {isLoading && (
              <div className="space-y-1">
                <Progress value={progress} className="w-full h-2" />
                <p className="text-sm text-primary animate-pulse text-center">Processing... {progress}%</p>
              </div>
            )}
            {!isLoading && !error && (
                 <div className="flex items-center text-green-600">
                    <CheckCircle2 className="h-5 w-5 mr-2" />
                    <span>Processing complete! Link generated.</span>
                 </div>
            )}
            <Button variant="ghost" size="sm" onClick={clearFile} className="w-full text-destructive hover:bg-destructive/10">
              <XCircle className="mr-2 h-4 w-4" /> Clear File
            </Button>
          </div>
        )}

        {error && (
          <div className="p-3 bg-destructive/10 border border-destructive text-destructive rounded-md flex items-center">
            <XCircle className="h-5 w-5 mr-2" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        {isLoading && !error && !selectedFile && ( /* Show generic loader if loading started without file info display yet */
            <div className="flex flex-col items-center justify-center p-4">
                <Loader2 className="h-12 w-12 text-primary animate-spin" />
                <p className="mt-2 text-muted-foreground">Initializing upload...</p>
            </div>
        )}
      </CardContent>
    </Card>
  );
}
