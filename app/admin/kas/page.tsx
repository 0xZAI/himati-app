import { prisma } from "../../../lib/prisma";
import AdminSidebar from "../adminsidebar";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import TombolHapusKas from "../kas/TombolHapusKas";

async function hapusKas(formData: FormData) {
  "use server";
  const id = Number(formData.get("id"));
  try {
    await prisma.cashAccount.delete({ where: { id } });
    revalidatePath("/admin/kas");
  } catch (error) {
    // Biasanya gagal jika sudah ada transaksi yang memakai akun ini
    console.error("Gagal hapus: Akun ini masih memiliki riwayat transaksi.");
  }
}

export default async function KelolaKasPage() {
  const accounts = await prisma.cashAccount.findMany({
    orderBy: { name: 'asc' },
    include: { _count: { select: { transactions: true } } }
  });

  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);
  };

  return (
    <div className="h-screen w-full bg-gray-100 flex flex-col md:flex-row font-sans overflow-hidden">
      <AdminSidebar />
      <main className="flex-1 p-4 md:p-8 overflow-y-auto h-full">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 mt-4 md:mt-0">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Rekening & Kas</h1>
            <p className="text-sm text-gray-500">Kelola tempat penyimpanan dana organisasi.</p>
          </div>
          <Link href="/admin/kas/tambah" className="px-5 py-2.5 bg-[#A67B27] text-white rounded-xl text-sm font-bold shadow-md hover:bg-[#8a651f] transition-all">
            + Tambah Rekening/Kas
          </Link>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accounts.map((acc) => (
            <div key={acc.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 bg-[#0B3B3C]/5 rounded-2xl flex items-center justify-center text-2xl">🏦</div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase bg-gray-50 px-2 py-1 rounded">
                    {acc._count.transactions} Transaksi
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-1">{acc.name}</h3>
                <p className="text-sm text-gray-400 mb-4">Akun Kas Aktif</p>
                <div className="text-2xl font-black text-[#0B3B3C]">
                  {formatRupiah(Number(acc.balance))}
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-50 flex justify-between items-center">
                <TombolHapusKas id={acc.id} nama={acc.name} hapusAction={hapusKas} />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}