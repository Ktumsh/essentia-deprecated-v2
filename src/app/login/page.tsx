import LoginForm from "@/components/sign/login-form";
import SignFooter from "@/components/sign/sign-footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Iniciar sesión",
};

export default function LoginPage() {
  return (
    <main className="relative w-full">
      <LoginForm />
      <SignFooter />
    </main>
  );
}
