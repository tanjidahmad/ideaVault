// "use client";

// import { useEffect, useState } from "react";

// import toast from "react-hot-toast";

// import Image from "next/image";

// import DeleteIdeaModal from "@/components/DeleteIdeaModal";

// import UpdateIdeaModal from "@/components/UpdateIdeaModal";
// import {
//  authClient
// } from "@/lib/auth-client";

// export default function MyIdeasPage() {

//   const [ideas, setIdeas] =
//     useState([]);

//   const [loading, setLoading] =
//     useState(true);

//   const [deleteId, setDeleteId] =
//     useState(null);




// const {
//  data: session
// } =
// authClient.useSession();

// const userEmail =
// session?.user?.email;
//   // TEMP USER EMAIL
//   // BetterAuth পরে replace হবে
//   // const userEmail =
//   //   "demo@gmail.com";



//   // Fetch My Ideas
//   const fetchIdeas = async () => {

//     try {

//       const res = await fetch(

//         `http://localhost:8000/my-ideas/${userEmail}`

//       );



//       const data =
//         await res.json();

//       setIdeas(data);

//     } catch (error) {

//       console.log(error);

//       toast.error(
//         "Failed To Fetch Ideas"
//       );

//     } finally {

//       setLoading(false);

//     }
//   };



//   useEffect(() => {

//     fetchIdeas();

//   }, []);




//   if (loading) {

//     return (

//       <div className="min-h-screen flex items-center justify-center">

//         <span className="loading loading-spinner loading-lg text-green-600"></span>

//       </div>

//     );

//   }



//   return (

//     <div className="min-h-screen bg-gray-50 dark:bg-black px-4 py-12">

//       <div className="max-w-7xl mx-auto">

//         {/* Heading */}
//         <div className="mb-10">

//           <h1 className="text-4xl font-bold">

//             My Ideas

//           </h1>

//           <p className="text-gray-500 mt-3">

//             Manage all your submitted startup ideas.

//           </p>

//         </div>



//         {/* Empty State */}
//         {ideas.length === 0 ? (

//           <div className="text-center py-20 border border-dashed border-gray-300 dark:border-gray-700 rounded-3xl">

//             <h2 className="text-3xl font-bold">

//               No Ideas Found

//             </h2>

//             <p className="text-gray-500 mt-4">

//               You have not submitted any startup ideas yet.

//             </p>

//           </div>

//         ) : (

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

//             {ideas.map((idea) => (

//               <div
//                 key={idea._id}
//                 className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl duration-300 flex flex-col"
//               >

//                 {/* Image */}
//                 <div className="relative w-full h-56">

//                   <Image
//                     src={idea.imageURL}
//                     alt={idea.title}
//                     fill
//                     className="object-cover"
//                   />

//                 </div>



//                 {/* Content */}
//                 <div className="p-6 flex flex-col flex-grow">

//                   {/* Category */}
//                   <span className="bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs font-semibold px-3 py-1 rounded-full w-fit">

//                     {idea.category}

//                   </span>



//                   {/* Title */}
//                   <h2 className="text-2xl font-bold mt-4">

//                     {idea.title}

//                   </h2>



//                   {/* Description */}
//                   <p className="mt-4 text-sm text-gray-500 leading-7 flex-grow">

//                     {idea.shortDescription}

//                   </p>



//                   {/* Info */}
//                   <div className="mt-6 space-y-2 text-sm">

//                     <p>

//                       <span className="font-semibold">

//                         Budget:

//                       </span>{" "}

//                       {
//                         idea.estimatedBudget
//                       }

//                     </p>



//                     <p>

//                       <span className="font-semibold">

//                         Audience:

//                       </span>{" "}

//                       {
//                         idea.targetAudience
//                       }

//                     </p>

//                   </div>



//                   {/* Buttons */}
//                   <div className="flex items-center gap-3 mt-8">

//                     {/* Update */}
//                     <UpdateIdeaModal
//                       idea={idea}
//                       ideas={ideas}
//                       setIdeas={setIdeas}
//                     />



//                     {/* Delete */}
//                     <button
//                       onClick={() =>
//                         setDeleteId(
//                           idea._id
//                         )
//                       }
//                       className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-2xl font-medium duration-300"
//                     >

//                       Delete

//                     </button>

//                   </div>

//                 </div>

//               </div>

//             ))}

//           </div>

//         )}

//       </div>



