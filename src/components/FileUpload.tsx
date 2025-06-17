
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
  "image/png": ".png",
  "image/gif": ".gif",
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
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const handleFileProcessing = useCallback(async (file: File) => {
    if (!acceptedFileTypes[file.type]) {
      const err = `Unsupported file type: ${file.type}. Supported types are JPG, PNG, GIF, MP4, HTML.`;
      setError(err);
      toast({ title: "Upload Error", description: err, variant: "destructive" });
      setSelectedFile(null);
      return;
    }

    setIsLoading(true);
    setError(null);
    setSelectedFile(file); // Show file info immediately

    const formData = new FormData();
    formData.append('reqtype', 'fileupload');
    formData.append('userhash', ''); // For anonymous uploads
    formData.append('fileToUpload', file);

    try {
      const response = await fetch('https://catbox.moe/user/api.php', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText} (status: ${response.status})`);
      }

      const catboxUrl = await response.text();

      if (!catboxUrl.startsWith('https://files.catbox.moe/')) {
          throw new Error('Invalid response from file hosting service.');
      }

      const parts = catboxUrl.split('/');
      const catboxFileIdWithExt = parts[parts.length - 1];

      const siteBaseUrl = "https://e-link-nine.vercel.app";
      const shareableLink = `${siteBaseUrl}/files/catbox/${catboxFileIdWithExt}`;
      
      onLinkGenerated(shareableLink);
      toast({ title: "Link Generated!", description: "Your file link is ready.", variant: "default", className: "bg-green-500 text-white" });
    } catch (err: any) {
      console.error("Upload error:", err);
      setError(err.message || "An unknown error occurred during upload.");
      toast({ title: "Upload Error", description: err.message || "Could not upload file.", variant: "destructive" });
      onLinkGenerated(""); // Clear any previous link
    } finally {
      setIsLoading(false);
    }
  }, [onLinkGenerated, toast]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileProcessing(file);
    }
  };

  const handleDrop = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file) {
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
    onLinkGenerated(""); 
  };

  const FileIconToRender = selectedFile ? getFileIcon(selectedFile.type) : UploadCloud;

  return (
    <Card className={`w-full max-w-lg mx-auto shadow-xl transition-all duration-300 ${isDragging ? 'border-primary ring-2 ring-primary' : ''}`}>
      <CardHeader>
        <CardTitle className="text-2xl font-headline text-center text-primary">Upload Your File</CardTitle>
        <CardDescription className="text-center text-muted-foreground">
          Drag & drop or click to select a file. Supported: JPG, PNG, GIF, MP4, HTML.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {!selectedFile && !isLoading && !error ? (
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
            <p className="text-xs text-muted-foreground mt-2">Files are uploaded to a temporary host.</p>
          </div>
        ) : null}

        {selectedFile && (
          <div className="p-4 border rounded-lg bg-secondary/30 space-y-3">
            <div className="flex items-center space-x-3">
              <FileIconToRender className="h-10 w-10 text-primary" />
              <div>
                <p className="font-medium text-foreground truncate max-w-xs" title={selectedFile.name}>{selectedFile.name}</p>
                <p className="text-sm text-muted-foreground">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            {isLoading && (
              <div className="space-y-1 flex flex-col items-center">
                <Loader2 className="h-8 w-8 text-primary animate-spin my-2" />
                <p className="text-sm text-primary animate-pulse text-center">Uploading...</p>
              </div>
            )}
            {!isLoading && !error && (
                 <div className="flex items-center text-green-600">
                    <CheckCircle2 className="h-5 w-5 mr-2" />
                    <span>Upload complete! Link generated.</span>
                 </div>
            )}
             {!isLoading && (
                <Button variant="ghost" size="sm" onClick={clearFile} className="w-full text-destructive hover:bg-destructive/10">
                    <XCircle className="mr-2 h-4 w-4" /> Clear File / Upload New
                </Button>
             )}
          </div>
        )}

        {error && !isLoading && (
          <div className="p-3 bg-destructive/10 border border-destructive text-destructive rounded-md flex flex-col items-center space-y-2">
            <div className="flex items-center">
              <XCircle className="h-5 w-5 mr-2 flex-shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
            <Button variant="outline" size="sm" onClick={clearFile} className="text-destructive border-destructive hover:border-destructive/80">
               Try Uploading Again
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
