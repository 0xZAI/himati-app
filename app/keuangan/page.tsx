import { prisma } from "../../lib/prisma";

export default async function KeuanganPublik() {
  const accounts = await prisma.cashAccount.findMany({ orderBy: { id: 'asc' } });
  const totalSaldo = accounts.reduce((sum, acc) => sum + Number(acc.balance), 0);

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const currentMonthTransactions = await prisma.transaction.findMany({
    where: { date: { gte: startOfMonth } }
  });

  const pemasukanBulanIni = currentMonthTransactions
    .filter(t => t.type === 'IN')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const pengeluaranBulanIni = currentMonthTransactions
    .filter(t => t.type === 'OUT')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const recentTransactions = await prisma.transaction.findMany({
    take: 10, // Menampilkan 10 transaksi terakhir untuk transparansi lebih baik
    orderBy: { date: 'desc' },
    include: { category: true, account: true }
  });

  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      
      {/* HEADER SECTION */}
        <section className="bg-[#0B3B3C] text-white pt-36 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
           <div className="absolute top-0 left-0 w-64 h-64 rounded-full border-[30px] border-[#A67B27]"></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-4 relative z-10 text-center">
          <span className="inline-block py-1 px-4 rounded-full bg-white/10 text-[#A67B27] font-bold text-xs tracking-widest uppercase mb-4 border border-white/10">
            Laporan Akuntabilitas
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4">
            Transparansi <span className="text-[#A67B27]">Keuangan</span>
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-sm md:text-base">
            Wujud komitmen HIMMATI dalam mengelola dana umat secara terbuka, amanah, dan dapat dipertanggungjawabkan kepada seluruh anggota.
          </p>
        </div>
      </section>

      {/* SUMMARY CARDS (STATISTIK UTAMA) */}
      <section className="max-w-6xl mx-auto px-4 -mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-gradient-to-br from-[#0B3B3C] to-[#072526] p-8 rounded-3xl shadow-2xl border border-white/10 text-white relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 text-7xl opacity-10 group-hover:scale-110 transition-transform">💰</div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Total Saldo Kas</p>
            <h2 className="text-3xl md:text-4xl font-black">{formatRupiah(totalSaldo)}</h2>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 flex flex-col justify-center">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Pemasukan Bulan Ini</p>
            <h2 className="text-3xl font-bold text-[#A67B27]">{formatRupiah(pemasukanBulanIni)}</h2>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 flex flex-col justify-center">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Pengeluaran Bulan Ini</p>
            <h2 className="text-3xl font-bold text-red-600">{formatRupiah(pengeluaranBulanIni)}</h2>
          </div>

        </div>
      </section>

      {/* RINCIAN POS KAS & RIWAYAT */}
      <section className="max-w-6xl mx-auto px-4 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Kolom Kiri: Posisi Dana di Dompet/Bank */}
        <div className="lg:col-span-1 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-6 bg-[#A67B27] rounded-full"></div>
            <h3 className="text-xl font-bold text-[#0B3B3C]">Alokasi Kas</h3>
          </div>
          
          <div className="space-y-4">
            {accounts.map((account) => (
              <div key={account.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center group hover:border-[#A67B27] transition-colors">
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-700">{account.name}</span>
                  <span className="text-[10px] text-gray-400 uppercase font-semibold">Verified Account</span>
                </div>
                <span className="font-black text-[#0B3B3C]">{formatRupiah(Number(account.balance))}</span>
              </div>
            ))}
          </div>

          {/* Catatan Penutup Laporan */}
          <div className="p-6 bg-[#A67B27]/10 rounded-2xl border border-[#A67B27]/20">
            <h4 className="text-sm font-bold text-[#A67B27] mb-2 uppercase">Informasi</h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Data keuangan ini diperbarui secara otomatis oleh sistem setiap kali Bendahara Umum melakukan pencatatan transaksi.
            </p>
          </div>
        </div>

        {/* Kolom Kanan: Riwayat Transaksi Terakhir */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-6 bg-[#0B3B3C] rounded-full"></div>
              <h3 className="text-xl font-bold text-[#0B3B3C]">Aktivitas Terakhir</h3>
            </div>
            <span className="text-[10px] font-bold bg-gray-200 text-gray-600 px-3 py-1 rounded-full uppercase tracking-tighter">Real-Time Data</span>
          </div>

          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-[#f8fafc] text-[#0B3B3C] border-b border-gray-100">
                    <th className="px-6 py-5 font-bold uppercase tracking-wider text-xs">Waktu</th>
                    <th className="px-6 py-5 font-bold uppercase tracking-wider text-xs">Uraian Transaksi</th>
                    <th className="px-6 py-5 font-bold uppercase tracking-wider text-xs text-right">Nominal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {recentTransactions.map((trx) => (
                    <tr key={trx.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-5 text-gray-500 whitespace-nowrap">
                        {new Date(trx.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="px-6 py-5">
                        <p className="font-bold text-gray-900 leading-tight">{trx.description}</p>
                        <span className="inline-block mt-1.5 text-[10px] font-bold bg-[#0B3B3C]/5 text-[#0B3B3C] px-2 py-0.5 rounded-md uppercase">
                          {trx.category?.name || 'Umum'}
                        </span>
                      </td>
                      <td className={`px-6 py-5 text-right font-black whitespace-nowrap ${trx.type === 'IN' ? 'text-[#A67B27]' : 'text-red-600'}`}>
                        {trx.type === 'IN' ? '+' : '-'} {formatRupiah(Number(trx.amount))}
                      </td>
                    </tr>
                  ))}
                  {recentTransactions.length === 0 && (
                    <tr>
                      <td colSpan={3} className="px-6 py-12 text-center text-gray-400 italic">Belum ada aktivitas kas yang tercatat bulan ini.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </section>

      {/* SIGNATURE SECTION (PENGESAHAN) */}
      <section className="max-w-6xl mx-auto px-4 mt-20">
        <div className="flex flex-col md:flex-row justify-between items-center py-10 border-t border-gray-200 gap-8">
          <div className="text-center md:text-left">
            <h4 className="text-lg font-bold text-[#0B3B3C]">Laporan ini Sah & Akurat</h4>
            <p className="text-sm text-gray-500">Dikelola langsung oleh Departemen Keuangan & Departemen Teknologi Informasi HIMMATI</p>
          </div>
          <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 rounded-full bg-[#0B3B3C] flex items-center justify-center text-white font-bold">JL</div>
            <div>
              <p className="text-sm font-bold text-[#0B3B3C]">Jalaludin</p>
              <p className="text-[10px] text-[#A67B27] font-bold uppercase tracking-widest">Bendahara Umum HIMMATI</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 rounded-full bg-[#0B3B3C] flex items-center justify-center text-white font-bold">FM</div>
            <div>
              <p className="text-sm font-bold text-[#0B3B3C]">Fajar Maulana, S.Kom.</p>
              <p className="text-[10px] text-[#A67B27] font-bold uppercase tracking-widest">IT HIMMATI</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}