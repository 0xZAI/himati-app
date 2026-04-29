import { prisma } from "../../lib/prisma";
import Link from "next/link";
import { logoutAdmin } from "../actions/auth";
import AdminSidebar from "./adminsidebar"; 

export default async function AdminDashboard() {
  // --- MENGAMBIL DATA DARI DATABASE ---
  const accounts = await prisma.cashAccount.findMany();
  const totalSaldo = accounts.reduce((sum, acc) => sum + Number(acc.balance), 0);

  // Ambil 5 transaksi terakhir untuk tabel ringkasan
  const recentTransactions = await prisma.transaction.findMany({
    take: 5,
    orderBy: { date: 'desc' },
    include: { category: true, account: true }
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
            <h1 className="text-2xl font-bold text-gray-800">Ringkasan Sistem</h1>
            <p className="text-sm text-gray-500">Pantau aktivitas keuangan dan konten portal HIMMATI.</p>
          </div>
        </header>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Card Saldo Utama */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-16 h-16 bg-emerald-50 rounded-full group-hover:scale-150 transition-transform"></div>
            <p className="text-xs font-bold text-gray-400 uppercase mb-1 relative z-10">Total Saldo Kas</p>
            <h3 className="text-2xl font-black text-emerald-600 relative z-10">{formatRupiah(totalSaldo)}</h3>
          </div>

          {/* Dummy Card - Jumlah Akun Kas */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-16 h-16 bg-blue-50 rounded-full group-hover:scale-150 transition-transform"></div>
            <p className="text-xs font-bold text-gray-400 uppercase mb-1 relative z-10">Akun Kas Aktif</p>
            <h3 className="text-2xl font-black text-[#0B3B3C] relative z-10">{accounts.length} <span className="text-sm font-medium text-gray-500">Rekening</span></h3>
          </div>

          {/* Dummy Card - Artikel */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-16 h-16 bg-purple-50 rounded-full group-hover:scale-150 transition-transform"></div>
            <p className="text-xs font-bold text-gray-400 uppercase mb-1 relative z-10">Artikel Dipublikasi</p>
            <h3 className="text-2xl font-black text-[#0B3B3C] relative z-10">12 <span className="text-sm font-medium text-gray-500">Post</span></h3>
          </div>

          {/* Dummy Card - Pesan Masuk */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-16 h-16 bg-amber-50 rounded-full group-hover:scale-150 transition-transform"></div>
            <p className="text-xs font-bold text-gray-400 uppercase mb-1 relative z-10">Pesan Masuk</p>
            <h3 className="text-2xl font-black text-[#0B3B3C] relative z-10">5 <span className="text-sm font-medium text-gray-500">Pesan Baru</span></h3>
          </div>
        </div>

        {/* Tabel Transaksi Terakhir */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-gray-800">Aktivitas Transaksi Terakhir</h3>
            <Link href="/admin/transaksi" className="text-sm text-[#A67B27] font-bold hover:underline">Lihat Semua</Link>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-gray-50 text-gray-500 border-b border-gray-100">
                  <th className="px-6 py-4 font-semibold">Tanggal</th>
                  <th className="px-6 py-4 font-semibold">Deskripsi</th>
                  <th className="px-6 py-4 font-semibold">Kategori</th>
                  <th className="px-6 py-4 font-semibold">Sumber Dana</th>
                  <th className="px-6 py-4 font-semibold text-right">Nominal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentTransactions.map((trx) => (
                  <tr key={trx.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                      {new Date(trx.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-800">{trx.description}</td>
                    <td className="px-6 py-4">
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-medium">
                        {trx.category?.name || '-'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{trx.account?.name || '-'}</td>
                    <td className={`px-6 py-4 text-right font-bold whitespace-nowrap ${trx.type === 'IN' ? 'text-emerald-600' : 'text-red-600'}`}>
                      {trx.type === 'IN' ? '+' : '-'} {formatRupiah(Number(trx.amount))}
                    </td>
                  </tr>
                ))}
                {recentTransactions.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-gray-400">Belum ada transaksi tercatat.</td>
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