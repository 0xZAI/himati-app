"use client";

export default function TombolHapusArtikel({ id, judul, hapusAction }: { id: number, judul: string, hapusAction: (formData: FormData) => void }) {
  return (
    <form action={hapusAction}>
      <input type="hidden" name="id" value={id} />
      <button 
        type="submit"
        className="w-8 h-8 rounded-lg bg-white border border-gray-200 text-gray-400 hover:text-red-600 hover:border-red-200 hover:bg-red-50 flex items-center justify-center transition-all shadow-sm"
        title="Hapus Artikel"
        onClick={(e) => {
          if(!confirm(`Yakin ingin menghapus artikel "${judul}"? Artikel yang dihapus tidak dapat dikembalikan.`)) {
            e.preventDefault();
          }
        }}
      >
        🗑️
      </button>
    </form>
  );
}