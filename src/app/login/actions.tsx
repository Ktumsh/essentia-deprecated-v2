"use server";

import { signIn } from "next-auth/react";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function login(formData: FormData) {
  const parsedCredentials = loginSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!parsedCredentials.success) {
    throw new Error("Invalid input");
  }

  const { email, password } = parsedCredentials.data;

  return await signIn("credentials", { email, password, redirect: false });
}
