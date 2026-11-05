import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mid Sussex Football",
  description:
    "Fixtures, results, stories and video from across Mid Sussex grassroots football.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="relative min-h-screen">{children}</div>
      </body>
    </html>
  );
}
