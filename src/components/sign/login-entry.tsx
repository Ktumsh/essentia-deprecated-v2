"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { EyeIcon, LockIcon, EyeOffIcon, UserIcon } from "../icons/icons";
import SignInWith from "./signin-with";

const LoginEntry = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      identifier,
      password,
    });

    if (result?.error) {
      alert(result.error);
    } else {
      router.push("/");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="flex flex-col relative justify-center items-center p-8 size-full sm:min-w-[500px] rounded-xl bg-transparent sm:bg-white text-left sm:shadow-md shadow-black/20 font-normal text-base-color-m overflow-hidden">
      <form
        className="flex flex-col items-start justify-center size-full gap-6 mb-4 select-none"
        onSubmit={handleSubmit}
      >
        <div className="flex relative w-full h-10 rounded bg-gray-200">
          <span className="flex justify-center items-center h-full pl-2">
            <UserIcon className="size-5" />
          </span>
          <input
            name="identifier"
            aria-label="Usuario o correo electrónico"
            type="text"
            className="z-10 input size-full bg-transparent border-none outline-none text-[13px] font-semibold focus:ring-0"
            required
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />
          <label className="absolute top-1/2 left-9 transform -translate-y-1/2 text-[13px] transition-all duration-300">
            Usuario o correo electrónico
          </label>
        </div>

        <div className="flex relative w-full h-10 rounded bg-gray-200">
          <span className="flex justify-center items-center h-full pl-2">
            <LockIcon className="size-5" />
          </span>
          <input
            name="password"
            aria-label="Contraseña"
            type={showPassword ? "text" : "password"}
            className="z-10 input size-full bg-transparent border-none outline-none text-[13px] font-semibold focus:ring-0"
            required
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
        <div className="flex w-full mt-[-15px] mx-0 justify-between text-[13px] text-gray-200 sm:text-inherit">
          <a
            href="#"
            className="hover:underline underline-offset-2"
            aria-label="¿Olvidaste tu contraseña?"
          >
            ¿Olvidaste tu contraseña?
          </a>
        </div>
        <button className="flex justify-center items-center h-10 w-full text-base rounded-full bg-light-gradient hover:brightness-90 active:scale-[.98] text-white shadow-md transition-all">
          Iniciar sesión
        </button>
      </form>
      <div className="flex flex-row items-center justify-center w-full px-3 my-4">
        <hr className="flex-1 h-px border-gray-200" />
        <span className="text-xs text-center mx-2 text-nowrap text-white sm:text-inherit">
          o
        </span>
        <hr className="flex-1 h-px border-gray-200" />
      </div>
      <SignInWith />
      <div className="flex items-center justify-center text-[13px] text-center self-center mt-2 text-gray-200 sm:text-inherit">
        <p>
          ¿No tienes una cuenta?{" "}
          <a
            id="register-base-color"
            className="register-base-color font-bold sm:font-medium text-orient-600 sm:text-orient-700"
            href="/signup"
            aria-label="Regístrate"
          >
            Regístrate
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginEntry;
