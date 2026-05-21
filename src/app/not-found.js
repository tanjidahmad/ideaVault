import Link from "next/link";

export default function NotFound() {

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black px-4">

      <div className="text-center">

        <h1 className="text-7xl font-bold text-green-600">

          404

        </h1>

        <h2 className="mt-4 text-3xl font-bold">

          Page Not Found

        </h2>

        <p className="mt-4 text-gray-500">

          Sorry, the page you are looking for does not exist.

        </p>

        <Link
          href="/"
          className="inline-block mt-8 bg-green-600 hover:bg-green-700 duration-300 text-white px-6 py-3 rounded-xl font-semibold"
        >

          Back To Home

        </Link>

      </div>

    </div>

  );

}