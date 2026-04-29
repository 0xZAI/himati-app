import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "../../../lib/prisma";

// 1. Ubah tipe data params menjadi Promise
export default async function DetailArtikelPage({ params }: { params: Promise<{ slug: string }> }) {
  
  // 2. Gunakan 'await' untuk membuka isi params
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  // Cari artikel di database berdasarkan slug yang sudah didapat
  const article = await prisma.article.findUnique({
    where: {
      slug: slug,
    },
  });

  // Jika artikel tidak ditemukan, arahkan ke halaman 404
  if (!article) {
    notFound();
  }

  // Format Tanggal
  const formattedDate = new Date(article.createdAt).toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-20 pt-32">
      <main className="max-w-4xl mx-auto px-4">
        
        {/* Tombol Kembali */}
        <Link 
          href="/artikel" 
          className="inline-flex items-center gap-2 text-[#A67B27] font-bold hover:text-[#0B3B3C] transition-colors mb-8"
        >
          <span>←</span> Kembali ke Daftar Artikel
        </Link>

        {/* Kotak Konten Utama */}
        <article className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          
          {/* Header Artikel (Kategori & Tanggal) */}
          <div className="p-8 md:p-12 pb-6">
            <div className="flex items-center gap-3 text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">
              <span className="text-[#0B3B3C] bg-gray-100 px-3 py-1 rounded-full">Informasi Publik</span>
              <span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
              <span>{formattedDate}</span>
            </div>
            
            {/* Judul Artikel */}
            <h1 className="text-3xl md:text-5xl font-extrabold text-[#0B3B3C] leading-tight mb-8">
              {article.title}
            </h1>

            {/* Profil Penulis */}
            <div className="flex items-center gap-4 border-t border-gray-100 pt-6">
              <div className="w-12 h-12 rounded-full bg-[#A67B27] flex items-center justify-center text-white font-bold text-lg shadow-md">
                MJ
              </div>
              <div>
                <p className="text-base font-bold text-[#0B3B3C]">Mujab</p>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Kepala Bidang Ekonomi & Kreatif</p>
              </div>
            </div>
          </div>

          {/* Gambar Sampul (Full Width) */}
          {article.imageUrl && (
            <div className="w-full h-[400px] md:h-[500px] relative bg-gray-100 border-y border-gray-100">
              <img 
                src={article.imageUrl} 
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Isi Teks Artikel */}
          <div className="p-8 md:p-12">
            <div className="prose prose-lg max-w-none text-gray-700 leading-loose whitespace-pre-wrap">
              {article.content}
            </div>
          </div>

        </article>
      </main>
    </div>
  );
}