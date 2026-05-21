

"use client";

import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";

export default function CommentSection({
  ideaId,
}) {

  const [comments, setComments] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  // SESSION
  const {
    data: session,
  } =
    authClient.useSession();

  // Fetch Comments
  const fetchComments =
    async () => {

      try {

        const{data:tokenData}=await authClient.token()
console.log(tokenData)

        const res =
          await fetch(

            `${process.env.NEXT_PUBLIC_SERVER_URL}/comments/${ideaId}`,

             {
      headers: {
        'content-type':'application/json',
        authorization: `Bearer ${tokenData?.token}`,
      },
    }


          );

        const data =
          await res.json();

        setComments(data);

      } catch (error) {

        console.log(error);

      }
    };

  useEffect(() => {

    fetchComments();

  }, [ideaId]);

  // Add Comment
  const handleComment =
    async (e) => {

      e.preventDefault();

      setLoading(true);

      const form =
        e.target;

      const comment =
        form.comment.value;

      const commentData = {

        ideaId,

        comment,

        // REAL USER
        userName:
          session?.user?.name,

        userEmail:
          session?.user?.email,

        userImage:
          session?.user?.image,

        createdAt:
          new Date(),

      };

      try {

        // JWT TOKEN
// const token =
//   await authClient.getToken();

        const res =
          await fetch(

            `${process.env.NEXT_PUBLIC_SERVER_URL}/comments`,

            {

              method: "POST",

              headers: {

                "content-type":
                  "application/json",

                   authorization:
    `Bearer ${session.session.token}`,


              },

              body:
                JSON.stringify(
                  commentData
                ),

            }

          );

        const data =
          await res.json();

        if (
          data.insertedId
        ) {

          toast.success(
            "Comment Added"
          );

          form.reset();

          fetchComments();

        }

      } catch (error) {

        toast.error(
          "Failed To Add Comment"
        );

      } finally {

        setLoading(false);

      }
    };

  return (

    <div className="mt-12">

      {/* Heading */}
      <h2 className="text-2xl md:text-3xl font-bold">

        Community Discussion

      </h2>

      {/* Comment Form */}
      <form
        onSubmit={handleComment}
        className="mt-6"
      >

        <textarea
          name="comment"
          rows="4"
          placeholder="Share your thoughts about this startup idea..."
          className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 rounded-2xl p-4 outline-none focus:border-green-600"
          required
        ></textarea>

        <button
          type="submit"
          disabled={loading}
          className="mt-4 bg-green-600 hover:bg-green-700 disabled:opacity-70 text-white px-6 py-3 rounded-xl font-semibold duration-300"
        >

          {
            loading

              ? "Posting..."

              : "Post Comment"
          }

        </button>

      </form>

      {/* Comments */}
      <div className="space-y-5 mt-10">

        {
          comments.length > 0 ? (

            comments.map((item) => (

              <div
                key={item._id}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-5 shadow-sm"
              >

                {/* User */}
                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-3">

                   <Image
  src={item.userImage}
  alt={item.userName}
  width={48}
  height={48}
  className="w-12 h-12 rounded-full object-cover"
/>
                    <div>

                      <h3 className="font-semibold text-sm md:text-base text-gray-900 dark:text-white">

                        {item.userName}

                      </h3>

                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">

                        {item.userEmail}

                      </p>

                      <p className="text-xs text-gray-400 mt-1">

    {new Date(
      item.createdAt
    ).toLocaleString()}

  </p>

                    </div>

                  </div>

                  <span className="text-xs text-gray-400">

                    Community Member

                  </span>

                </div>

                {/* Comment */}
                <p className="mt-4 text-sm md:text-base text-gray-700 dark:text-gray-300 leading-7">

                  {item.comment}

                </p>

              </div>

            ))

          ) : (

            <div className="text-center py-10 border border-dashed border-gray-300 dark:border-gray-700 rounded-2xl">

              <h3 className="text-xl font-semibold">

                No Comments Yet

              </h3>

              <p className="mt-2 text-gray-500">

                Be the first to share your thoughts.

              </p>

            </div>

          )
        }

      </div>

    </div>
  );
}