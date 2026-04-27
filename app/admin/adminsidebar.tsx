"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAdmin } from "../actions/auth";

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <>
      {/* TOPBAR KHUSUS MOBILE */}
      <div className="md:hidden bg-[#0B3B3C] text-white p-4 flex items-center justify-between shadow-md z-30 relative">
        <div>
          <h2 className="text-xl font-black tracking-widest text-[#A67B27]">HIMMATI</h2>
          <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Admin Panel</p>
        </div>
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="text-white text-3xl focus:outline-none p-2 transition-transform active:scale-95"
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* OVERLAY GELAP (Muncul di HP saat sidebar terbuka, klik untuk menutup) */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* KOTAK SIDEBAR UTAMA */}
      <aside 
            className={`fixed md:relative top-0 left-0 h-screen w-64 flex-shrink-0 bg-[#0B3B3C] text-white flex flex-col shadow-2xl z-50 transition-transform duration-300 ease-in-out md:translate-x-0 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
         }`}
>
        <div className="p-6 border-b border-white/10 hidden md:flex flex-col items-center">
          <h2 className="text-xl font-black tracking-widest text-[#A67B27]">HIMMATI</h2>
          <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Admin Panel</p>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto mt-16 md:mt-0">
          <Link 
            href="/admin" 
            onClick={() => setIsOpen(false)} // Otomatis tutup sidebar di HP saat diklik
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
              isActive("/admin") ? "bg-[#A67B27] text-white font-bold" : "text-gray-300 hover:bg-white/5"
            }`}
          >
            <span>📊</span> Dashboard
          </Link>
          <Link 
            href="/admin/transaksi" 
            onClick={() => setIsOpen(false)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
              isActive("/admin/transaksi") ? "bg-[#A67B27] text-white font-bold" : "text-gray-300 hover:bg-white/5"
            }`}
          >
            <span>💸</span> Kelola Transaksi
          </Link>
          <Link 
            href="/admin/kas" 
            onClick={() => setIsOpen(false)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
              isActive("/admin/kas") ? "bg-[#A67B27] text-white font-bold" : "text-gray-300 hover:bg-white/5"
            }`}
          >
            <span>🏦</span> Rekening & Kas
          </Link>
          <Link 
            href="/admin/artikel" 
            onClick={() => setIsOpen(false)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
              isActive("/admin/artikel") ? "bg-[#A67B27] text-white font-bold" : "text-gray-300 hover:bg-white/5"
            }`}
          >
            <span>📝</span> Kelola Artikel
          </Link>
        </nav>

        <div className="p-4 border-t border-white/10 mt-auto bg-[#0B3B3C]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold text-[#A67B27]">
              FM
            </div>
            <div>
              <p className="text-sm font-bold text-white">Fajar Maulana</p>
              <p className="text-[10px] text-gray-400">Bendahara Umum</p>
            </div>
          </div>
          <form action={logoutAdmin}>
            <button type="submit" className="mt-4 flex items-center justify-center gap-2 w-full px-4 py-2 bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white rounded-lg text-xs font-bold transition-colors">
              Keluar dari Sistem
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}