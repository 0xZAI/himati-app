import { prisma } from "../../../lib/prisma";
import AdminSidebar from "../adminsidebar";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import TombolHapus from "./delete";

// --- SERVER ACTION: Fungsi untuk menghapus transaksi ---
// Fitur canggih Next.js: Fungsi ini berjalan murni di Server!
async function hapusTransaksi(formData: FormData) {
  "use server";
  
  const id = formData.get("id") as string;
  
  try {
    await prisma.transaction.delete({
      where: { id: Number(id) },
    });
    // Refresh halaman agar data terbaru langsung muncul
    revalidatePath("/admin/transaksi");
    revalidatePath("/admin");
    revalidatePath("/keuangan"); 
  } catch (error) {
    console.error("Gagal menghapus data:", error);
  }
}

export default async function KelolaTransaksiPage() {
  // --- MENGAMBIL DATA DARI DATABASE ---
  // Ambil semua transaksi, urutkan dari yang terbaru
  const transactions = await prisma.transaction.findMany({
    orderBy: { date: 'desc' },
    include: { 
      category: true, 
      account: true 
    }
  });

  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);
  };

  return (
    <div className="h-screen w-full bg-gray-100 flex flex-col md:flex-row font-sans overflow-hidden">
      
      {/* Panggil Komponen Sidebar */}
      <AdminSidebar />

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto h-full">
        
        {/* Topbar Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 mt-4 md:mt-0">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Kelola Transaksi</h1>
            <p className="text-sm text-gray-500">Pusat pencatatan pemasukan dan pengeluaran kas HIMMATI.</p>
          </div>
          <div className="flex gap-3">
            <Link 
              href="/admin/transaksi/tambah" 
              className="px-5 py-2.5 bg-[#A67B27] text-white rounded-xl text-sm font-bold shadow-md hover:bg-[#8a651f] transition-all transform hover:-translate-y-0.5"
            >
              + Catat Transaksi Baru
            </Link>
          </div>
        </header>

        {/* Kotak Tabel Data */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          
          {/* Header Tabel (Pencarian/Filter placeholder) */}
          <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white">
            <h3 className="font-bold text-gray-800">Semua Riwayat Transaksi</h3>
            <div className="flex gap-2 text-sm">
              <span className="bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg font-medium border border-gray-200">
                Total Data: {transactions.length}
              </span>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-gray-50 text-gray-500 border-b border-gray-200 uppercase tracking-wider text-[11px] font-bold">
                  <th className="px-6 py-4">Tanggal</th>
                  <th className="px-6 py-4">No. Ref & Deskripsi</th>
                  <th className="px-6 py-4">Kategori</th>
                  <th className="px-6 py-4">Sumber Kas</th>
                  <th className="px-6 py-4 text-right">Nominal</th>
                  <th className="px-6 py-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {transactions.map((trx) => (
                  <tr key={trx.id} className="hover:bg-gray-50/50 transition-colors group">
                    {/* Kolom Tanggal */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-800">
                        {new Date(trx.date).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </div>
                      <div className="text-[10px] text-gray-400">
                         {new Date(trx.date).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </td>
                    
                    {/* Kolom Deskripsi */}
                    <td className="px-6 py-4">
                      <div className="font-bold text-[#0B3B3C] mb-1">{trx.description}</div>
                      <div className="text-[10px] font-mono text-gray-400 bg-gray-100 inline-block px-1.5 rounded">
                        {trx.referenceNo || 'NO-REF'}
                      </div>
                    </td>
                    
                    {/* Kolom Kategori */}
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${
                        trx.type === 'IN' 
                          ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                          : 'bg-rose-50 text-rose-600 border-rose-100'
                      }`}>
                        {trx.category?.name || 'Tanpa Kategori'}
                      </span>
                    </td>
                    
                    {/* Kolom Akun Kas */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-[#0B3B3C]/5 flex items-center justify-center text-xs">🏦</div>
                        <span className="font-medium text-gray-600">{trx.account?.name || '-'}</span>
                      </div>
                    </td>
                    
                    {/* Kolom Nominal */}
                    <td className={`px-6 py-4 text-right font-black whitespace-nowrap text-base ${
                      trx.type === 'IN' ? 'text-emerald-600' : 'text-rose-600'
                    }`}>
                      {trx.type === 'IN' ? '+' : '-'} {formatRupiah(Number(trx.amount))}
                    </td>

                    {/* Kolom Aksi (Hapus Data) */}
                    <td className="px-6 py-4 text-center">
                    {/* Panggil komponen Client dan operasikan Server Action ke dalamnya */}
                        <TombolHapus id={trx.id} hapusAction={hapusTransaksi} />
                    </td>
                  </tr>
                ))}

                {/* State Jika Data Kosong */}
                {transactions.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center">
                      <div className="text-4xl mb-3">📭</div>
                      <h3 className="text-lg font-bold text-gray-800">Belum Ada Transaksi</h3>
                      <p className="text-gray-500 text-sm">Klik tombol "Catat Transaksi Baru" untuk memulai pembukuan.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Kecil Admin */}
        <div className="text-center mt-8 pb-4 text-xs text-gray-400">
          Sistem Informasi Keuangan &copy; 2026 HIMMATI Ma'had Al-Intidzom.
        </div>

      </main>
    </div>
  );
}