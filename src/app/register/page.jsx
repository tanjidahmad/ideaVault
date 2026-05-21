


"use client";

import Link from "next/link";

import toast from "react-hot-toast";

import { FcGoogle } from "react-icons/fc";

import { authClient } from "@/lib/auth-client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";



export default function RegisterPage() {

   useEffect(() => {
    document.title =
      "Register | IdeaVault";
  }, []);

  const router = useRouter();

  const handleRegister = async (e) => {

    e.preventDefault();

    const form = e.target;

    const formData = new FormData(form);

    const user = Object.fromEntries(
      formData.entries()
    );

    console.log(user);

    // Password Validation
    const uppercase = /[A-Z]/;

    const lowercase = /[a-z]/;

    if (user.password.length < 6) {

      return toast.error(
        "Password must be at least 6 characters"
      );
    }

    if (!uppercase.test(user.password)) {

      return toast.error(
        "Password must contain one uppercase letter"
      );
    }

    if (!lowercase.test(user.password)) {

      return toast.error(
        "Password must contain one lowercase letter"
      );
    }

    try {

      const { data, error } =
        await authClient.signUp.email({

          email: user.email,

          password: user.password,

          name: user.name,

          image: user.photo,

        });

      console.log(data, error);

      if (error) {

        return toast.error(
          error.message
        );
      }

      if (data) {

        toast.success(
          "Registration Successful"
        );

        form.reset();

        router.push("/");
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
      });

      toast.success(
        "Google Login Successful"
      );

      router.push("/");

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
            Create Account
          </h2>

          <p className="mt-3 text-gray-500">
            Join IdeaVault and share your startup ideas.
          </p>

        </div>

        {/* Form */}
        <form
          onSubmit={handleRegister}
          className="mt-8 space-y-5"
        >

          {/* Name */}
          <div>

            <label className="block mb-2 font-medium">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              className="w-full border border-gray-300 dark:border-gray-700 bg-transparent rounded-xl px-4 py-3 outline-none focus:border-green-600"
              required
            />

          </div>

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

          {/* Photo URL */}
          <div>

            <label className="block mb-2 font-medium">
              Photo URL
            </label>

            <input
              type="text"
              name="photo"
              placeholder="Enter your photo URL"
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
              placeholder="Create a password"
              className="w-full border border-gray-300 dark:border-gray-700 bg-transparent rounded-xl px-4 py-3 outline-none focus:border-green-600"
              required
            />

          </div>

          {/* Password Rules */}
          <div className="text-sm text-gray-500 space-y-1">

            <p>
              • Minimum 6 characters
            </p>

            <p>
              • At least one uppercase letter
            </p>

            <p>
              • At least one lowercase letter
            </p>

          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 duration-300 text-white py-3 rounded-xl font-semibold"
          >
            Register
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

        {/* Login Link */}
        <p className="mt-8 text-center text-gray-500">

          Already have an account?

          <Link
            href="/login"
            className="text-green-600 font-semibold ml-2 hover:underline"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}