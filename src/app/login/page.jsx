



"use client";

import Link from "next/link";

import toast from "react-hot-toast";

import { FcGoogle } from "react-icons/fc";

import { authClient } from "@/lib/auth-client";

import {
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useEffect } from "react";


export default function LoginPage() {

  useEffect(()=>{
 document.title =
 "Login | IdeaVault";
},[])

  const router = useRouter();

  
  const searchParams =
    useSearchParams();

  const redirectPath =
    searchParams.get(
      "redirect"
    ) || "/";

  const handleLogin = async (e) => {

    e.preventDefault();

    const form = e.target;

    const formData = new FormData(form);

    const user = Object.fromEntries(
      formData.entries()
    );

    try {

      const { data, error } =
        await authClient.signIn.email({

          email: user.email,

          password: user.password,

        });

      if (error) {

        return toast.error(error.message);

      }

   

if (data) {

  toast.success("Login Successful");

  form.reset();

  router.refresh();

  router.push(redirectPath);

}



    } catch (error) {

      toast.error(
        error?.message ||
        "Something went wrong"
      );

    }
  };

  const handleGoogleLogin = async () => {

    try {

      

      await authClient.signIn.social({
  provider: "google",
  callbackURL: redirectPath
});

toast.success(
  "Google Login Successful"

);

router.refresh();

router.push(redirectPath);

    } catch (error) {

      toast.error(
        error?.message ||
        "Something went wrong"
      );

    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gray-50 dark:bg-black">

      <div className="w-full max-w-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-3xl p-8 shadow-xl">

        {/* Heading */}
        <div className="text-center">

          <h2 className="text-4xl font-bold">
            Welcome Back
          </h2>

          <p className="mt-3 text-gray-500">
            Login to explore startup ideas.
          </p>

        </div>

        {/* Form */}
        <form
          onSubmit={handleLogin}
          className="mt-8 space-y-5"
        >

          {/* Email */}
          <div>

            <label className="block mb-2 font-medium">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 dark:border-gray-700 bg-transparent rounded-xl px-4 py-3 outline-none focus:border-green-600"
              required
            />

          </div>

          {/* Password */}
          <div>

            <label className="block mb-2 font-medium">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full border border-gray-300 dark:border-gray-700 bg-transparent rounded-xl px-4 py-3 outline-none focus:border-green-600"
              required
            />

          </div>

          {/* Forget Password */}
          <div className="text-right">

            <button
              type="button"
              className="text-sm text-green-600 hover:underline"
            >
              Forget Password?
            </button>

          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 duration-300 text-white py-3 rounded-xl font-semibold"
          >
            Login
          </button>

        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">

          <div className="flex-1 h-[1px] bg-gray-300 dark:bg-gray-700"></div>

          <p className="text-sm text-gray-500">
            OR
          </p>

          <div className="flex-1 h-[1px] bg-gray-300 dark:bg-gray-700"></div>

        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="w-full border border-gray-300 dark:border-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 duration-300 flex items-center justify-center gap-3"
        >

          <FcGoogle size={24} />

          Continue With Google

        </button>

        {/* Register Link */}
        <p className="mt-8 text-center text-gray-500">

          Don&apos;t have an account?

          <Link
            href="/register"
            className="text-green-600 font-semibold ml-2 hover:underline"
          >
            Register
          </Link>

        </p>

      </div>

    </div>
  );
}