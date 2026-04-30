import { prisma } from "../../../../lib/prisma";
import AdminSidebar from "../../adminsidebar";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// --- SERVER ACTION: Menyimpan Data & Memperbarui Saldo ---
async function simpanTransaksi(formData: FormData) {
  "use server";
  
  const type = formData.get("type") as "IN" | "OUT";
  const amount = Number(formData.get("amount"));
  const date = new Date(formData.get("date") as string);
  const description = formData.get("description") as string;
  const categoryId = Number(formData.get("categoryId"));
  const accountId = Number(formData.get("accountId"));

  // Buat nomor referensi acak yang unik (Contoh: TRX-202604-8392)
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const referenceNo = `TRX-${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}-${randomNum}`;

  try {
    // Gunakan Prisma $transaction untuk memastikan kedua proses berhasil atau gagal bersamaan
    await prisma.$transaction(async (tx : any) => {
      // 1. Simpan riwayat transaksi ke tabel Transaction
      await tx.transaction.create({
        data: {
          referenceNo,
          type,
          amount,
          date,
          description,
          categoryId,
          accountId,
        },
      });

      // 2. Update otomatis saldo di tabel CashAccount
      const hitungSaldo = type === 'IN' ? { increment: amount } : { decrement: amount };
      
      await tx.cashAccount.update({
        where: { id: accountId },
        data: { balance: hitungSaldo },
      });
    });

    // 3. Bersihkan cache dan arahkan kembali ke halaman tabel
    revalidatePath("/admin/transaksi");
    revalidatePath("/admin/kas");
    revalidatePath("/admin");
    revalidatePath("/keuangan");
    
  } catch (error) {
    console.error("Gagal menyimpan transaksi:", error);
    return; // Idealnya tampilkan pesan error, namun untuk simplicity kita biarkan
  }

  // Redirect HARUS ditaruh di luar blok try-catch
  redirect("/admin/transaksi");
}

export default async function TambahTransaksiPage() {
  // Ambil data Akun Kas dan Kategori untuk mengisi pilihan (Dropdown)
  const accounts = await prisma.cashAccount.findMany({ orderBy: { name: 'asc' } });
  const categories = await prisma.category.findMany({ orderBy: { name: 'asc' } });

  // Pisahkan kategori berdasarkan tipe untuk memudahkan UI
  const kategoriPemasukan = categories.filter(c => c.type === 'IN');
  const kategoriPengeluaran = categories.filter(c => c.type === 'OUT');

  // Format tanggal hari ini (YYYY-MM-DD) sebagai nilai default input tanggal
  const hariIni = new Date().toISOString().split('T')[0];

  return (
    <div className="h-screen w-full bg-gray-100 flex flex-col md:flex-row font-sans overflow-hidden">
      <AdminSidebar />

      <main className="flex-1 p-4 md:p-8 overflow-y-auto h-full">
        
        {/* Header */}
        <header className="mb-8 mt-4 md:mt-0">
          <Link href="/admin/transaksi" className="text-[#A67B27] text-sm font-bold hover:underline flex items-center gap-1 mb-2">
            ← Kembali ke Tabel Transaksi
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">Catat Transaksi Baru</h1>
          <p className="text-sm text-gray-500">Pastikan data nominal dan sumber kas diisi dengan teliti.</p>
        </header>

        {/* Formulir */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden max-w-3xl">
          <form action={simpanTransaksi} className="p-6 md:p-8 space-y-6">
            
            {/* TIPE TRANSAKSI (IN/OUT) */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Jenis Transaksi</label>
              <div className="flex gap-4">
                <label className="flex-1 cursor-pointer">
                  <input type="radio" name="type" value="IN" className="peer sr-only" required defaultChecked />
                  <div className="p-4 rounded-xl border-2 border-gray-100 text-gray-400 text-center peer-checked:border-emerald-500 peer-checked:bg-emerald-50 peer-checked:text-emerald-700 font-bold transition-all hover:bg-gray-50">
                    📥 Pemasukan Kas
                  </div>
                </label>
                <label className="flex-1 cursor-pointer">
                  <input type="radio" name="type" value="OUT" className="peer sr-only" required />
                  <div className="p-4 rounded-xl border-2 border-gray-100 text-gray-400 text-center peer-checked:border-rose-500 peer-checked:bg-rose-50 peer-checked:text-rose-700 font-bold transition-all hover:bg-gray-50">
                    📤 Pengeluaran Kas
                  </div>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* NOMINAL */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Nominal (Rp)</label>
                <input 
                  type="number" 
                  name="amount" 
                  required min="1"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-[#A67B27] focus:ring-1 focus:ring-[#A67B27] outline-none text-gray-800 font-bold text-lg"
                  placeholder="Contoh: 500000"
                />
              </div>

              {/* TANGGAL */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Tanggal Transaksi</label>
                <input 
                  type="date" 
                  name="date" 
                  required 
                  defaultValue={hariIni}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-[#A67B27] focus:ring-1 focus:ring-[#A67B27] outline-none text-gray-800"
                />
              </div>
            </div>

            {/* DESKRIPSI */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Deskripsi / Keterangan</label>
              <input 
                type="text" 
                name="description" 
                required 
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-[#A67B27] focus:ring-1 focus:ring-[#A67B27] outline-none text-gray-800"
                placeholder="Contoh: Iuran anggota angkatan 2024..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* SUMBER KAS */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Sumber / Tujuan Kas</label>
                <select 
                  name="accountId" 
                  required
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-[#A67B27] focus:ring-1 focus:ring-[#A67B27] outline-none text-gray-800 cursor-pointer"
                >
                  <option value="">-- Pilih Rekening --</option>
                  {accounts.map(acc => (
                    <option key={acc.id} value={acc.id}>{acc.name} (Saldo: Rp {acc.balance.toString()})</option>
                  ))}
                </select>
              </div>

              {/* KATEGORI */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Kategori Laporan</label>
                <select 
                  name="categoryId" 
                  required
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-[#A67B27] focus:ring-1 focus:ring-[#A67B27] outline-none text-gray-800 cursor-pointer"
                >
                  <option value="">-- Pilih Kategori --</option>
                  <optgroup label="Kategori Pemasukan (IN)">
                    {kategoriPemasukan.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                  </optgroup>
                  <optgroup label="Kategori Pengeluaran (OUT)">
                    {kategoriPengeluaran.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                  </optgroup>
                </select>
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <div className="pt-6 border-t border-gray-100">
              <button 
                type="submit" 
                className="w-full py-4 bg-[#0B3B3C] text-white rounded-xl font-bold hover:bg-[#072526] transition-colors shadow-lg active:scale-95"
              >
                Simpan Transaksi
              </button>
            </div>

          </form>
        </div>
      </main>
    </div>
  );
}