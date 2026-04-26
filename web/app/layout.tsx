import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GachiWork",
  description: "한국에서 일하는 외국인 노동자를 위한 정보·전문가·동료 네트워크",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-bg text-ink font-sans">
        {children}
      </body>
    </html>
  );
}
