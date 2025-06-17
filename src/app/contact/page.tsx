import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Send } from "lucide-react";
import Image from "next/image";

export default function ContactPage() {
  const emailAddress = "muctebakoksal@gmail.com";

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-xl overflow-hidden">
        <CardHeader className="bg-primary/10 p-8 text-center">
          <Mail className="h-16 w-16 text-primary mx-auto mb-4" />
          <CardTitle className="text-4xl font-headline font-bold text-primary">Contact Us</CardTitle>
          <CardDescription className="text-lg text-muted-foreground mt-2">
            We'd love to hear from you!
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8 space-y-6">
          <p className="text-lg text-foreground text-center">
            For any inquiries, support requests, or feedback, please feel free to reach out to us via email.
          </p>
          
          <div className="text-center p-6 bg-secondary/50 rounded-lg border border-border">
            <h3 className="text-xl font-semibold text-primary mb-2">Our Email Address:</h3>
            <a 
              href={`mailto:${emailAddress}`} 
              className="text-2xl font-mono text-accent hover:underline break-all"
              aria-label={`Email us at ${emailAddress}`}
            >
              {emailAddress}
            </a>
          </div>

          <div className="text-center">
            <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-md transition-transform hover:scale-105">
              <a href={`mailto:${emailAddress}`}>
                <Send className="mr-2 h-5 w-5" />
                Send Email
              </a>
            </Button>
          </div>
          
          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground text-center">
              We typically respond within 24-48 business hours. Thank you for your patience.
            </p>
          </div>
          <div className="flex justify-center mt-8">
            <Image src="https://placehold.co/400x250.png" alt="Contact illustration" data-ai-hint="communication contact" width={400} height={250} className="rounded-lg shadow-md" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
