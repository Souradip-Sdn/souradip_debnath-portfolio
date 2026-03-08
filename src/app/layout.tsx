import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Souradip Debnath — Jr. Software Developer",
  description: "Portfolio of Souradip Debnath — Jr. Software Developer, building scalable web apps with Next.js and Firebase.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
