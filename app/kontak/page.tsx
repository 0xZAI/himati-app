"use client";

import { useState } from "react";

export default function HubungiKami() {
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    subjek: "",
    pesan: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logika pengiriman pesan bisa diintegrasikan ke API route Next.js di sini
    alert("Terima kasih, pesan Anda telah terkirim ke Sekretariat HIMMATI!");
    setFormData({ nama: "", email: "", subjek: "", pesan: "" });
  };

  const contactInfo = [
    {
      title: "Alamat Sekretariat",
      detail: "Kp. Sinagalih RT 001/002, Jawa Barat, Indonesia",
      // Tautan ini akan membuka pencarian Google Maps untuk alamat tersebut
      link: "https://maps.google.com/?q=Kp.+Sinagalih+RT+001/002,+Jawa+Barat", 
      icon: "📍",
      color: "bg-blue-50 text-blue-600"
    },
    {
      title: "WhatsApp Admin",
      detail: "+62 812-3456-7890",
      // Tautan langsung untuk membuka aplikasi WhatsApp
      link: "https://wa.me/6281234567890", 
      icon: "📞",
      color: "bg-green-50 text-green-600"
    },
    {
      title: "Email Resmi",
      detail: "kontak@himmati.org",
      // Tautan langsung untuk membuka aplikasi Email (Gmail, Outlook, dll)
      link: "mailto:kontak@himmati.org", 
      icon: "✉️",
      color: "bg-red-50 text-red-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      
      {/* HEADER SECTION */}
      <section className="bg-[#0B3B3C] text-white pt-36 pb-20 relative overflow-hidden text-center px-4">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
           <div className="absolute top-0 left-0 w-80 h-80 rounded-full border-[50px] border-white"></div>
        </div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4">
            Hubungi <span className="text-[#A67B27]">Kami</span>
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Punya pertanyaan atau ingin berkolaborasi? Kami siap mendengar masukan, saran, maupun pertanyaan Anda.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 -mt-12 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* KOLOM KIRI: INFO KONTAK (Clickable) */}
          <div className="lg:col-span-1 space-y-6">
            {contactInfo.map((info, index) => (
              <a 
                key={index} 
                href={info.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 flex items-start gap-4 transition-all hover:-translate-y-1 hover:shadow-xl hover:border-[#A67B27] group block"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 transition-transform group-hover:scale-110 ${info.color}`}>
                  {info.icon}
                </div>
                <div>
                  <h3 className="font-bold text-[#0B3B3C] mb-1">{info.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed group-hover:text-[#A67B27] transition-colors">{info.detail}</p>
                </div>
              </a>
            ))}

            {/* Jam Operasional Sekretariat */}
            <div className="bg-[#A67B27] p-8 rounded-3xl text-white shadow-xl relative overflow-hidden group">
              <div className="relative z-10">
                <h3 className="text-lg font-bold mb-4">Jam Layanan</h3>
                <ul className="space-y-3 text-sm font-medium">
                  <li className="flex justify-between border-b border-white/20 pb-2">
                    <span>Senin - Jumat</span>
                    <span>08:00 - 16:00</span>
                  </li>
                  <li className="flex justify-between border-b border-white/20 pb-2">
                    <span>Sabtu</span>
                    <span>09:00 - 12:00</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Minggu / Libur</span>
                    <span className="bg-white/20 px-2 py-0.5 rounded italic">Tutup</span>
                  </li>
                </ul>
              </div>
              <div className="absolute -right-4 -bottom-4 text-7xl opacity-20 group-hover:rotate-12 transition-transform">🕒</div>
            </div>
          </div>

          {/* KOLOM KANAN: FORMULIR PESAN */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100">
              <h2 className="text-2xl font-bold text-[#0B3B3C] mb-6">Kirim Pesan Langsung</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Nama Lengkap</label>
                    <input 
                      type="text"
                      required
                      placeholder="Contoh: Ahmad"
                      className="w-full px-5 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-[#A67B27] focus:ring-1 focus:ring-[#A67B27] transition-all text-gray-800"
                      value={formData.nama}
                      onChange={(e) => setFormData({...formData, nama: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Alamat Email</label>
                    <input 
                      type="email"
                      required
                      placeholder="ahmad@gmail.com"
                      className="w-full px-5 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-[#A67B27] focus:ring-1 focus:ring-[#A67B27] transition-all text-gray-800"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Subjek / Perihal</label>
                  <input 
                    type="text"
                    required
                    placeholder="Contoh: Pertanyaan Keanggotaan"
                    className="w-full px-5 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-[#A67B27] focus:ring-1 focus:ring-[#A67B27] transition-all text-gray-800"
                    value={formData.subjek}
                    onChange={(e) => setFormData({...formData, subjek: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Isi Pesan</label>
                  <textarea 
                    rows={5}
                    required
                    placeholder="Tuliskan pesan Anda di sini secara detail..."
                    className="w-full px-5 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-[#A67B27] focus:ring-1 focus:ring-[#A67B27] transition-all text-gray-800 resize-none"
                    value={formData.pesan}
                    onChange={(e) => setFormData({...formData, pesan: e.target.value})}
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full py-4 bg-[#0B3B3C] hover:bg-[#072526] text-white font-bold rounded-xl shadow-lg transition-all transform hover:-translate-y-1 active:scale-95"
                >
                  Kirim Sekarang
                </button>
              </form>
            </div>
          </div>

        </div>
      </section>

      {/* MAP PLACEHOLDER SECTION */}
      <section className="max-w-6xl mx-auto px-4 mt-16">
        <div className="w-full h-96 bg-gray-200 rounded-3xl overflow-hidden shadow-inner border-4 border-white relative">
           <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 p-8 text-center">
             <span className="text-5xl mb-4">🗺️</span>
             <p className="font-bold text-[#0B3B3C]">Lokasi Sekretariat HIMMATI</p>
             <p className="text-sm">Kp. Sinagalih RT 001/002, Jawa Barat</p>
             <p className="mt-4 text-[10px] uppercase tracking-widest bg-white/50 px-3 py-1 rounded-full">Map Preview Area</p>
           </div>
        </div>
      </section>

    </div>
  );
}