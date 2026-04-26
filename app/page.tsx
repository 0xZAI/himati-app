import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* HERO SECTION */}
      <section className="relative bg-[#0B3B3C] text-white py-20 lg:py-32 overflow-hidden">
        {/* Background Ornaments */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full border-[40px] border-[#A67B27]"></div>
          <div className="absolute top-40 -left-20 w-72 h-72 rounded-full border-[20px] border-white"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block py-1 px-3 rounded-full bg-[#A67B27] bg-opacity-20 text-[#A67B27] font-bold text-sm tracking-widest uppercase mb-6">
              Selamat Datang di Portal Resmi
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              Hidmah Mutakharrijin <br />
              <span className="text-[#A67B27]">Ma'had Al-Intidzom</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed">
              Wadah silaturahmi, sinergi, dan kontribusi nyata para alumni dalam memajukan peradaban, pendidikan, serta ekonomi umat.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/sejarah" 
                className="px-8 py-4 bg-[#A67B27] hover:bg-[#8a651f] text-white font-bold rounded-lg shadow-lg transition-all text-center"
              >
                Mengenal HIMMATI
              </Link>
              <Link 
                href="/proker" 
                className="px-8 py-4 bg-transparent border-2 border-white hover:bg-white hover:text-[#0B3B3C] text-white font-bold rounded-lg transition-all text-center"
              >
                Program Kerja
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK LINKS / HIGHLIGHT SECTION */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 -mt-24 relative z-20">
            
            {/* Card 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-xl border-t-4 border-[#A67B27] hover:-translate-y-2 transition-transform duration-300">
              <div className="w-12 h-12 bg-[#0B3B3C] bg-opacity-10 text-[#0B3B3C] rounded-xl flex items-center justify-center text-2xl mb-6">📖</div>
              <h3 className="text-xl font-bold text-[#0B3B3C] mb-3">Landasan Organisasi</h3>
              <p className="text-gray-600 mb-6">Akses dokumen resmi Anggaran Dasar dan Anggaran Rumah Tangga (AD/ART) HIMMATI.</p>
              <Link href="/ad-art" className="text-[#A67B27] font-bold hover:underline">Baca Selengkapnya →</Link>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-xl border-t-4 border-[#0B3B3C] hover:-translate-y-2 transition-transform duration-300">
              <div className="w-12 h-12 bg-[#A67B27] bg-opacity-10 text-[#A67B27] rounded-xl flex items-center justify-center text-2xl mb-6">👥</div>
              <h3 className="text-xl font-bold text-[#0B3B3C] mb-3">Struktur Pengurus</h3>
              <p className="text-gray-600 mb-6">Kenali susunan dewan pengurus yang berdedikasi untuk menjalankan roda organisasi.</p>
              <Link href="/struktur" className="text-[#A67B27] font-bold hover:underline">Lihat Struktur →</Link>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-xl border-t-4 border-[#A67B27] hover:-translate-y-2 transition-transform duration-300">
              <div className="w-12 h-12 bg-[#0B3B3C] bg-opacity-10 text-[#0B3B3C] rounded-xl flex items-center justify-center text-2xl mb-6">📰</div>
              <h3 className="text-xl font-bold text-[#0B3B3C] mb-3">Kabar Terbaru</h3>
              <p className="text-gray-600 mb-6">Ikuti perkembangan, artikel, dan dokumentasi kegiatan terbaru dari keluarga besar alumni.</p>
              <Link href="/artikel" className="text-[#A67B27] font-bold hover:underline">Baca Artikel →</Link>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}