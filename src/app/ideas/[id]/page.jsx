import Image from "next/image";
import CommentSection from "@/components/CommentSection";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function IdeaDetailsPage({
  params,
}) {

  const { id } = await params;

  const {token}=await auth.api.getToken({

    headers:await headers()
  });

  console.log(token);



  const res = await fetch(

    `${process.env.NEXT_PUBLIC_SERVER_URL}/ideas/${id}`,

    {
      headers:{ authorization:`Bearer ${token}`}
    },

    {
      cache: "no-store",
    }

  );



  const idea = await res.json();



  if (!idea?._id) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        <h1 className="text-2xl font-bold">

          Idea Not Found

        </h1>

      </div>

    );

  }



  return (

    <div className="min-h-screen bg-gray-50 dark:bg-black py-10 px-4">

      <div className="max-w-5xl mx-auto">

       
        <div className="overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-800 shadow-lg">

          <Image
            src={idea.imageURL}
            alt={idea.title}
            width={1400}
            height={700}
            className="w-full h-[260px] md:h-[420px] object-cover"
          />

        </div>



        {/* Main Card */}
        <div className="mt-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl shadow-lg p-6 md:p-8">

          {/* Top */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <div>

              <span className="inline-block bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs font-semibold px-3 py-1 rounded-full">

                {idea.category}

              </span>



              <h1 className="text-2xl md:text-4xl font-bold mt-4 leading-tight">

                {idea.title}

              </h1>

            </div>



            <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl px-5 py-4 min-w-[180px]">

              <p className="text-xs text-gray-500">

                Estimated Budget

              </p>

              <h3 className="text-xl font-bold text-green-600 mt-1">

                {idea.estimatedBudget}

              </h3>

            </div>

          </div>



         
          <p className="mt-6 text-sm md:text-base text-gray-500 leading-7">

            {idea.shortDescription}

          </p>



          
          <div className="grid md:grid-cols-2 gap-5 mt-8">

            <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-5">

              <p className="text-xs text-gray-500 uppercase tracking-wide">

                Target Audience

              </p>

              <h3 className="text-lg font-semibold mt-2">

                {idea.targetAudience}

              </h3>

            </div>



            <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-5">

              <p className="text-xs text-gray-500 uppercase tracking-wide">

                Startup Category

              </p>

              <h3 className="text-lg font-semibold mt-2">

                {idea.category}

              </h3>

            </div>

          </div>



         
          <div className="mt-10">

            <h2 className="text-xl md:text-2xl font-bold">

              Detailed Description

            </h2>

            <p className="mt-4 text-sm md:text-base text-gray-500 leading-8">

              {idea.detailedDescription}

            </p>

          </div>



          {/* Problem + Solution */}
          <div className="grid md:grid-cols-2 gap-6 mt-10">

            {/* Problem */}
            <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 rounded-2xl p-5">

              <h2 className="text-lg font-bold text-red-600">

                Problem Statement

              </h2>

              <p className="mt-3 text-sm text-gray-600 dark:text-gray-300 leading-7">

                {idea.problemStatement}

              </p>

            </div>



            {/* Solution */}
            <div className="bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/20 rounded-2xl p-5">

              <h2 className="text-lg font-bold text-green-600">

                Proposed Solution

              </h2>

              <p className="mt-3 text-sm text-gray-600 dark:text-gray-300 leading-7">

                {idea.proposedSolution}

              </p>

            </div>

          </div>



          {/* Tags */}
          <div className="mt-10">

            <h2 className="text-xl md:text-2xl font-bold">

              Tags

            </h2>



            <div className="flex flex-wrap gap-3 mt-5">

              {idea.tags
                ?.split(",")
                ?.map((tag, index) => (

                  <span
                    key={index}
                    className="bg-gray-200 dark:bg-gray-800 text-xs md:text-sm px-4 py-2 rounded-full font-medium"
                  >

                    #{tag.trim()}

                  </span>

                ))}

            </div>

          </div>

          <CommentSection
  ideaId={idea._id}
/>

        </div>

      </div>

    </div>
  );
}