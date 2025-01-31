"use client";

import { SessionProvider } from "next-auth/react";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <title>イベントカレンダーリスト</title>
      </head>
      <body className={`${notoSansJP.variable}`}>
        <main>
          <SessionProvider>{children}</SessionProvider>
        </main>
      </body>
    </html>
  );
}
