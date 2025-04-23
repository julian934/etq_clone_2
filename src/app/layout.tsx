import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
//import StoreStateContextProvider from "./lib/context/storeContext";
import { Provider } from "./provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The Magisters Corner",
  description: "Founded in 2024, The Magisters Corner is America's premier destination for Business and Business-Casual clothing.",
};
//Make sure to modify the metadata & check out metadata options in Next.js docs for SEO. 

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
     
      <body className={inter.className}><Provider>{children}</Provider></body>
      
    </html>
  );
}
