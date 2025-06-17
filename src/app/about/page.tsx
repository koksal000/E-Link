import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Target, Lightbulb } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="space-y-12">
      <Card className="shadow-lg overflow-hidden">
        <CardHeader className="bg-primary/10 p-8">
          <CardTitle className="text-4xl font-headline font-bold text-primary text-center">About E-Link Comprehensive</CardTitle>
        </CardHeader>
        <CardContent className="p-8 space-y-6">
          <p className="text-lg text-foreground leading-relaxed">
            E-Link Comprehensive was born out of a simple need: to make file sharing effortless and accessible to everyone. 
            In a world where digital collaboration and content sharing are paramount, we believe that generating a public link for your files shouldn't be a cumbersome process.
          </p>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-headline text-primary mb-3">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed">
                We envision a seamless digital experience where sharing files is as easy as a few clicks. Whether you're a developer needing to quickly share an HTML prototype, a designer showcasing an image, or anyone wanting to distribute a video, E-Link aims to be your trusted platform.
              </p>
            </div>
            <Image src="https://placehold.co/600x400.png" alt="Team working together" data-ai-hint="team collaboration" width={600} height={400} className="rounded-lg shadow-md" />
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-8">
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader>
            <Target className="h-10 w-10 text-accent mb-3" />
            <CardTitle className="font-headline text-xl text-primary">Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              To provide a fast, reliable, and user-friendly platform for converting various file types into publicly accessible links, simplifying digital sharing for individuals and businesses alike.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader>
            <Lightbulb className="h-10 w-10 text-accent mb-3" />
            <CardTitle className="font-headline text-xl text-primary">Our Values</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li>Simplicity: Easy to use for everyone.</li>
              <li>Speed: Quick conversions and link generation.</li>
              <li>Reliability: Dependable service you can count on.</li>
              <li>Accessibility: Ensuring our platform is usable by all.</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader>
            <Users className="h-10 w-10 text-accent mb-3" />
            <CardTitle className="font-headline text-xl text-primary">Who We Are</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We are a passionate team dedicated to solving everyday digital challenges with innovative solutions. E-Link Comprehensive is one of our efforts to make the web a more connected and efficient place.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
