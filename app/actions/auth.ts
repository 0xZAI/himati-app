"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SignJWT } from "jose";

//secret key for JWT signing, should be stored securely in env variables
const secretKey = new TextEncoder().encode(
  process.env.JWT_SECRET_KEY || "fallback-kunci-rahasia-himmati-yang-panjang"
);

export async function loginAdmin(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const payload = {
      role: "admin",
      email: email,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    };

    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("24h")
      .sign(secretKey);

  
    (await cookies()).set("admin_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    redirect("/admin");
  } else {
    return { error: "Email atau Password tidak valid!" };
  }
}

export async function logoutAdmin() {
  (await cookies()).delete("admin_session");
  redirect("/login");
}