import { signIn } from "next-auth/react";
import { FacebookIcon, GoogleIcon, TwitterIcon } from "../icons/icons";

const SignInWith = () => {
  return (
    <div className="flex w-full gap-2">
      <button
        id="loginWithGoogle"
        className="inline-flex justify-center items-center align-middle h-10 w-full px-5 text-sm rounded text-white sm:text-base-color-h border border-gray-200/30 sm:border-gray-200 bg-black/30 sm:bg-transparent sm:hover:bg-gray-100 active:scale-[.98] transition-all"
        onClick={async () =>
          await signIn("google", { callbackUrl: "/", redirect: false })
        }
      >
        <div className="flex justify-center items-center shrink-0">
          <GoogleIcon className="size-[18px]" />
        </div>
      </button>
      <button
        id="loginWithFacebook"
        className="inline-flex justify-center items-center align-middle h-10 w-full px-5 text-sm rounded text-white sm:text-base-color-h border border-gray-200/30 sm:border-gray-200 bg-black/30 sm:bg-transparent sm:hover:bg-gray-100 active:scale-[.98] transition-all"
        onClick={async () =>
          await signIn("facebook", { callbackUrl: "/", redirect: false })
        }
      >
        <div className="flex justify-center items-center shrink-0">
          <FacebookIcon className="size-[18px]" />
        </div>
      </button>
      <button
        id="loginWithX"
        className="inline-flex justify-center items-center align-middle h-10 w-full px-5 text-sm rounded text-white sm:text-base-color-h border border-gray-200/30 sm:border-gray-200 bg-black/30 sm:bg-transparent sm:hover:bg-gray-100 active:scale-[.98] transition-all"
        onClick={async () =>
          await signIn("twitter", { callbackUrl: "/", redirect: false })
        }
      >
        <div className="flex justify-center items-center shrink-0">
          <TwitterIcon className="size-4" />
        </div>
      </button>
    </div>
  );
};

export default SignInWith;
