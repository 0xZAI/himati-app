import Image from "next/image";

export default function SejarahHimmati() {
  return (
    <div className="min-h-screen bg-white">
      
      {/* HEADER SECTION */}
      <section className="bg-[#0B3B3C] text-white py-20 relative overflow-hidden">
        {/* Aksen Latar Belakang */}
        <div className="absolute inset-0 opacity-10">
           <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full border-[60px] border-[#A67B27]"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-[#A67B27] bg-opacity-20 text-[#A67B27] font-bold text-sm tracking-widest uppercase mb-4">
            Jejak Langkah Organisasi
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            Sejarah <span className="text-[#A67B27]">HIMMATI</span>
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto">
            Menelusuri akar semangat kebersamaan dan pengabdian para alumni Ma'had Al-Intidzom dari masa ke masa.
          </p>
        </div>
      </section>

      {/* MAIN CONTENT SECTION */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-gray-700 space-y-16">
          
          {/* Bagian 1: Latar Belakang */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <span className="w-12 h-1 bg-[#A67B27]"></span>
              <h2 className="text-2xl md:text-3xl font-bold text-[#0B3B3C]">Awal Mula Pergerakan</h2>
            </div>
            <div className="space-y-4 text-lg leading-relaxed text-justify">
              <p>
                Berdirinya <strong>Hidmah Mutakharrijin Ma'had Al-Intidzom (HIMMATI)</strong> berawal dari kerinduan mendalam para alumni untuk terus menyambung tali silaturahmi setelah menyelesaikan masa pendidikan di pondok pesantren. Ma'had Al-Intidzom tidak sekadar menjadi tempat menimba ilmu agama, melainkan rumah kedua yang menanamkan nilai-nilai ukhuwah Islamiyah yang kuat.
              </p>
              <p>
                Seiring berjalannya waktu dan menyebarnya para alumni ke berbagai daerah dengan beragam profesi, Pada tanggal 22 Sya’ban 1447 H bertepatan dengan 10 Februari 2026 M muncul gagasan kuat untuk mewadahi potensi besar ini. HIMMATI didirikan bukan sekadar sebagai ajang reuni, melainkan sebagai wadah pergerakan nyata untuk berkontribusi kembali kepada pondok pesantren dan umat.
              </p>
            </div>
          </div>

          {/* Bagian 2: ESENSI KHIDMAT (BAGIAN BARU) */}
          <div className="my-12">
            <div className="bg-[#0B3B3C]/5 border-l-4 border-[#A67B27] p-8 md:p-10 rounded-r-2xl relative">
              <div className="absolute top-4 right-6 text-6xl text-[#A67B27]/20 font-serif">"</div>
              <h3 className="text-2xl font-bold text-[#0B3B3C] mb-4">Esensi Khidmat dan Keberkahan Guru</h3>
              <p className="text-lg leading-relaxed text-justify mb-6">
                Bagi alumni Ma'had Al-Intidzom, HIMMATI adalah manifestasi nyata dari nilai <strong>Khidmat</strong> (pengabdian) kepada guru. Kami meyakini bahwa keberkahan ilmu dan kelancaran urusan dunia-akhirat sangat erat kaitannya dengan keridhaan guru.
              </p>
              <p className="text-lg leading-relaxed text-justify mb-6">
                Organisasi ini berdiri di atas prinsip "البركة بالخدمة" (keberkahan ada di dalam pengabdian). Setiap program, setiap iuran kas, dan setiap tetes keringat yang disumbangkan oleh alumni melalui HIMMATI, pada hakikatnya adalah bentuk bakti tulus agar senantiasa diakui sebagai santri oleh guru-guru kami, meski raga tak lagi bermukim di pondok.
              </p>
              <div className="flex items-center gap-3 text-[#A67B27] font-bold">
                <span className="w-8 h-px bg-[#A67B27]"></span>
                <span className="italic">"الأدب فوق العلم" — Adab itu letaknya di atas ilmu.</span>
              </div>
            </div>
          </div>

          {/* Bagian 3: Filosofi Logo */}
          <div className="bg-gray-50 rounded-3xl p-8 md:p-12 border border-gray-100 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#0B3B3C] to-transparent opacity-5 rounded-bl-full"></div>
            
            <div className="flex flex-col md:flex-row gap-10 items-center">
              {/* Gambar Logo */}
              <div className="w-48 h-48 md:w-64 md:h-64 relative flex-shrink-0 transition-transform duration-500 group-hover:scale-105">
                <Image 
                  src="/logo.png" 
                  alt="Filosofi Logo HIMMATI"
                  fill
                  className="object-contain"
                />
              </div>
              
              {/* Teks Filosofi */}
              <div>
                <h3 className="text-2xl font-bold text-[#0B3B3C] mb-4">Filosofi Mahkota HIMMATI</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Identitas visual HIMMATI dirancang dengan pertimbangan filosofis yang mendalam, mencerminkan visi dan jati diri para alumninya:
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#0B3B3C] text-white flex items-center justify-center text-xs font-bold mt-1 flex-shrink-0">1</div>
                    <p><strong>Simbol Utama "H":</strong> Melambangkan "Hidmah" (Pengabdian). Bentuknya yang dinamis dan terjalin melambangkan ikatan silaturahmi antar alumni yang tak pernah putus.</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#0B3B3C] text-white flex items-center justify-center text-xs font-bold mt-1 flex-shrink-0">2</div>
                    <p><strong>Warna Teal Tua (Hijau Kebiruan):</strong> Melambangkan kedalaman ilmu agama (hijau) yang dipadukan dengan ketenangan dan kebijaksanaan (biru) seorang santri.</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#A67B27] text-white flex items-center justify-center text-xs font-bold mt-1 flex-shrink-0">3</div>
                    <p><strong>Warna Cokelat Emas:</strong> Merepresentasikan kejayaan, kemuliaan akhlak, dan optimisme bahwa alumni Ma'had Al-Intidzom akan terus menorehkan tinta emas dalam peradaban umat.</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bagian 4: Menatap Masa Depan */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <span className="w-12 h-1 bg-[#A67B27]"></span>
              <h2 className="text-2xl md:text-3xl font-bold text-[#0B3B3C]">Menatap Masa Depan</h2>
            </div>
            <div className="space-y-4 text-lg leading-relaxed text-justify">
              <p>
                Kini, HIMMATI terus berbenah dan bertransformasi menjadi organisasi modern yang profesional tanpa meninggalkan akar kepesantrenannya. Melalui berbagai program kerja di bidang dakwah, pendidikan, sosial, hingga pemberdayaan ekonomi umat, HIMMATI berkomitmen untuk menjadi manfaat bagi semesta alam.
              </p>
              <p className="font-bold text-[#0B3B3C] text-center text-xl mt-8 italic">
                "Sebaik-baik manusia adalah yang paling bermanfaat bagi manusia lainnya."
              </p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}