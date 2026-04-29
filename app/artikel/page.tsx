import Link from "next/link";
import { prisma } from "../../lib/prisma"; 

export default async function ArtikelPage() {
  // --- MENGAMBIL DATA DARI DATABASE ---
  // Kita ambil semua artikel, diurutkan dari yang paling baru diterbitkan
  const allArticles = await prisma.article.findMany({
    orderBy: { createdAt: 'desc' }
  });

  // --- MEMISAHKAN DATA ---
  // Artikel index ke-0 (paling baru) dijadikan Artikel Utama
  const artikelUtamaRaw = allArticles[0];
  // Sisanya (index ke-1 sampai habis) dijadikan Daftar Artikel di grid bawah
  const daftarArtikelRaw = allArticles.slice(1);

  // Helper untuk memformat tanggal
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      
      {/* HEADER SECTION */}
      <section className="bg-[#0B3B3C] text-white pt-36 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
           <div className="absolute -top-10 -right-10 w-96 h-96 rounded-full border-[60px] border-[#A67B27]"></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-4 relative z-10 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4">
            Kabar & <span className="text-[#A67B27]">Artikel</span>
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-sm md:text-base">
            Media informasi, publikasi kegiatan, dan wadah literasi santri untuk menyebarkan kebaikan serta inspirasi bagi umat.
          </p>
        </div>
      </section>

      {/* JIKA DATABASE KOSONG */}
      {allArticles.length === 0 ? (
         <div className="max-w-6xl mx-auto px-4 mt-20 text-center">
            <div className="text-6xl mb-4">📭</div>
            <h2 className="text-2xl font-bold text-gray-800">Belum ada artikel yang dipublikasikan.</h2>
            <p className="text-gray-500 mt-2">Tunggu artikel menarik dari kami!</p>
         </div>
      ) : (
        <>
          {/* ARTIKEL UTAMA (FEATURED POST) */}
          <section className="max-w-6xl mx-auto px-4 mt-12">
            <Link href={`/artikel/${artikelUtamaRaw.slug}`} className="group block">
              <div className="bg-white rounded-3xl shadow-md overflow-hidden border border-gray-100 flex flex-col md:flex-row transition-shadow hover:shadow-xl">
                {/* Gambar */}
                <div className="md:w-1/2 relative h-64 md:h-auto overflow-hidden">
                  <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
                  <img 
                    // Gunakan imageUrl dari DB, jika kosong pakai gambar dummy
                    src={artikelUtamaRaw.imageUrl || "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&q=80"} 
                    alt={artikelUtamaRaw.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-[#A67B27] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Sorotan Terbaru
                  </div>
                </div>
                
                {/* Konten */}
                <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-3 text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">
                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                    <span>{formatDate(artikelUtamaRaw.createdAt)}</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#0B3B3C] mb-4 group-hover:text-[#A67B27] transition-colors leading-tight">
                    {artikelUtamaRaw.title}
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {/* Potong teks jika terlalu panjang (Excerpt) */}
                    {artikelUtamaRaw.content.length > 150 
                      ? artikelUtamaRaw.content.substring(0, 150) + "..." 
                      : artikelUtamaRaw.content}
                  </p>
                  <div className="flex items-center gap-3 mt-auto">
                    <div className="w-10 h-10 rounded-full bg-[#0B3B3C] flex items-center justify-center text-white font-bold text-sm">
                      MJ
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#0B3B3C]">Mujab</p>
                      <p className="text-[10px] text-gray-500 uppercase">Kepala Bidang Ekonomi & Kreatif</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </section>

          {/* GRID DAFTAR ARTIKEL (Hanya dirender jika ada artikel sisa) */}
          {daftarArtikelRaw.length > 0 && (
            <section className="max-w-6xl mx-auto px-4 mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {daftarArtikelRaw.map((artikel) => (
                <Link key={artikel.id} href={`/artikel/${artikel.slug}`} className="group">
                  <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden h-full flex flex-col hover:-translate-y-1">
                    
                    <div className="relative h-52 overflow-hidden bg-gray-100">
                      <img 
                        src={artikel.imageUrl || "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=600&q=80"} 
                        alt={artikel.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm text-[#0B3B3C] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                        Informasi
                      </div>
                    </div>

                    <div className="p-6 flex flex-col flex-grow">
                      <span className="text-[11px] font-bold text-gray-400 mb-3 block">
                        🗓 {formatDate(artikel.createdAt)}
                      </span>
                      <h3 className="text-lg font-bold text-[#0B3B3C] mb-3 leading-snug group-hover:text-[#A67B27] transition-colors">
                        {artikel.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-grow">
                        {artikel.content.length > 100 
                          ? artikel.content.substring(0, 100) + "..." 
                          : artikel.content}
                      </p>
                      
                      <div className="flex items-center gap-2 text-[#A67B27] text-sm font-bold mt-auto group-hover:translate-x-2 transition-transform">
                        Baca Selengkapnya <span>→</span>
                      </div>
                    </div>

                  </div>
                </Link>
              ))}
            </section>
          )}

          {/* TOMBOL MUAT LEBIH BANYAK (Opsional, saat ini statis) */}
          {daftarArtikelRaw.length > 6 && (
            <div className="text-center mt-16">
              <button className="px-8 py-3 rounded-full bg-white border-2 border-[#0B3B3C] text-[#0B3B3C] font-bold hover:bg-[#0B3B3C] hover:text-white transition-colors">
                Muat Lebih Banyak
              </button>
            </div>
          )}
        </>
      )}

    </div>
  );
}