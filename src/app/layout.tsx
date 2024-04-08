import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MSWComponent } from "./_component/MSWComponent";
import Header from "./_component/header/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <MSWComponent>{children}</MSWComponent>
      </body>
    </html>
  );
}

// 레이아웃에서 어차피 헤더가 보여져야함
// 페이지는 로그인 후 들어가는거니까, 기본적으로 헤더는 항상 떠 잉써야함
