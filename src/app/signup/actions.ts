"use server";

import { z } from "zod";
import { kv } from "@vercel/kv";
import { getStringFromBuffer } from "@/lib/utils";
import { ErrorMessages } from "@/lib/enums/error-message";

const registerSchema = z.object({
  email: z.string().email(ErrorMessages.REQUIRED_EMAIL),
  password: z
    .string()
    .min(8, ErrorMessages.REQUIRED_PASSWORD)
    .regex(/[A-Z]/, ErrorMessages.INVALID_PASSWORD)
    .regex(/[a-z]/, ErrorMessages.INVALID_PASSWORD)
    .regex(/[0-9]/, ErrorMessages.INVALID_PASSWORD)
    .regex(/[^A-Za-z0-9]/, ErrorMessages.INVALID_PASSWORD),
  username: z.string().min(3, ErrorMessages.REQUIRED_USERNAME),
  name: z.string().min(1, ErrorMessages.REQUIRED_NAME),
  lastname: z.string().min(1, ErrorMessages.REQUIRED_LASTNAME),
  birthdate: z.string().refine(
    (date) => {
      const birthDate = new Date(date);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();
      const dayDifference = today.getDate() - birthDate.getDate();

      if (birthDate.getFullYear() < 1900 || birthDate > today) {
        return false;
      }

      if (age > 13) return true;
      if (age === 13 && monthDifference > 0) return true;
      if (age === 13 && monthDifference === 0 && dayDifference >= 0)
        return true;
      return false;
    },
    {
      message: ErrorMessages.INVALID_BIRTHDATE,
    }
  ),
});

export async function signup(formData: FormData) {
  const parsedCredentials = registerSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!parsedCredentials.success) {
    return {
      success: false,
      error: parsedCredentials.error.issues
        .map((issue) => issue.message)
        .join(", "),
    };
  }

  const { email, password, username, name, lastname, birthdate } =
    parsedCredentials.data;

  const existingUserByEmail = await kv.hgetall(`user:${email}`);
  if (existingUserByEmail) {
    return {
      success: false,
      error: ErrorMessages.EMAIL_EXISTS,
    };
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
    lastname,
    birthdate,
  };

  await kv.hmset(`user:${email}`, user);

  return { success: true };
}
