import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, FileUp, LinkIcon, Share2 } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  const features = [
    {
      icon: <FileUp className="h-10 w-10 text-primary mb-4" />,
      title: 'Easy File Upload',
      description: 'Simply drag and drop or select files from your device. We support images, videos, HTML files, and more.',
    },
    {
      icon: <LinkIcon className="h-10 w-10 text-primary mb-4" />,
      title: 'Instant Public Links',
      description: 'Get a shareable public link for your file in seconds. No complex configurations needed.',
    },
    {
      icon: <Share2 className="h-10 w-10 text-primary mb-4" />,
      title: 'Share Anywhere',
      description: 'Use your generated link to share files across platforms, with colleagues, or on social media.',
    },
    {
      icon: <CheckCircle className="h-10 w-10 text-primary mb-4" />,
      title: 'Multiple File Types',
      description: 'Convert and host various file types including JPG, MP4, HTML, and more to come.',
    },
  ];

  return (
    <div className="space-y-16">
      <section className="text-center py-16 bg-gradient-to-br from-primary/10 via-background to-accent/10 rounded-xl shadow-lg">
        <h1 className="text-5xl font-headline font-bold text-primary mb-6">
          Welcome to E-Link Comprehensive
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          The simplest way to upload your files and get shareable public links instantly. Transform your images, videos, and HTML files into accessible online resources.
        </p>
        <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-md transition-transform hover:scale-105">
          <Link href="/create-link">
            Get Started Now
            <LinkIcon className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </section>

      <section>
        <h2 className="text-4xl font-headline font-semibold text-center mb-12 text-primary">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <FileUp className="h-12 w-12 text-accent mx-auto mb-2" />
              <CardTitle className="font-headline">1. Upload Your File</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Choose any supported file from your computer.</p>
            </CardContent>
          </Card>
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
               <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--accent))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-2 lucide lucide-cog lucide-spin"><path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"/><path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/><path d="M12 2v2"/><path d="M12 22v-2"/><path d="m17 20.66-1-1.73"/><path d="M11 10.27 7 3.34"/><path d="m20.66 17-1.73-1"/><path d="m3.34 7 1.73 1"/><path d="M14 12h8"/><path d="M2 12h2"/><path d="m20.66 7-1.73 1"/><path d="m3.34 17 1.73-1"/><path d="m17 3.34-1 1.73"/><path d="m11 13.73 4 6.93"/></svg>
              <CardTitle className="font-headline">2. We Process It</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Our system quickly converts and prepares your file.</p>
            </CardContent>
          </Card>
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <LinkIcon className="h-12 w-12 text-accent mx-auto mb-2" />
              <CardTitle className="font-headline">3. Get Your Link</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Copy the public link and share it anywhere!</p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      <section className="py-12">
         <Image src="https://placehold.co/1200x400.png" alt="Abstract network connections" data-ai-hint="network connections" width={1200} height={400} className="rounded-lg shadow-xl mx-auto" />
      </section>

      <section>
        <h2 className="text-4xl font-headline font-semibold text-center mb-12 text-primary">
          Features
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature) => (
            <Card key={feature.title} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="flex flex-row items-start space-x-4">
                {feature.icon}
                <div>
                  <CardTitle className="font-headline text-2xl">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
