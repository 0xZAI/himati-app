"use client";

export default function TombolHapusKas({ id, nama, hapusAction }: { id: number, nama: string, hapusAction: (formData: FormData) => void }) {
  return (
    <form action={hapusAction}>
      <input type="hidden" name="id" value={id} />
      <button 
        type="submit"
        className="text-xs font-bold text-red-500 hover:text-red-700 p-2 border border-red-100 rounded-lg hover:bg-red-50 transition-colors"
        onClick={(e) => {
          if(!confirm(`Hapus rekening "${nama}"? Tindakan ini hanya bisa dilakukan jika rekening tidak memiliki riwayat transaksi.`)) {
            e.preventDefault();
          }
        }}
      >
        Hapus
      </button>
    </form>
  );
}