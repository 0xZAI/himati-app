"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname} from "next/navigation";
 

export default function Navbar() {
  const pathname = usePathname();
  
  const isHiddenPage = pathname === "/admin" || pathname === "/login" || pathname.startsWith("/admin/");
  if (isHiddenPage){
    return null;
  }
  
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Sejarah', path: '/sejarah' },
    { name: 'AD/ART', path: '/ad-art' },
    { name: 'Struktur Organisasi', path: '/struktur' },
    { name: 'Keuangan', path: '/keuangan' },
    { name: 'Artikel', path: '/artikel' },
    { name: 'Hubungi Kami', path: '/kontak' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div className="mx-auto max-w-7xl px-4 py-3">
        <div className="relative flex flex-col rounded-2xl border border-white/20 bg-white/80 shadow-lg backdrop-blur-md transition-all">
          
          {/* Main Navbar */}
          <div className="flex items-center justify-between px-6 py-3">
            
            {/* Branding  */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative h-10 w-10 transition-transform group-hover:scale-110">
                <Image 
                  src="/logo.png" 
                  alt="Logo HIMMATI"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-[#0B3B3C]">HIMMATI</span>
                <span className="text-[9px] font-bold uppercase tracking-widest text-[#A67B27]">Ma'had Al-Intidzom</span>
              </div>
            </Link>

            {/* Menu Desktop (Responsive) */}
            <div className="hidden lg:flex items-center gap-1">
              {menuItems.map((item) => (
                <Link 
                  key={item.name} 
                  href={item.path}
                  className="rounded-lg px-4 py-2 text-[13px] font-bold text-gray-700 transition-all hover:bg-[#0B3B3C]/10 hover:text-[#0B3B3C]"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Desktop Only */}
            <div className="hidden lg:block">
              <div className="h-2 w-12 rounded-full bg-gradient-to-r from-[#0B3B3C] to-[#A67B27] opacity-50"></div>
            </div>

            {/* Hamburger Button */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-[#0B3B3C] hover:bg-gray-100 rounded-lg transition-colors focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  // Icon x (close)
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  // icon hamburger (open)
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="lg:hidden border-t border-gray-100 px-4 py-4 bg-white/95 rounded-b-2xl">
              <div className="flex flex-col space-y-2">
                {menuItems.map((item) => (
                  <Link 
                    key={item.name} 
                    href={item.path}
                    onClick={() => setIsOpen(false)} 
                    className="rounded-lg px-4 py-3 text-sm font-bold text-gray-700 transition-all hover:bg-[#0B3B3C]/10 hover:text-[#0B3B3C]"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </nav>
  );
}