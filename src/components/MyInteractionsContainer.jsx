"use client";

import { useState } from "react";

import EditCommentModal from "@/components/EditCommentModal";

import DeleteCommentModal from "@/components/DeleteCommentModal";

export default function MyInteractionsContainer({

  initialComments,

}) {

  const [comments, setComments] =
    useState(initialComments);

  const [deleteId, setDeleteId] =
    useState(null);



  return (

    <div className="min-h-screen bg-gray-50 dark:bg-black px-4 py-12">

      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="mb-10">

          <h1 className="text-4xl font-bold">

            My Interactions

          </h1>



          <p className="text-gray-500 mt-3">

            Manage all your comments and interactions.

          </p>

        </div>



        {/* Empty State */}
        {comments.length === 0 ? (

          <div className="text-center py-20 border border-dashed border-gray-300 dark:border-gray-700 rounded-3xl">

            <h2 className="text-3xl font-bold">

              No Interactions Found

            </h2>



            <p className="text-gray-500 mt-4">

              You have not commented on any ideas yet.

            </p>

          </div>

        ) : (

          <div className="grid md:grid-cols-2 gap-6">

            {comments.map(
              (comment) => (

                <div
                  key={comment._id}
                  className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-lg"
                >

                  {/* Top */}
                  <div className="flex items-center justify-between">

                    <span className="text-xs bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-3 py-1 rounded-full">

                      Interaction

                    </span>



                    <p className="text-xs text-gray-500">

                      {new Date(
                        comment.createdAt
                      ).toLocaleDateString()}

                    </p>

                  </div>



                  {/* Comment */}
                  <p className="mt-5 text-gray-700 dark:text-gray-300 leading-7">

                    {comment.comment}

                  </p>



                  {/* Buttons */}
                  <div className="flex items-center gap-3 mt-8">

                    {/* Edit */}
                    <EditCommentModal
                      comment={comment}
                      comments={comments}
                      setComments={setComments}
                    />



                    {/* Delete */}
                    <button
                      onClick={() =>
                        setDeleteId(
                          comment._id
                        )
                      }
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-2xl font-medium duration-300"
                    >

                      Delete

                    </button>

                  </div>

                </div>

              )
            )}

          </div>

        )}

      </div>



      {/* Delete Modal */}
      <DeleteCommentModal
        deleteId={deleteId}
        setDeleteId={setDeleteId}
        comments={comments}
        setComments={setComments}
      />

    </div>
  );
}