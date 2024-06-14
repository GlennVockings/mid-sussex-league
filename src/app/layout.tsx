import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/Navbar";
import { Provider } from "@/lib/Providers";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mid Sussex League",
  description: "Mid sussex league website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={cn("relative h-full font-sans antialiased", inter.className)}>
        <Provider>
          <main className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow flex-1">
              { children }
            </div>
            <Footer />
          </main>
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
