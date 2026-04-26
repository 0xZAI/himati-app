import Link from "next/link";

export default function ProgramKerjaPage() {
  const programs = [
    {
      id: 1,
      bidang: "Pendidikan & Keilmuan",
      title: "Beasiswa Santri Berprestasi",
      description: "Penyaluran bantuan dana pendidikan bagi santri Ma'had Al-Intidzom yang berprestasi namun memiliki keterbatasan finansial.",
      icon: "🎓",
      status: "Program Rutin",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      id: 2,
      bidang: "Dakwah & Syiar",
      title: "Kajian Syahriahan Alumni",
      description: "Penyelenggaraan majelis taklim dan kajian keislaman bulanan yang diselenggarakan di majelis taklim Al-Intidzom bersama Abah Guru.",
      icon: "🕌",
      status: "Berjalan",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50"
    },
    {
      id: 3,
      bidang: "Sosial & Kemanusiaan",
      title: "HIMMATI Tanggap Bencana",
      description: "Penggalangan dana cepat dan penyaluran bantuan logistik serta relawan untuk daerah-daerah yang terdampak musibah/bencana alam.",
      icon: "🤝",
      status: "Insidental",
      color: "text-rose-600",
      bgColor: "bg-rose-50"
    },
    {
      id: 4,
      bidang: "Ekonomi & Pemberdayaan",
      title: "Inkubator Bisnis UMKM Santri",
      description: "Pendampingan, pelatihan digital marketing, dan bantuan modal awal bagi alumni yang sedang merintis usaha skala mikro dan menengah.",
      icon: "💼",
      status: "Tahap Perencanaan",
      color: "text-amber-600",
      bgColor: "bg-amber-50"
    },
    {
      id: 5,
      bidang: "Keorganisasian",
      title: "Pangkalan Data Alumni Terpadu",
      description: "Pengembangan sistem informasi dan pendataan profil seluruh alumni untuk memperkuat jejaring profesional dan silaturahmi.",
      icon: "📊",
      status: "Berjalan",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50"
    },
    {
      id: 6,
      bidang: "Ekonomi & Pemberdayaan",
      title: "Wakaf Produktif HIMMATI",
      description: "Pengumpulan dana wakaf dari alumni dan simpatisan untuk diinvestasikan pada instrumen aman, yang hasil keuntungannya membiayai operasional organisasi.",
      icon: "🌱",
      status: "Tahap Perencanaan",
      color: "text-teal-600",
      bgColor: "bg-teal-50"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      
      {/* HEADER SECTION (Sudah pakai pt-36 agar aman dari Navbar) */}
      <section className="bg-[#0B3B3C] text-white pt-36 pb-20 relative overflow-hidden text-center px-4">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
           <div className="absolute top-10 left-10 w-64 h-64 rounded-full border-[40px] border-[#A67B27]"></div>
           <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full border-[50px] border-white"></div>
        </div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="inline-block py-1 px-4 rounded-full bg-white/10 text-[#A67B27] font-bold text-xs tracking-widest uppercase mb-4 border border-white/10">
            Aksi & Dedikasi
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4">
            Program <span className="text-[#A67B27]">Kerja</span>
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Langkah nyata HIMMATI dalam mengabdi kepada agama, pesantren, dan masyarakat melalui berbagai inisiatif program yang terukur dan berkesinambungan.
          </p>
        </div>
      </section>

      {/* GRID PROGRAM KERJA */}
      <section className="max-w-6xl mx-auto px-4 -mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program) => (
            <div 
              key={program.id} 
              className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 flex flex-col group hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
            >
              {/* Ornamen Latar Hover */}
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-gray-50 rounded-full group-hover:scale-150 transition-transform duration-500 z-0"></div>

              <div className="relative z-10 flex flex-col h-full">
                {/* Header Card */}
                <div className="flex justify-between items-start mb-6">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-sm ${program.bgColor} ${program.color} group-hover:scale-110 transition-transform`}>
                    {program.icon}
                  </div>
                  <span className="text-[10px] font-bold bg-gray-100 text-gray-500 px-3 py-1.5 rounded-full uppercase tracking-wider">
                    {program.status}
                  </span>
                </div>

                {/* Konten Text */}
                <span className="text-xs font-bold text-[#A67B27] uppercase tracking-widest mb-2 block">
                  {program.bidang}
                </span>
                <h3 className="text-xl font-bold text-[#0B3B3C] mb-3 leading-tight">
                  {program.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">
                  {program.description}
                </p>

                {/* Garis Bawah Aksen */}
                <div className="w-12 h-1 bg-gray-200 rounded-full group-hover:bg-[#A67B27] group-hover:w-full transition-all duration-500 mt-auto"></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA SECTION (Dukungan / Donasi) */}
      <section className="max-w-5xl mx-auto px-4 mt-20">
        <div className="bg-gradient-to-br from-[#A67B27] to-[#8a651f] rounded-3xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="absolute right-0 top-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 md:w-2/3">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Dukung Pergerakan Kami</h2>
            <p className="text-white/90 leading-relaxed text-sm md:text-base">
              Setiap program HIMMATI dapat berjalan berkat dukungan doa dan partisipasi materi dari para alumni. Mari bersama-sama menebar manfaat yang lebih luas.
            </p>
          </div>
          
          <div className="relative z-10 md:w-1/3 flex justify-center md:justify-end w-full">
            <Link 
              href="/keuangan" 
              className="bg-[#0B3B3C] hover:bg-[#072526] text-white px-8 py-4 rounded-xl font-bold transition-transform hover:-translate-y-1 shadow-lg w-full md:w-auto text-center"
            >
              Lihat Laporan Keuangan
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}