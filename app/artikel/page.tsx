import Image from "next/image";
import Link from "next/link";

export default function ArtikelPage() {
  
  const artikelUtama = {
    id: 1,
    title: "Membangun Kemandirian Ekonomi Umat Melalui Jaringan Alumni Pesantren",
    excerpt: "Sinergi antar alumni tidak hanya sebatas silaturahmi, namun memiliki potensi besar dalam menciptakan ekosistem ekonomi yang berdaya saing...",
    category: "Ekonomi Kreatif",
    date: "25 Apr 2026",
    author: "Fajar Maulana, S.Kom",
    image: "/api/placeholder/800/500"
  };

  const daftarArtikel = [
    {
      id: 2,
      title: "Kajian Rutin Bulanan: Menjaga Adab di Era Digital",
      excerpt: "Ringkasan materi kajian rutin HIMMATI bulan ini yang disampaikan oleh K.H. Pengasuh Ma'had, membahas tantangan akhlak di dunia maya.",
      category: "Dakwah",
      date: "20 Apr 2026",
      image: "/api/placeholder/600/400"
    },
    {
      id: 3,
      title: "Penyaluran Bantuan Pendidikan Santri Berprestasi Periode 2026",
      excerpt: "Alhamdulillah, HIMMATI kembali menyalurkan beasiswa kepada 20 santri Ma'had Al-Intidzom yang memiliki prestasi akademik gemilang.",
      category: "Sosial",
      date: "15 Apr 2026",
      image: "/api/placeholder/600/400"
    },
    {
      id: 4,
      title: "Rapat Kerja Nasional HIMMATI Targetkan Program Wakaf Produktif",
      excerpt: "Rakernas tahun ini menghasilkan keputusan strategis untuk memulai program wakaf produktif yang hasilnya akan digunakan untuk pengembangan pesantren.",
      category: "Berita Organisasi",
      date: "10 Apr 2026",
      image: "/api/placeholder/600/400"
    }
  ];

  const kategori = ["Semua", "Berita Organisasi", "Dakwah", "Pendidikan", "Sosial", "Ekonomi Kreatif"];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      
      {/* HEADER SECTION (Sudah disesuaikan dengan pt-36 agar tidak nabrak Navbar) */}
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

      {/* FILTER KATEGORI */}
      <section className="max-w-6xl mx-auto px-4 -mt-6 relative z-20">
        <div className="bg-white p-2 rounded-full shadow-lg border border-gray-100 flex overflow-x-auto hide-scrollbar">
          {kategori.map((item, index) => (
            <button 
              key={index}
              className={`px-6 py-2 rounded-full whitespace-nowrap text-sm font-bold transition-all ${
                index === 0 
                  ? "bg-[#A67B27] text-white" 
                  : "text-gray-500 hover:bg-gray-100 hover:text-[#0B3B3C]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      {/* ARTIKEL UTAMA (FEATURED POST) */}
      <section className="max-w-6xl mx-auto px-4 mt-12">
        <Link href={`/artikel/${artikelUtama.id}`} className="group block">
          <div className="bg-white rounded-3xl shadow-md overflow-hidden border border-gray-100 flex flex-col md:flex-row transition-shadow hover:shadow-xl">
            {/* Gambar */}
            <div className="md:w-1/2 relative h-64 md:h-auto overflow-hidden">
              <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
              {/* Gunakan tag img biasa untuk placeholder sementara. Nanti ganti dengan <Image /> Next.js jika sudah ada gambar asli */}
              <img 
                src={artikelUtama.image} 
                alt={artikelUtama.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 bg-[#A67B27] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Sorotan
              </div>
            </div>
            
            {/* Konten */}
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-3 text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">
                <span className="text-[#0B3B3C]">{artikelUtama.category}</span>
                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                <span>{artikelUtama.date}</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#0B3B3C] mb-4 group-hover:text-[#A67B27] transition-colors leading-tight">
                {artikelUtama.title}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                {artikelUtama.excerpt}
              </p>
              <div className="flex items-center gap-3 mt-auto">
                <div className="w-10 h-10 rounded-full bg-[#0B3B3C] flex items-center justify-center text-white font-bold text-sm">
                  {artikelUtama.author.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-bold text-[#0B3B3C]">{artikelUtama.author}</p>
                  <p className="text-[10px] text-gray-500 uppercase">Penulis</p>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </section>

      {/* GRID DAFTAR ARTIKEL */}
      <section className="max-w-6xl mx-auto px-4 mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {daftarArtikel.map((artikel) => (
          <Link key={artikel.id} href={`/artikel/${artikel.id}`} className="group">
            <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden h-full flex flex-col hover:-translate-y-1">
              
              <div className="relative h-52 overflow-hidden bg-gray-100">
                <img 
                  src={artikel.image} 
                  alt={artikel.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm text-[#0B3B3C] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  {artikel.category}
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <span className="text-[11px] font-bold text-gray-400 mb-3 block">🗓 {artikel.date}</span>
                <h3 className="text-lg font-bold text-[#0B3B3C] mb-3 leading-snug group-hover:text-[#A67B27] transition-colors">
                  {artikel.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-grow">
                  {artikel.excerpt}
                </p>
                
                <div className="flex items-center gap-2 text-[#A67B27] text-sm font-bold mt-auto group-hover:translate-x-2 transition-transform">
                  Baca Selengkapnya <span>→</span>
                </div>
              </div>

            </div>
          </Link>
        ))}
      </section>

      {/* TOMBOL MUAT LEBIH BANYAK */}
      <div className="text-center mt-16">
        <button className="px-8 py-3 rounded-full bg-white border-2 border-[#0B3B3C] text-[#0B3B3C] font-bold hover:bg-[#0B3B3C] hover:text-white transition-colors">
          Muat Lebih Banyak
        </button>
      </div>

    </div>
  );
}