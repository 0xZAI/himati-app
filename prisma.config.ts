import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: "postgresql://admin:secretpassword@127.0.0.1:5432/keuangan_organisasi?schema=public",
  },
});