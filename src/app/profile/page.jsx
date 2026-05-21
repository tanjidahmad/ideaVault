"use client";

import Image from "next/image";

import { useState } from "react";

import toast from "react-hot-toast";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";



export default function ProfilePage() {

useEffect(()=>{
 document.title =
 "Profile | IdeaVault";
},[])
const router = useRouter();
  const {
    data: session,
  } = authClient.useSession();

  const user = session?.user;

  const [name, setName] =
    useState(user?.name || "");

  const [image, setImage] =
    useState(user?.image || "");

  const [loading, setLoading] =
    useState(false);

  const handleUpdate =
    async (e) => {

      e.preventDefault();

      setLoading(true);

      try {

        const { error } =
          await authClient.updateUser({

            name,
            image,

          });

        if (error) {

          return toast.error(
            error.message
          );

        }

        toast.success(
          "Profile Updated Successfully"
        );

        router.push("/");

      } catch (error) {

        toast.error(
          "Something went wrong"
        );

      } finally {

        setLoading(false);

      }
    };

  return (

    <div className="min-h-screen bg-gray-50 dark:bg-black px-4 py-12">

      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-xl p-8">

        {/* Heading */}
        <div className="text-center">

          <h1 className="text-4xl font-bold">

            Profile Management

          </h1>

          <p className="text-gray-500 mt-3">

            Manage your account information.

          </p>

        </div>

        {/* Current User */}
        <div className="mt-10 flex flex-col items-center">

          <Image
            src={user?.image}
            alt={user?.name}
            width={120}
            height={120}
            className="w-30 h-30 rounded-full object-cover border-4 border-green-600"
          />

          <h2 className="mt-5 text-2xl font-bold">

            {user?.name}

          </h2>

          <p className="text-gray-500 mt-2">

            {user?.email}

          </p>

        </div>

        {/* Update Form */}
        <form
          onSubmit={handleUpdate}
          className="mt-10 space-y-6"
        >

          {/* Name */}
          <div>

            <label className="block mb-2 font-medium">

              Full Name

            </label>

            <input
              type="text"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              placeholder="Enter your name"
              className="w-full border border-gray-300 dark:border-gray-700 bg-transparent rounded-xl px-4 py-3 outline-none focus:border-green-600"
              required
            />

          </div>

          {/* Image URL */}
          <div>

            <label className="block mb-2 font-medium">

              Profile Image URL

            </label>

            <input
              type="text"
              value={image}
              onChange={(e) =>
                setImage(e.target.value)
              }
              placeholder="Enter image URL"
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
              value={user?.email || ""}
              disabled
              className="w-full border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 rounded-xl px-4 py-3 cursor-not-allowed"
            />

          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-70 duration-300 text-white py-3 rounded-xl font-semibold"
          >

            {
              loading

                ? "Updating..."

                : "Save Changes"
            }

          </button>

        </form>

      </div>

    </div>
  );
}

