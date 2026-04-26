import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const pool = new pg.Pool({
  connectionString: "postgresql://admin:secretpassword@127.0.0.1:5432/keuangan_organisasi?schema=public",
});

const adapter = new PrismaPg(pool);

// Menyimpan koneksi Prisma agar tidak menumpuk saat hot-reload di mode Development
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;