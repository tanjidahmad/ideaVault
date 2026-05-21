

"use client";

import Link from "next/link";

import { useEffect, useState,  } from "react";

import { useTheme } from "next-themes";

import {
  FaMoon,
  FaSun,
  FaBars,
  FaTimes,
} from "react-icons/fa";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";

export default function Navbar() {

  const [open, setOpen] =
    useState(false);

  const [mounted, setMounted] =
    useState(false);

  const [dropdownOpen, setDropdownOpen] =
    useState(false);

   



  useEffect(() => {

    setMounted(true);

  }, []);

  const { theme, setTheme } =
    useTheme();

  // SESSION
  const {
    data: session,

  } = authClient.useSession()

  console.log(session)

  const user = session?.user

  console.log(user)

  // const handleSignout = async () => {

  //   await authClient.signOut();

  // }
  const handleSignout = async () => {

  const currentPath =
    window.location.pathname;

  await authClient.signOut();

  window.location.href =
    `/login?redirect=${currentPath}`;

}

  const navLinks = (
    <>
 <Link
    href="/"
    onClick={() => setOpen(false)}
    className="text-black dark:text-white hover:text-green-600 duration-300"
  >
    Home
  </Link>

  <Link
    href="/ideas"
    onClick={() => setOpen(false)}
    className="text-black dark:text-white hover:text-green-600 duration-300"
  >
    Ideas
  </Link>

  {user && (
    <>
      <Link
        href="/add-idea"
        onClick={() => setOpen(false)}
        className="text-black dark:text-white hover:text-green-600 duration-300"
      >
        Add Idea
      </Link>

      <Link
        href="/my-ideas"
        onClick={() => setOpen(false)}
        className="text-black dark:text-white hover:text-green-600 duration-300"
      >
        My Ideas
      </Link>

      <Link
        href="/my-interactions"
        onClick={() => setOpen(false)}
        className="text-black dark:text-white hover:text-green-600 duration-300"
      >
        My Interactions
      </Link>

          </>
        )
      }

    </>
  );

  return (

    <nav className="border-b sticky top-0 z-50 bg-white dark:bg-black">

      <div className="max-w-7xl mx-auto px-4">

        <div className="flex items-center justify-between py-4">

          {/* Logo */}
          <Link
            href="/"
            className="text-3xl font-bold text-green-600"
          >

            IdeaVault

          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8 font-medium">

            {navLinks}

          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">

            {/* Theme Toggle */}
            {
              mounted && (

                <button
                  onClick={() =>

                    setTheme(

                      theme === "dark"

                        ? "light"

                        : "dark"

                    )
                  }
                  className="text-xl"
                >

                  {
                    theme === "dark"

                      ? <FaSun />

                      : <FaMoon />
                  }

                </button>

              )
            }

            {/* USER */}
            {
              user ? (

                 <div className="relative" >

                  {/* Avatar */}
                 <Image
  onClick={() =>
    setDropdownOpen(!dropdownOpen)
  }
  src={user.image}
  alt={user.name}
  width={40}
  height={40}
  className="w-10 h-10 rounded-full border-2 border-green-600 object-cover cursor-pointer"
/>

                  {/* Dropdown */}
                  {
                    dropdownOpen && (

                      <div className="absolute right-0 mt-4 w-64 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl p-5">

                        {/* User Info */}
                        <div className="text-center border-b border-gray-200 dark:border-gray-700 pb-4">

                          <Image
  src={user.image}
  alt={user.name}
  width={40}
  height={40}
  className="w-10 h-10 rounded-full"
/>
                          <h3 className="mt-3 font-bold">

                            {user.name}

                          </h3>

                          <p className="text-sm text-gray-500 mt-1 break-all">

                            {user.email}

                          </p>

                        </div>

                        {/* Links */}
                        <div className="flex flex-col gap-3 mt-5">

                          <Link
                            href="/profile"
                            className="hover:text-green-600 duration-300"
                          >

                            Profile

                          </Link>

                          <button
                            onClick={handleSignout}
                            className="bg-red-600 hover:bg-red-700 duration-300 text-white py-2 rounded-xl"
                          >

                            Logout

                          </button>

                        </div>

                      </div>

                    )
                  }

                </div>

              ) : (

                <>

                  {/* Login */}
                  <Link
                    href="/login"
                    className="bg-green-600 hover:bg-green-700 duration-300 text-white px-5 py-2 rounded-lg"
                  >

                    Login

                  </Link>

                  {/* Register */}
                  <Link
                    href="/register"
                    className="border border-green-600 px-5 py-2 rounded-lg hover:bg-green-600 hover:text-white duration-300"
                  >

                    Register

                  </Link>

                </>

              )
            }

            {/* Mobile Menu Button */}
            <button
              onClick={() =>
                setOpen(!open)
              }
              className="lg:hidden text-2xl ml-2"
            >

              {
                open

                  ? <FaTimes />

                  : <FaBars />
              }

            </button>

          </div>

        </div>

      </div>

      {/* Mobile Menu */}
      {
        open && (

          <div className="lg:hidden border-t px-4 py-5 bg-white dark:bg-gray-400">

            <div className="flex flex-col gap-5 font-medium">

              {navLinks}

            </div>

          </div>

        )
      }

    </nav>
  );
}