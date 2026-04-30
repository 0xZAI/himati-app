import { prisma } from "../../../lib/prisma";
import AdminSidebar from "../adminsidebar";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import TombolHapusArtikel from "./delete";

// --- SERVER ACTION ---
async function hapusArtikel(formData: FormData) {
  "use server";
  const id = Number(formData.get("id"));
  
  try {
    // CATATAN: Jika nama tabel Anda di prisma bukan 'article', ubah kata 'article' di bawah ini
    await prisma.article.delete({
      where: { id: id },
    });
    revalidatePath("/admin/artikel");
    revalidatePath("/"); // Refresh halaman beranda publik
  } catch (error) {
    console.error("Gagal menghapus artikel:", error);
  }
}

export default async function KelolaArtikelPage() {
  // CATATAN: Sesuaikan 'article' dengan nama model di schema.prisma Anda
  const articles = await prisma.article.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="h-screen w-full bg-gray-100 flex flex-col md:flex-row font-sans overflow-hidden">
      <AdminSidebar />
      <main className="flex-1 p-4 md:p-8 overflow-y-auto h-full">
        
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 mt-4 md:mt-0">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Kelola Artikel</h1>
            <p className="text-sm text-gray-500">Pusat publikasi berita dan informasi HIMMATI.</p>
          </div>
          <Link 
            href="/admin/artikel/tambah" 
            className="px-5 py-2.5 bg-[#A67B27] text-white rounded-xl text-sm font-bold shadow-md hover:bg-[#8a651f] transition-all transform hover:-translate-y-0.5"
          >
            + Tulis Artikel Baru
          </Link>
        </header>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-gray-50 text-gray-500 border-b border-gray-200 uppercase tracking-wider text-[11px] font-bold">
                  <th className="px-6 py-4">Tanggal Publikasi</th>
                  <th className="px-6 py-4">Judul Artikel</th>
                  <th className="px-6 py-4">Kutipan Konten</th>
                  <th className="px-6 py-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {articles.map((item :any) => (
                  <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500 font-medium">
                      {new Date(item.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4 font-bold text-[#0B3B3C]">
                      {item.title}
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {/* Menampilkan hanya 60 karakter pertama dari konten */}
                      {item.content.length > 60 ? item.content.substring(0, 60) + '...' : item.content}
                    </td>
                    <td className="px-6 py-4 text-center flex justify-center gap-2">
                      <TombolHapusArtikel id={item.id} judul={item.title} hapusAction={hapusArtikel} />
                    </td>
                  </tr>
                ))}

                {articles.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center">
                      <div className="text-4xl mb-3">📝</div>
                      <h3 className="text-lg font-bold text-gray-800">Belum Ada Artikel</h3>
                      <p className="text-gray-500 text-sm">Klik tombol "Tulis Artikel Baru" untuk mulai mempublikasikan konten.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
}