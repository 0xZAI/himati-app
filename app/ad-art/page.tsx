export default function AdArtPage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      
      {/* HEADER SECTION */}
      <section className="bg-[#0B3B3C] text-white pt-36 pb-16 relative overflow-hidden">
        {/* Ornamen Latar Belakang */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
           <div className="absolute top-10 left-10 w-64 h-64 rounded-full border-[40px] border-white"></div>
           <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full border-[50px] border-[#A67B27]"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4">
            Anggaran Dasar & <br className="hidden md:block" />
            <span className="text-[#A67B27]">Anggaran Rumah Tangga</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Dokumen landasan hukum, pedoman, dan aturan main tata kelola organisasi HIMMATI.
          </p>
        </div>
      </section>

      {/* PDF VIEWER SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 -mt-10 relative z-20">
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
          
          {/* Header Bar */}
          <div className="bg-white px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0B3B3C]/5 text-[#0B3B3C] flex items-center justify-center text-xl">
                📄
              </div>
              <div>
                <h2 className="text-sm font-bold text-[#0B3B3C] uppercase tracking-wider">Dokumen Resmi</h2>
                <p className="text-[10px] text-[#A67B27] font-bold">HIMMATI MA'HAD AL-INTIDZOM</p>
              </div>
            </div>
            
            {/* Status Indicator */}
            <div className="flex items-center gap-2 px-3 py-1 bg-green-50 rounded-full">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-[10px] font-bold text-green-700 uppercase">Verified File</span>
            </div>
          </div>

          {/* Area Reader */}
          <div className="w-full h-[70vh] md:h-[850px] bg-gray-50 relative">
            <object
              data="/ad-art.pdf"
              type="application/pdf"
              className="w-full h-full"
            >
              {/* Pesan Fallback jika PDF gagal load */}
              <div className="flex flex-col items-center justify-center h-full p-12 text-center">
                <div className="text-5xl mb-4">⚠️</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Pratinjau Tidak Tersedia</h3>
                <p className="text-gray-500 max-w-sm mb-6">
                  Browser Anda tidak dapat menampilkan PDF secara langsung. Silakan gunakan tombol di bawah untuk melihat dokumen.
                </p>
                <a 
                  href="/ad-art.pdf" 
                  target="_blank" 
                  className="px-6 py-3 bg-[#0B3B3C] text-white rounded-xl font-bold hover:bg-[#072526] transition-all"
                >
                  Buka Dokumen di Tab Baru
                </a>
              </div>
            </object>
          </div>

          {/* Footer Bar Reader */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
            <p className="text-[11px] text-gray-400 text-center italic">
              Hak Cipta © {new Date().getFullYear()} HIMMATI. Seluruh isi dokumen ini dilindungi oleh aturan organisasi.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}