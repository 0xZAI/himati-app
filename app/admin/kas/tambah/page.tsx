import AdminSidebar from "../../adminsidebar";
import Link from "next/link";
import { prisma } from "../../../../lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

async function simpanKasBaru(formData: FormData) {
  "use server";
  const name = formData.get("name") as string;
  const balance = Number(formData.get("balance"));

  await prisma.cashAccount.create({
    data: { name, balance }
  });

  revalidatePath("/admin/kas");
  revalidatePath("/admin");
  redirect("/admin/kas");
}

export default function TambahKasPage() {
  return (
    <div className="h-screen w-full bg-gray-100 flex flex-col md:flex-row font-sans overflow-hidden">
      <AdminSidebar />
      <main className="flex-1 p-4 md:p-8 overflow-y-auto h-full">
        <header className="mb-8 mt-4 md:mt-0">
          <Link href="/admin/kas" className="text-[#A67B27] text-sm font-bold hover:underline mb-2 block">
            ← Kembali
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">Tambah Akun Kas</h1>
        </header>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 max-w-2xl">
          <form action={simpanKasBaru} className="p-6 md:p-8 space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Nama Rekening / Kas</label>
              <input 
                type="text" name="name" required 
                placeholder="Contoh: Bank BNI Bendahara, Kas Tunai, dll"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-[#A67B27]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Saldo Awal (Rp)</label>
              <input 
                type="number" name="balance" required defaultValue="0"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-[#A67B27] font-bold text-lg"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Keterangan Singkat</label>
              <textarea 
                name="description" rows={3}
                placeholder="Misal: Rekening khusus dana beasiswa..."
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-[#A67B27]"
              ></textarea>
            </div>

            <button type="submit" className="w-full py-4 bg-[#0B3B3C] text-white rounded-xl font-bold hover:bg-[#072526] transition-all shadow-lg">
              Simpan Rekening Baru
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}