//       {/* Delete Modal */}
//       <DeleteIdeaModal
//         deleteId={deleteId}
//         setDeleteId={
//           setDeleteId
//         }
//         ideas={ideas}
//         setIdeas={setIdeas}
//       />

//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import Image from "next/image";
import { useRouter } from "next/navigation";

import DeleteIdeaModal from "@/components/DeleteIdeaModal";

import UpdateIdeaModal from "@/components/UpdateIdeaModal";

import { authClient } from "@/lib/auth-client";




export default function MyIdeasPage() {
  const router = useRouter();

  useEffect(()=>{
 document.title =
 "My Ideas | IdeaVault";
},[])

  const [ideas, setIdeas] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [deleteId, setDeleteId] =
    useState(null);

  // SESSION
  const {
    data: session,
  } =
    authClient.useSession();

    console.log(session)

  const userEmail =
    session?.user?.email;

  // Fetch My Ideas
  const fetchIdeas =
    async () => {

      setLoading(true);

      try {

  //       const token =
  // await authClient.getToken();
const{data:tokenData}=await authClient.token()
console.log(tokenData)
const res =
  await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/my-ideas/${userEmail}`,
    {
      headers: {
        'content-type':'application/json',
        authorization: `Bearer ${tokenData?.token}`,
      },
    }
  );

        // const res =
        //   await fetch(

        //     `http://localhost:8000/my-ideas/${userEmail}`

        //   );

        const data =
          await res.json();

        // setIdeas(data);
setIdeas(
  Array.isArray(data)
    ? data
    : []
);


      } catch (error) {

        console.log(error);

        toast.error(
          "Failed To Fetch Ideas"
        );

      } finally {

        setLoading(false);

      }
    };

  useEffect(() => {

    if (userEmail) {

      fetchIdeas();

    }

  }, [userEmail]);

  // Loading
  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        <span className="loading loading-spinner loading-lg text-green-600"></span>

      </div>

    );
  }

  return (

    <div className="min-h-screen bg-gray-50 dark:bg-black px-4 py-12">

      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="mb-10">

          <h1 className="text-4xl font-bold">

            My Ideas

          </h1>

          <p className="text-gray-500 mt-3">

            Manage all your submitted startup ideas.

          </p>

        </div>

        {/* Empty State */}
        {
          ideas.length === 0 ? (

            <div className="text-center py-20 border border-dashed border-gray-300 dark:border-gray-700 rounded-3xl">

              <h2 className="text-3xl font-bold">

                No Ideas Found

              </h2>

              <p className="text-gray-500 mt-4">

                You have not submitted any startup ideas yet.

              </p>

            </div>

          ) : (

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

              {
                ideas.map((idea) => (

                  <div
                    key={idea._id}
                    className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl duration-300 flex flex-col"
                  >

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
                    <div className="p-6 flex flex-col flex-grow">

                      {/* Category */}
                      <span className="bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs font-semibold px-3 py-1 rounded-full w-fit">

                        {idea.category}

                      </span>

                      {/* Title */}
                      <h2 className="text-2xl font-bold mt-4">

                        {idea.title}

                      </h2>

                      {/* Description */}
                      <p className="mt-4 text-sm text-gray-500 leading-7 flex-grow">

                        {idea.shortDescription}

                      </p>

                      {/* Info */}
                      <div className="mt-6 space-y-2 text-sm">

                        <p>

                          <span className="font-semibold">

                            Budget:

                          </span>{" "}

                          {
                            idea.estimatedBudget
                          }

                        </p>

                        <p>

                          <span className="font-semibold">

                            Audience:

                          </span>{" "}

                          {
                            idea.targetAudience
                          }

                        </p>

                      </div>

                      {/* Buttons */}
                      <div className="flex items-center gap-3 mt-8">

                        {/* Update */}
                        <UpdateIdeaModal
                          idea={idea}
  ideas={ideas}
  setIdeas={setIdeas}
  session={session}
  router={router}
                        />

                        {/* Delete */}
                        <button
                          onClick={() =>
                            setDeleteId(
                              idea._id
                            )
                          }
                          className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-2xl font-medium duration-300"
                        >

                          Delete

                        </button>

                      </div>

                    </div>

                  </div>

                ))
              }

            </div>

          )
        }

      </div>

      {/* Delete Modal */}
      <DeleteIdeaModal
       deleteId={deleteId}
  setDeleteId={setDeleteId}
  ideas={ideas}
  setIdeas={setIdeas}
  session={session}
  router={router}
      />

    </div>
  );
}