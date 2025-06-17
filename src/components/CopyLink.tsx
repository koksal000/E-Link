"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CopyLinkProps {
  link: string;
}

export default function CopyLink({ link }: CopyLinkProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      toast({ title: "Copied!", description: "Link copied to clipboard.", className: "bg-green-500 text-white" });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
      toast({ title: "Error", description: "Failed to copy link.", variant: "destructive" });
    }
  };

  if (!link) return null;

  return (
    <Card className="w-full max-w-lg mx-auto mt-8 shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-headline text-center text-primary">Your Link is Ready!</CardTitle>
        <CardDescription className="text-center text-muted-foreground">
          Share this link publicly.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Input type="text" value={link} readOnly className="flex-grow bg-muted border-border focus-visible:ring-primary" aria-label="Generated public link" />
          <Button onClick={handleCopy} variant="outline" size="icon" aria-label={copied ? "Copied" : "Copy link"}>
            {copied ? <Check className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5 text-primary" />}
          </Button>
        </div>
        {copied && <p className="text-sm text-green-600 text-center">Link copied to clipboard!</p>}
      </CardContent>
    </Card>
  );
}
