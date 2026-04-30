import { prisma } from "../../../lib/prisma";
import AdminSidebar from "../adminsidebar";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import TombolHapusKas from "./TombolHapusKas";
import TombolHapusKategori from "./TombolHapusKategori";

// --- SERVER ACTIONS ---

// 1. Action Hapus Kas
async function hapusKas(formData: FormData) {
  "use server";
  const id = Number(formData.get("id"));
  try {
    await prisma.cashAccount.delete({ where: { id } });
    revalidatePath("/admin/kas");
  } catch (error) {
    console.error("Gagal hapus: Akun ini masih memiliki riwayat transaksi.");
  }
}

// 2. Action Tambah Kategori Baru
async function simpanKategori(formData: FormData) {
  "use server";
  const name = formData.get("name") as string;
  const type = formData.get("type") as "IN" | "OUT";

  if (name && type) {
    await prisma.category.create({
      data: { name, type }
    });
    revalidatePath("/admin/kas");
    revalidatePath("/admin/transaksi/tambah"); 
  }
}

// 3. Action Hapus Kategori
async function hapusKategori(formData: FormData) {
  "use server";
  const id = Number(formData.get("id"));
  try {
    await prisma.category.delete({ where: { id } });
    revalidatePath("/admin/kas");
    revalidatePath("/admin/transaksi/tambah");
  } catch (error) {
    console.error("Gagal hapus: Kategori sedang digunakan di transaksi.");
  }
}

// --- MAIN COMPONENT ---
export default async function KelolaKasPage() {
  // Ambil Data Rekening
  const accounts = await prisma.cashAccount.findMany({
    orderBy: { name: 'asc' },
    include: { _count: { select: { transactions: true } } }
  });

  // Ambil Data Kategori
  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' },
    include: { _count: { select: { transactions: true } } }
  });

  const katMasuk = categories.filter((c : any) => c.type === 'IN');
  const katKeluar = categories.filter((c : any) => c.type === 'OUT');

  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);
  };

  return (
    <div className="h-screen w-full bg-gray-100 flex flex-col md:flex-row font-sans overflow-hidden">
      <AdminSidebar />
      <main className="flex-1 p-4 md:p-8 overflow-y-auto h-full space-y-8">
        
        {/* ================= BAGIAN 1: REKENING & KAS ================= */}
        <section>
          <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 mt-4 md:mt-0">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Rekening & Kas</h1>
              <p className="text-sm text-gray-500">Kelola tempat penyimpanan dana organisasi.</p>
            </div>
            <Link href="/admin/kas/tambah" className="px-5 py-2.5 bg-[#A67B27] text-white rounded-xl text-sm font-bold shadow-md hover:bg-[#8a651f] transition-all">
              + Tambah Rekening
            </Link>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {accounts.map((acc : any) => (
              <div key={acc.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 bg-[#0B3B3C]/5 rounded-2xl flex items-center justify-center text-2xl">🏦</div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase bg-gray-50 px-2 py-1 rounded border border-gray-100">
                      {acc._count.transactions} Transaksi
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-1">{acc.name}</h3>
                  <p className="text-sm text-gray-400 mb-4">Akun Kas Aktif</p>
                  <div className="text-2xl font-black text-[#0B3B3C]">
                    {formatRupiah(Number(acc.balance))}
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-50 flex justify-end items-center">
                  <TombolHapusKas id={acc.id} nama={acc.name} hapusAction={hapusKas} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-gray-200" />

        {/* ================= BAGIAN 2: KATEGORI TRANSAKSI ================= */}
        <section>
          <header className="mb-6">
            <h2 className="text-xl font-bold text-gray-800">Kategori Laporan</h2>
            <p className="text-sm text-gray-500">Kelompokkan transaksi untuk transparansi yang lebih rapi.</p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Kolom Kiri: Form Tambah Kategori */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-800 mb-4 border-b border-gray-100 pb-2">Buat Kategori Baru</h3>
                <form action={simpanKategori} className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-gray-800 uppercase block mb-1">Nama Kategori</label>
                    <input 
                      type="text" 
                      name="name" 
                      required 
                      placeholder="Contoh: Iuran Bulanan..."
                      className="w-full px-3 py-2 rounded-lg bg-gray-50 text-gray-800 border border-gray-200 text-sm focus:outline-none focus:border-[#A67B27]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-800 uppercase block mb-1 ">Tipe</label>
                    <select 
                      name="type" 
                      required
                      className="w-full px-3 py-2 rounded-lg bg-gray-50 text-gray-800 border border-gray-200 text-sm focus:outline-none focus:border-[#A67B27]"
                    >
                      <option value="IN">📥 Pemasukan (IN)</option>
                      <option value="OUT">📤 Pengeluaran (OUT)</option>
                    </select>
                  </div>
                  <button type="submit" className="w-full py-2 bg-[#0B3B3C] text-white rounded-lg text-sm font-bold hover:bg-[#072526] transition-colors">
                    Simpan Kategori
                  </button>
                </form>
              </div>
            </div>

            {/* Kolom Kanan: Daftar Kategori */}
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* List Pemasukan */}
              <div className="bg-emerald-50/50 p-6 rounded-2xl border border-emerald-100">
                <h3 className="font-bold text-emerald-800 mb-4 flex items-center gap-2">
                  <span>📥</span> Kategori Pemasukan
                </h3>
                <ul className="space-y-2">
                  {katMasuk.map((kat : any) => (
                    <li key={kat.id} className="bg-white px-3 py-2 rounded-lg border border-emerald-100 flex justify-between items-center text-sm shadow-sm">
                      <span className="font-medium text-gray-700">{kat.name}</span>
                      <TombolHapusKategori id={kat.id} nama={kat.name} hapusAction={hapusKategori} />
                    </li>
                  ))}
                  {katMasuk.length === 0 && <li className="text-xs text-gray-400 italic">Belum ada kategori pemasukan.</li>}
                </ul>
              </div>

              {/* List Pengeluaran */}
              <div className="bg-rose-50/50 p-6 rounded-2xl border border-rose-100">
                <h3 className="font-bold text-rose-800 mb-4 flex items-center gap-2">
                  <span>📤</span> Kategori Pengeluaran
                </h3>
                <ul className="space-y-2">
                  {katKeluar.map((kat : any) => (
                    <li key={kat.id} className="bg-white px-3 py-2 rounded-lg border border-rose-100 flex justify-between items-center text-sm shadow-sm">
                      <span className="font-medium text-gray-700">{kat.name}</span>
                      <TombolHapusKategori id={kat.id} nama={kat.name} hapusAction={hapusKategori} />
                    </li>
                  ))}
                  {katKeluar.length === 0 && <li className="text-xs text-gray-400 italic">Belum ada kategori pengeluaran.</li>}
                </ul>
              </div>

            </div>
          </div>
        </section>

      </main>
    </div>
  );
}