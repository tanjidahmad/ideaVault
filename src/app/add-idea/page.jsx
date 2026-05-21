

"use client";

import toast from "react-hot-toast";

import { authClient } from "@/lib/auth-client";

import { useEffect } from "react";




export default function AddIdeaPage() {

  useEffect(()=>{
 document.title =
 "add-idea | IdeaVault";
},[])

  // SESSION
  const {
    data: session,
  } =
    authClient.useSession();

  const handleAddIdea =
    async (e) => {

      e.preventDefault();

      const form =
        e.target;

      const title =
        form.title.value;

      const shortDescription =
        form.shortDescription.value;

      const detailedDescription =
        form.detailedDescription.value;

      const category =
        form.category.value;

      const tags =
        form.tags.value;

      const imageURL =
        form.imageURL.value;

      const estimatedBudget =
        form.estimatedBudget.value;

      const targetAudience =
        form.targetAudience.value;

      const problemStatement =
        form.problemStatement.value;

      const proposedSolution =
        form.proposedSolution.value;

      const newIdea = {

        title,
        shortDescription,
        detailedDescription,
        category,
        tags,
        imageURL,
        estimatedBudget,
        targetAudience,
        problemStatement,
        proposedSolution,

        // REAL LOGGED USER
        userEmail:
          session?.user?.email,

        userName:
          session?.user?.name,

        userImage:
          session?.user?.image,

        createdAt:
          new Date(),

      };

      try {

        const{data:tokenData}=await authClient.token()
console.log(tokenData)

        const res =
          await fetch(

            `${process.env.NEXT_PUBLIC_SERVER_URL}/ideas`,

            {

              method: "POST",

              headers: {

                "content-type":
                  "application/json",

                   authorization: `Bearer ${tokenData?.token}`,

              },

              body:
                JSON.stringify(
                  newIdea
                ),

            }

          );

        const data =
          await res.json();

        console.log(data);

        if (
          data.insertedId
        ) {

          toast.success(
            "Idea Added Successfully"
          );

          form.reset();

        }

      } catch (error) {

        toast.error(
          "Something went wrong"
        );

      }
    };

  return (

    <div className="min-h-screen px-4 py-12 bg-gray-50 dark:bg-black">

      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-3xl p-8 shadow-xl">

        <div className="text-center mb-10">

          <h2 className="text-4xl font-bold">

            Submit Startup Idea

          </h2>

        </div>

        <form
          onSubmit={handleAddIdea}
          className="space-y-6"
        >

          <input
            type="text"
            name="title"
            placeholder="Idea Title"
            className="w-full border p-3 rounded-xl"
            required
          />

          <textarea
            name="shortDescription"
            placeholder="Short Description"
            className="w-full border p-3 rounded-xl"
            required
          ></textarea>

          <textarea
            name="detailedDescription"
            placeholder="Detailed Description"
            className="w-full border p-3 rounded-xl"
            required
          ></textarea>

          <select
            name="category"
            className="w-full border p-3 rounded-xl"
            required
          >

            <option value="">
              Select Category
            </option>

            <option value="Technology">
              Technology
            </option>

            <option value="AI">
              AI
            </option>

            <option value="Health">
              Health
            </option>

            <option value="Education">
              Education
            </option>


          </select>

          <input
            type="text"
            name="tags"
            placeholder="Tags"
            className="w-full border p-3 rounded-xl"
          />

          <input
            type="text"
            name="imageURL"
            placeholder="Image URL"
            className="w-full border p-3 rounded-xl"
            required
          />

          <input
            type="text"
            name="estimatedBudget"
            placeholder="Estimated Budget"
            className="w-full border p-3 rounded-xl"
          />

          <input
            type="text"
            name="targetAudience"
            placeholder="Target Audience"
            className="w-full border p-3 rounded-xl"
            required
          />

          <textarea
            name="problemStatement"
            placeholder="Problem Statement"
            className="w-full border p-3 rounded-xl"
            required
          ></textarea>

          <textarea
            name="proposedSolution"
            placeholder="Proposed Solution"
            className="w-full border p-3 rounded-xl"
            required
          ></textarea>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-xl"
          >

            Submit Idea

          </button>

        </form>

      </div>

    </div>
  );
}