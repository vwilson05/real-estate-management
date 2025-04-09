import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { MobileNav } from "@/components/ui/mobile-nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RE Portfolio Management",
  description: "Real Estate Portfolio Management Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </head>
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen bg-background">
            <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center gap-8">
                    <Link href="/dashboard" className="flex items-center space-x-2">
                      <h1 className="text-xl font-bold">RE Portfolio</h1>
                    </Link>
                    <div className="hidden md:flex items-center space-x-6">
                      <Link
                        href="/dashboard"
                        className="text-foreground/60 transition-colors hover:text-foreground/80"
                      >
                        Dashboard
                      </Link>
                      <Link
                        href="/properties"
                        className="text-foreground/60 transition-colors hover:text-foreground/80"
                      >
                        Properties
                      </Link>
                      <Link
                        href="/transactions"
                        className="text-foreground/60 transition-colors hover:text-foreground/80"
                      >
                        Transactions
                      </Link>
                      <Link
                        href="/repairs"
                        className="text-foreground/60 transition-colors hover:text-foreground/80"
                      >
                        Repairs
                      </Link>
                      <Link
                        href="/todos"
                        className="text-foreground/60 transition-colors hover:text-foreground/80"
                      >
                        Todos
                      </Link>
                      <Link
                        href="/tenants"
                        className="text-foreground/60 transition-colors hover:text-foreground/80"
                      >
                        Tenants
                      </Link>
                      <Link
                        href="/calendar"
                        className="text-foreground/60 transition-colors hover:text-foreground/80"
                      >
                        Calendar
                      </Link>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <ThemeToggle />
                    <MobileNav />
                  </div>
                </div>
              </div>
            </nav>
            <main className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
