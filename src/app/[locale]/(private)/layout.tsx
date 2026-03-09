import { ReactNode } from 'react';

export default function PrivateLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* 
        You can add shared components here like an authenticated Navbar,
        Sidebar, AppShell wrapper, etc. 
      */}
      <header className="sticky top-0 z-10 w-full border-b border-border bg-background backdrop-blur">
        <div className="container mx-auto flex h-14 items-center px-4">
          <div className="font-semibold">Next Architecture</div>
        </div>
      </header>

      <main className="flex-1 bg-muted/20">{children}</main>
    </div>
  );
}
