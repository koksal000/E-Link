export default function Footer() {
  return (
    <footer className="bg-card shadow-sm py-6 mt-auto">
      <div className="container mx-auto px-4 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} E-Link Comprehensive. All rights reserved.</p>
        <p className="text-sm mt-1">Your go-to solution for easy file sharing.</p>
      </div>
    </footer>
  );
}
