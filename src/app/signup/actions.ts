"use server";

import { signIn } from "next-auth/react";
import { z } from "zod";
import { kv } from "@vercel/kv";
import { getStringFromBuffer } from "@/lib/utils";

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  username: z.string().min(3),
  name: z.string().min(1),
  birthdate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // YYYY-MM-DD
});

export async function signup(formData: FormData) {
  const parsedCredentials = registerSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!parsedCredentials.success) {
    throw new Error("Invalid input");
  }

  const { email, password, username, name, birthdate } = parsedCredentials.data;

  const existingUserByEmail = await kv.hgetall(`user:${email}`);
  const existingUserByUsername = await kv.hgetall(`user:username:${username}`);
  if (existingUserByEmail || existingUserByUsername) {
    throw new Error("User already exists");
  }

  const salt = crypto.randomUUID();
  const encoder = new TextEncoder();
  const saltedPassword = encoder.encode(password + salt);
  const hashedPasswordBuffer = await crypto.subtle.digest(
    "SHA-256",
    saltedPassword
  );
  const hashedPassword = getStringFromBuffer(hashedPasswordBuffer);

  const user = {
    id: crypto.randomUUID(),
    email,
    password: hashedPassword,
    salt,
    username,
    name,
    birthdate,
  };

  await kv.hmset(`user:${email}`, user);
  await kv.hmset(`user:username:${username}`, user);

  return await signIn("credentials", { email, password, redirect: false });
}
