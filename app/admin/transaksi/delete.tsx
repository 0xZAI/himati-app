"use client"; 

export default function TombolHapus({ id, hapusAction }: { id: number, hapusAction: (formData: FormData) => void }) {
  return (
    <form action={hapusAction}>
      <input type="hidden" name="id" value={id} />
      <button 
        type="submit"
        className="w-8 h-8 rounded-lg bg-white border border-gray-200 text-gray-400 hover:text-red-600 hover:border-red-200 hover:bg-red-50 flex items-center justify-center mx-auto transition-all shadow-sm"
        title="Hapus Transaksi"
        onClick={(e) => {
          // Karena ini Client Component, onClick dan confirm() akan berjalan dengan sempurna
          if(!confirm('Anda yakin ingin menghapus transaksi ini? Saldo kas akan ikut terpengaruh.')) {
            e.preventDefault();
          }
        }}
      >
        🗑️
      </button>
    </form>
  );
}