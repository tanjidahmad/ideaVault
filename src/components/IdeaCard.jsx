import Image from "next/image";
import Link from "next/link";

export default function IdeaCard({
  idea,
}) {

  return (

    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden hover:shadow-2xl duration-300 flex flex-col">

      {/* Image */}
     <div className="relative w-full h-56">

  <Image
    src={idea.imageURL}
    alt={idea.title}
    fill
    className="object-cover"
  />

</div>


      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">

        {/* Title */}
        <h3 className="text-2xl font-bold">

          {idea.title}

        </h3>



        {/* Category */}
        <p className="text-green-600 mt-2 font-medium">

          {idea.category}

        </p>



        {/* Description */}
        <p className="mt-4 text-sm text-gray-500 flex-grow">

          {idea.shortDescription}

        </p>



        {/* Extra Info */}
        <div className="mt-5 space-y-2 text-sm">

          <p>

            <span className="font-semibold">

              Budget:

            </span>{" "}

            {idea.estimatedBudget}

          </p>

          <p>

            <span className="font-semibold">

              Audience:

            </span>{" "}

            {idea.targetAudience}

          </p>

        </div>



        {/* Button */}
        <Link
          href={`/ideas/${idea._id}`}
          className="mt-6 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl text-center font-semibold duration-300"
        >

          View Details

        </Link>

      </div>

    </div>
  );
}