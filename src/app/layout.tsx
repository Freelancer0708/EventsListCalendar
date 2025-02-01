"use client";

import { SessionProvider } from "next-auth/react";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
});

function toggleMenu() {
  const hamburger = document.querySelector(".hamburger");
  const menu = document.querySelector(".menu");
  hamburger?.classList.toggle("active");
  menu?.classList.toggle("active");
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <title>イベントカレンダーリスト</title>
        <meta name="google-site-verification" content="Gl5cp_6G9iSp1mvgzSIbjuRSvrAjRFe17iSHW1iP0ws" />
      </head>
      <body className={`${notoSansJP.variable}`}>
        <main>
          <SessionProvider>{children}</SessionProvider>
        </main>
        <div className="hamburger" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="menu">
          <Link href={"/"} onClick={toggleMenu}>トップページ</Link>
          <Link href={"/privacy-policy"} onClick={toggleMenu}>プライバシーポリシー</Link>
        </div>
      </body>
    </html>
  );
}
