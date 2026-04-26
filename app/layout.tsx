import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../app/components/Navbar";
import Footer from "../app/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portal Resmi HIMMATI",
  description: "Hidmah Mutakharrijin Ma'had Al-Intidzom",
  icons: {
    icon: '/logo.png', 
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className={`${inter.className} bg-gray-50`}>
        
        {/*  Navbar */}
        <Navbar />

        {/* Main Content */}
        <main className="pt-2">
          {children}
        </main>
        {/* Call Footer */}
        <Footer />
      </body>
    </html>
  );
}