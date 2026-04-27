"use client";

import { useState } from "react";
import { loginAdmin } from "../actions/auth";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const result = await loginAdmin(formData);

    if (result?.error) {
      setError(result.error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B3B3C] flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Ornamen Latar */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full border-[40px] border-[#A67B27]"></div>
        <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full border-[50px] border-white"></div>
      </div>

      <div className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#0B3B3C]/5 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-[#0B3B3C]/10">
            <span className="text-3xl">🔐</span>
          </div>
          <h1 className="text-2xl font-black text-[#0B3B3C]">Portal Admin</h1>
          <p className="text-sm text-gray-500 mt-1">HIMMATI MA'HAD AL-INTIDZOM</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm mb-6 border border-red-100 text-center font-bold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">Email Admin</label>
            <input 
              type="email" 
              name="email"
              required
              className="w-full px-5 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-[#A67B27] focus:ring-1 focus:ring-[#A67B27] transition-all text-gray-800"
              placeholder="Masukkan email..."
            />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">Password</label>
            <input 
              type="password" 
              name="password"
              required
              className="w-full px-5 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-[#A67B27] focus:ring-1 focus:ring-[#A67B27] transition-all text-gray-800"
              placeholder="••••••••"
            />
          </div>
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full py-4 mt-4 bg-[#A67B27] hover:bg-[#8a651f] disabled:bg-gray-400 text-white font-bold rounded-xl shadow-lg transition-all transform hover:-translate-y-1 active:scale-95 flex justify-center items-center"
          >
            {isLoading ? "Memverifikasi..." : "Masuk ke Sistem"}
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-8">
          Akses ke halaman ini diawasi dan dilindungi.
        </p>
      </div>
    </div>
  );
}