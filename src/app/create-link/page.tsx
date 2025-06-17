"use client";

import { useState } from 'react';
import FileUpload from '@/components/FileUpload';
import CopyLink from '@/components/CopyLink';
import { Sparkles } from 'lucide-react';

export default function CreateLinkPage() {
  const [generatedLink, setGeneratedLink] = useState<string>('');

  const handleLinkGenerated = (link: string) => {
    setGeneratedLink(link);
  };

  return (
    <div className="flex flex-col items-center space-y-8 py-8">
      <div className="text-center">
        <Sparkles className="h-12 w-12 text-accent mx-auto mb-4" />
        <h1 className="text-4xl font-headline font-bold text-primary mb-2">Create Your Public Link</h1>
        <p className="text-lg text-muted-foreground max-w-xl">
          Upload your file and we'll generate a unique, shareable link for you in moments.
        </p>
      </div>
      
      <FileUpload onLinkGenerated={handleLinkGenerated} />
      
      {generatedLink && <CopyLink link={generatedLink} />}
    </div>
  );
}
