"use client";

import Link from "next/link";
import Image from "next/image"; 
import { usePathname } from "next/navigation";

export default function Footer() {
const pathname = usePathname();
  
  const isHiddenPage = pathname === "/admin" || pathname === "/login" || pathname.startsWith("/admin/"); 
  if (isHiddenPage){
    return null;
  }
  
  return (
    <footer className="bg-[#0B3B3C] text-white pt-16 pb-8 border-t-4 border-[#A67B27]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Grid Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-8 mb-12">
          
          {/* Branding */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              
              {/* logo*/}
              <div className="relative h-14 w-14 bg-white rounded-xl p-1 shadow-inner">
                <Image 
                  src="/logo.png" 
                  alt="Logo HIMMATI"
                  fill
                  className="object-contain p-1"
                />
              </div>
             

              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight text-white">HIMMATI</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#A67B27]">Ma'had Al-Intidzom</span>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed max-w-sm mt-4">
              Wadah silaturahmi dan kontribusi nyata para alumni dalam memajukan peradaban, pendidikan, serta ekonomi umat berlandaskan nilai-nilai kepesantrenan.
            </p>
          </div>

          {/* Contact Me */}
          <div>
            <h3 className="text-lg font-bold text-[#A67B27] mb-4 flex items-center gap-2">
              <span className="w-4 h-1 bg-[#A67B27] rounded-full"></span> Sekretariat
            </h3>
            <ul className="space-y-4 text-sm text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-[#A67B27] text-lg mt-0.5">📍</span>
                <span>
                  <strong>Gedung Sekretariat HIMMATI</strong><br />
                  Kp. Sinagalih RT 001/002<br />
                  Jawa Barat, Indonesia
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[#A67B27] text-lg">📞</span>
                <span>+62 812-3456-7890 (Admin)</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[#A67B27] text-lg">✉️</span>
                <span>kontak@himmati.org</span>
              </li>
            </ul>
          </div>

        </div>

        {/*  Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400 text-center md:text-left">
            © {new Date().getFullYear()} zaI_dev. Hak Cipta Dilindungi.
          </p>
          <div className="flex gap-4">
            {/* Dummy Social Media Icons */}
            <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#A67B27] hover:text-white transition-colors text-sm">IG</a>
            <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#A67B27] hover:text-white transition-colors text-sm">FB</a>
            <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#A67B27] hover:text-white transition-colors text-sm">YT</a>
          </div>
        </div>

      </div>
    </footer>
  );
}