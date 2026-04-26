import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

// Masukkan URL langsung ke dalam adapter
const adapter = new PrismaPg({ 
  connectionString: "postgresql://admin:secretpassword@127.0.0.1:5432/keuangan_organisasi?schema=public" 
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Memulai proses seeding data...');

  // 1. Bersihkan data lama (opsional, agar tidak duplikat jika dijalankan ulang)
  await prisma.transaction.deleteMany();
  await prisma.category.deleteMany();
  await prisma.cashAccount.deleteMany();

  // 2. Buat Dompet (Akun Kas)
  const kasHimpunan = await prisma.cashAccount.create({
    data: { name: 'Kas Himpunan', balance: 1500000 },
  });
  
  const rekBNI = await prisma.cashAccount.create({
    data: { name: 'Rekening BNI', balance: 3000000 },
  });

  // 3. Buat Kategori
  const katIuran = await prisma.category.create({
    data: { name: 'Iuran Rutin', type: 'IN' },
  });
  
  const katKonsumsi = await prisma.category.create({
    data: { name: 'Konsumsi', type: 'OUT' },
  });
  
  const katOperasional = await prisma.category.create({
    data: { name: 'Operasional', type: 'OUT' },
  });

  // 4. Buat Transaksi Dummy
  await prisma.transaction.create({
    data: {
      referenceNo: 'TRX-2026-001',
      amount: 500000,
      type: 'IN',
      description: 'Iuran Angkatan 2024',
      accountId: rekBNI.id,
      categoryId: katIuran.id,
    },
  });

  await prisma.transaction.create({
    data: {
      referenceNo: 'TRX-2026-002',
      amount: 50000,
      type: 'OUT',
      description: 'Beli Spidol & Kertas',
      accountId: kasHimpunan.id,
      categoryId: katOperasional.id,
    },
  });

  console.log('✅ Seeding berhasil! Data dummy sudah masuk ke database.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });