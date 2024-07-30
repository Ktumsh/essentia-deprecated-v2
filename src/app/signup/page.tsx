import SignFooter from "@/components/sign/sign-footer";
import SignUpForm from "@/components/sign/signup-form";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registrarse",
};

export default function LoginPage() {
  return (
    <main className="relative w-full">
      <SignUpForm />
      <SignFooter />
    </main>
  );
}
