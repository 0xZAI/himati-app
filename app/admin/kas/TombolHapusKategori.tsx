"use client";

export default function TombolHapusKategori({ id, nama, hapusAction }: { id: number, nama: string, hapusAction: (formData: FormData) => void }) {
  return (
    <form action={hapusAction}>
      <input type="hidden" name="id" value={id} />
      <button 
        type="submit"
        className="text-[10px] font-bold text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 px-2 py-1 rounded transition-colors"
        onClick={(e) => {
          if(!confirm(`Hapus kategori "${nama}"?`)) {
            e.preventDefault();
          }
        }}
      >
        Hapus
      </button>
    </form>
  );
}