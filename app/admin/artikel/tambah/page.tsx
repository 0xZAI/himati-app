import { prisma } from "../../../../lib/prisma";
import AdminSidebar from "../../adminsidebar";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// --- SERVER ACTION ---
async function simpanArtikel(formData: FormData) {
  "use server";
  
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const imageUrl = formData.get("imageUrl") as string;

  let generatedSlug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') 
    .replace(/(^-|-$)+/g, '');   

  // 2. Tambahkan string acak di belakangnya agar pasti Unik (mencegah error jika ada 2 judul sama)
  const uniqueSlug = `${generatedSlug}-${Math.floor(Math.random() * 10000)}`;

  try {
    await prisma.article.create({
      data: {
        title,
        slug: uniqueSlug, // Simpan slug ke database
        content,
        imageUrl: imageUrl !== "" ? imageUrl : null,
      },
    });

    revalidatePath("/admin/artikel");
    revalidatePath("/"); 
    revalidatePath("/artikel"); // Pastikan halaman artikel publik juga di-refresh
  } catch (error) {
    console.error("Gagal menyimpan artikel:", error);
    return;
  }

  redirect("/admin/artikel");
}

export default function TambahArtikelPage() {
  return (
    <div className="h-screen w-full bg-gray-100 flex flex-col md:flex-row font-sans overflow-hidden">
      <AdminSidebar />

      <main className="flex-1 p-4 md:p-8 overflow-y-auto h-full">
        <header className="mb-8 mt-4 md:mt-0">
          <Link href="/admin/artikel" className="text-[#A67B27] text-sm font-bold hover:underline flex items-center gap-1 mb-2">
            ← Kembali ke Daftar Artikel
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">Tulis Artikel Baru</h1>
        </header>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden max-w-4xl">
          <form action={simpanArtikel} className="p-6 md:p-8 space-y-6">
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Judul Artikel</label>
              <input 
                type="text" 
                name="title" 
                required 
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-[#A67B27] focus:ring-1 focus:ring-[#A67B27] outline-none text-gray-900 font-bold text-lg"
                placeholder="Masukkan judul yang menarik..."
              />
            </div>

            {/* TAMBAHAN: Input URL Gambar Sampul */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Link Gambar Sampul (Opsional)</label>
              <input 
                type="url" 
                name="imageUrl" 
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-[#A67B27] focus:ring-1 focus:ring-[#A67B27] outline-none text-gray-900 text-sm"
                placeholder="Contoh: https://i.postimg.cc/contoh-gambar.jpg"
              />
              <p className="text-[10px] text-gray-400 mt-1">
                *Gunakan layanan seperti Postimage.org atau Imgur, lalu *copy-paste* Direct Link (Tautan Langsung) gambar ke sini.
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Isi Konten Artikel</label>
              <textarea 
                name="content" 
                required 
                rows={12}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-[#A67B27] focus:ring-1 focus:ring-[#A67B27] outline-none text-gray-900 leading-relaxed"
                placeholder="Tulis isi berita, dakwah, atau pengumuman di sini..."
              ></textarea>
            </div>

            <div className="pt-6 border-t border-gray-100 flex justify-end">
              <button 
                type="submit" 
                className="px-8 py-4 bg-[#0B3B3C] text-white rounded-xl font-bold hover:bg-[#072526] transition-colors shadow-lg active:scale-95"
              >
                Publikasikan Artikel
              </button>
            </div>

          </form>
        </div>
      </main>
    </div>
  );
}