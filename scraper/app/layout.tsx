import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pendora Demo",
  description: "Lead gen for web developers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Head>
        <meta property="og:title" content="Pendora" />
        <meta property="og:description" content="Helping web developers and designers filter out the noise and find their ideal client" />
        <meta property="og:image" content="https://i.postimg.cc/h4NLFv9w/pendora-preview.png" />
        <meta property="og:url" content="https://pendora.org/" />
      </Head>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </>
  );
}
