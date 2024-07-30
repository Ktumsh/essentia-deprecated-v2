"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  BaloonIcon,
  EyeIcon,
  LockIcon,
  MailIcon,
  EyeOffIcon,
  UserIcon,
} from "../icons/icons";
import SignInWith from "./signin-with";
import { signup } from "@/app/signup/actions";

const SignUpEntry = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("username", username);
    formData.append("name", name);
    formData.append("birthdate", birthdate);

    try {
      const result = await signup(formData); // Llama a la acción signup
      if (result?.ok) {
        router.push("/login");
      } else {
        throw new Error("Failed to create account");
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(`An error occurred: ${error.message}`);
      } else {
        alert("An unknown error occurred");
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="flex relative justify-center items-center p-8 mb-9 size-full sm:w-[500px] rounded-xl bg-transparent sm:bg-white text-left sm:shadow-md shadow-black/20 font-normal text-base-color-m overflow-hidden">
      <div className="form-box register flex flex-col size-full">
        <form
          className="flex flex-col items-start justify-center size-full select-none"
          onSubmit={handleSubmit}
        >
          <div className="flex relative w-full h-10 mb-6 rounded bg-gray-200">
            <span className="flex justify-center items-center h-full pl-2">
              <MailIcon className="size-5" />
            </span>
            <input
              required
              name="email"
              aria-label="Correo electrónico"
              type="text"
              className="z-10 input size-full bg-transparent border-none outline-none text-[13px] font-semibold focus:ring-0"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="absolute top-1/2 left-9 transform -translate-y-1/2 text-[13px] transition-all duration-300">
              Correo electrónico
            </label>
          </div>
          <div className="flex relative w-full h-10 mb-6 rounded bg-gray-200">
            <span className="flex justify-center items-center h-full pl-2">
              <UserIcon className="size-5" />
            </span>
            <input
              required
              name="username"
              aria-label="Nombre de usuario"
              type="text"
              className="peer z-10 input size-full bg-transparent border-none outline-none text-[13px] font-semibold focus:ring-0"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label className="peer-valid: absolute top-1/2 left-9 transform -translate-y-1/2 text-[13px] transition-all duration-300">
              Nombre de usuario
            </label>
          </div>
          <div className="flex relative w-full h-10 mb-6 rounded bg-gray-200">
            <span className="flex justify-center items-center h-full pl-2">
              <UserIcon className="size-5" />
            </span>
            <input
              required
              name="name"
              aria-label="Nombre completo"
              type="text"
              className="z-10 input size-full bg-transparent border-none outline-none text-[13px] font-semibold focus:ring-0"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label className="absolute top-1/2 left-9 transform -translate-y-1/2 text-[13px] transition-all duration-300">
              Nombre completo
            </label>
          </div>
          <div className="relative size-full mb-6">
            <div className="flex items-center whitespace-nowrap text-[13px] transition-all duration-300 text-gray-200 sm:text-inherit">
              <BaloonIcon className="size-5 mr-2" />
              Fecha de cumpleaños
            </div>
            <input
              aria-label="Fecha de nacimiento"
              type="date"
              placeholder="01/01/1980"
              className="z-10 w-full h-10 px-2 outline-none text-[13px] placeholder:font-normal placeholder:text-base-color-m font-semibold rounded bg-gray-200 focus:ring-0 border-none"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
            />
          </div>
          <div className="flex relative w-full h-10 mb-6 rounded bg-gray-200">
            <span className="flex justify-center items-center h-full pl-2">
              <LockIcon className="size-5" />
            </span>
            <input
              required
              name="password"
              aria-label="Contraseña"
              type={showPassword ? "text" : "password"}
              className="z-10 input size-full bg-transparent border-none outline-none text-[13px] font-semibold focus:ring-0"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="absolute top-1/2 left-9 transform -translate-y-1/2 text-[13px] transition-all duration-300">
              Contraseña
            </label>
            <button
              type="button"
              className="flex justify-center items-center h-full px-2 cursor-pointer hover:text-bittersweet-400 bottom-2"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <EyeIcon id="eye" className="size-5" />
              ) : (
                <EyeOffIcon id="offEye" className="size-5" />
              )}
            </button>
          </div>
          <div className="flex mb-6 relative w-full text-[13px] leading-snug select-text text-gray-200 sm:text-inherit">
            <p>
              Al registrarte, estás aceptando los{" "}
              <a
                className="hover:underline underline-offset-2 font-bold text-white sm:text-orient-700 sm:font-medium"
                href="#"
                aria-label="Términos y condiciones de uso"
              >
                Términos y condiciones de uso{" "}
              </a>
              y la{" "}
              <a
                className="hover:underline underline-offset-2 font-bold text-white sm:text-orient-700 sm:font-medium"
                href="#"
                aria-label="Política de privacidad"
              >
                Política de privacidad
              </a>
            </p>
          </div>
          <button
            type="submit"
            className="flex justify-center items-center h-10 w-full text-base rounded-full bg-light-gradient hover:brightness-90 active:scale-[.98] text-white shadow-md transition-all"
          >
            Crear cuenta
          </button>
          <div className="flex flex-row items-center justify-center w-full px-3 my-4">
            <hr className="flex-1 h-px border-gray-200" />
            <span className="text-xs text-center mx-2 text-nowrap text-white sm:text-inherit">
              o
            </span>
            <hr className="flex-1 h-px border-gray-200" />
          </div>
        </form>
        <SignInWith />
        <div className="flex items-center justify-center text-[13px] text-center self-center mt-2 text-gray-200 sm:text-inherit">
          <p>
            ¿Ya tienes una cuenta?{" "}
            <a
              id="login-base-color"
              className="login-base-color font-bold sm:font-medium text-orient-600 sm:text-orient-700"
              href="/login"
              aria-label="Inicia sesión"
            >
              Inicia sesión
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpEntry;
