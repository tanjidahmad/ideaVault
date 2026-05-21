export default function Loading() {

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black">

      <div className="text-center">

        <span className="loading loading-spinner loading-lg text-green-600"></span>

        <p className="mt-4 text-gray-500">

          Loading...

        </p>

      </div>

    </div>

  );

}