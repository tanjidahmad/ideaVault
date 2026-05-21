"use client";

export default function Error({

  error,
  reset,

}) {

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black px-4">

      <div className="text-center max-w-lg">

        <h1 className="text-6xl font-bold text-red-600">

          Oops!

        </h1>

        <h2 className="mt-4 text-3xl font-bold">

          Something Went Wrong

        </h2>

        <p className="mt-4 text-gray-500">

          {error?.message ||
            "Unexpected Error"}

        </p>

        <button
          onClick={() => reset()}
          className="mt-8 bg-green-600 hover:bg-green-700 duration-300 text-white px-6 py-3 rounded-xl font-semibold"
        >

          Try Again!!

        </button>

      </div>

    </div>

  );

}