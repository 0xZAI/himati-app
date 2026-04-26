import Image from "next/image";

export default function StrukturOrganisasi() {
  const pengurusInti = [
    { role: "Ketua Umum", name: "Fahrul Maulana", image: "/api/placeholder/150/150" },
    { role: "Sekretaris Umum", name: "Ahmad Abdullah Fikri, S.Pd.", image: "/api/placeholder/150/150" },
    { role: "Bendahara Umum", name: "Jalaludin", image: "/api/placeholder/150/150" },
  ];

  const departemen = [
    { bidang: "Bidang Dakwah & Sosial", icon: "🕌" },
    { bidang: "Bidang Pendidikan", icon: "🎓" },
    { bidang: "Bidang Ekonomi Kreatif", icon: "💰" },
    { bidang: "Bidang Hubungan Alumni", icon: "🤝" },
  ];

  return (

    <div className="min-h-screen bg-gray-50 pb-20">
      {/* HEADER SECTION */}
      <section className="bg-[#0B3B3C] text-white pt-36 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full border-[50px] border-[#A67B27]"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4">
            Struktur <span className="text-[#A67B27]">Organisasi</span>
          </h1>
          <p className="text-gray-300 max-w-xl mx-auto italic">
            "Sinergi dalam khidmat, bersatu dalam ukhuwah untuk mencapai ridha Guru."
          </p>
        </div>
      </section>

      {/* ORGANIZATIONAL CHART SECTION */}
      <section className="max-w-6xl mx-auto px-4 -mt-10 relative z-20">
        
        {/* Dewan Pembina/Penasihat (Top Level) */}
        <div className="flex justify-center mb-16">
          <div className="bg-white p-6 rounded-2xl shadow-xl border-t-4 border-[#A67B27] text-center w-full max-w-sm">
            <span className="text-[10px] font-bold text-[#A67B27] uppercase tracking-widest">Dewan Pembina</span>
            <h3 className="text-xl font-bold text-[#0B3B3C] mt-1 text-balance">Ust. Abdul Rojak, S.Pd.I (Aa Guru)</h3>
            <div className="h-1 w-12 bg-gray-100 mx-auto mt-4"></div>
          </div>
        </div>

        {/* Garis Penghubung Tengah */}
        <div className="hidden md:block w-px h-12 bg-gray-300 mx-auto -mt-16 mb-8"></div>

        {/* Pengurus Inti Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {pengurusInti.map((person, index) => (
            <div 
              key={index} 
              className={`bg-white p-6 rounded-2xl shadow-lg border border-gray-100 text-center transition-all hover:shadow-2xl hover:-translate-y-1 ${
                person.role === "Ketua Umum" ? "ring-2 ring-[#A67B27] ring-offset-4" : ""
              }`}
            >
              <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-gray-100 border-2 border-[#0B3B3C]/10 p-1">
                <div className="w-full h-full rounded-full bg-[#0B3B3C] flex items-center justify-center text-white font-bold text-2xl">
                  {person.name.charAt(0)}
                </div>
              </div>
              <span className="text-[10px] font-bold text-[#A67B27] uppercase tracking-widest">{person.role}</span>
              <h4 className="text-lg font-bold text-[#0B3B3C] mt-1">{person.name}</h4>
            </div>
          ))}
        </div>

        {/* Bidang/Departemen Section */}
        <div className="space-y-8">
          <div className="flex items-center gap-4 justify-center">
            <div className="h-px w-12 bg-[#A67B27]"></div>
            <h2 className="text-2xl font-bold text-[#0B3B3C]">Departemen & Bidang Kerja</h2>
            <div className="h-px w-12 bg-[#A67B27]"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {departemen.map((dept, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center group hover:bg-[#0B3B3C] transition-colors">
                <div className="text-3xl mb-3 group-hover:scale-125 transition-transform">{dept.icon}</div>
                <h5 className="font-bold text-[#0B3B3C] group-hover:text-white">{dept.bidang}</h5>
                <p className="text-[10px] text-gray-400 mt-2 group-hover:text-gray-300">KOORDINATOR & ANGGOTA</p>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* FOOTER INFO */}
      <section className="max-w-4xl mx-auto px-4 mt-20 text-center">
        <div className="p-8 bg-[#0B3B3C]/5 rounded-3xl border border-[#0B3B3C]/10">
          <p className="text-gray-600 italic">
            "Struktur ini disusun berdasarkan hasil Mufakat Alumni pada Musyawarah Besar HIMMATI. Setiap pengurus memegang amanah untuk berkhidmat demi kemajuan almamater Ma'had Al-Intidzom."
          </p>
        </div>
      </section>
    </div>
  );
}