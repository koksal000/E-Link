import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Menu, Link2 } from 'lucide-react';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/create-link', label: 'Create Link' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  return (
    <header className="bg-card shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 text-2xl font-headline font-bold text-primary">
          <Link2 className="h-8 w-8" />
          <span>E-Link</span>
        </Link>
        
        <nav className="hidden md:flex space-x-4">
          {navItems.map((item) => (
            <Button key={item.label} variant="ghost" asChild>
              <Link href={item.href} className="text-foreground hover:text-primary transition-colors">
                {item.label}
              </Link>
            </Button>
          ))}
        </nav>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <nav className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => (
                  <Button key={item.label} variant="ghost" asChild className="w-full justify-start text-lg">
                    <Link href={item.href}>
                      {item.label}
                    </Link>
                  </Button>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
