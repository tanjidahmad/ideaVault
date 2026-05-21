"use client";

import { useState } from "react";

import IdeaCard from "./IdeaCard";

export default function IdeasContainer({
  ideas,
}) {

  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("");



  // Filter Logic
  const filteredIdeas =
    ideas.filter((idea) => {

      const matchSearch =
        idea.title
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );



      const matchCategory =
        category === ""
          ? true
          : idea.category === category;



      return (
        matchSearch &&
        matchCategory
      );

    });



  return (

    <div className="min-h-screen px-4 py-12 bg-gray-50 dark:bg-black">

      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-12">

          <h2 className="text-5xl font-bold">

            Explore Startup Ideas

          </h2>

          <p className="mt-4 text-gray-500">

            Discover innovative startup concepts from creators worldwide.

          </p>

        </div>



        {/* Search + Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">

          {/* Search */}
          <input
            type="text"
            placeholder="Search ideas by title..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="flex-1 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-xl px-4 py-3 outline-none focus:border-green-600"
          />



          {/* Category Filter */}
          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-xl px-4 py-3 outline-none focus:border-green-600"
          >

            <option value="">
              All Categories
            </option>

            <option value="Technology">
              Technology
            </option>

            <option value="Health">
              Health
            </option>

            <option value="Education">
              Education
            </option>

            <option value="AI">
              AI
            </option>

          </select>

        </div>



        {/* Ideas Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {filteredIdeas.map((idea) => (

            <IdeaCard
              key={idea._id}
              idea={idea}
            />

          ))}

        </div>



        {/* Empty State */}
        {filteredIdeas.length === 0 && (

          <div className="text-center py-20">

            <h3 className="text-3xl font-bold">

              No Ideas Found

            </h3>

            <p className="mt-4 text-gray-500">

              Try searching with another keyword or category.

            </p>

          </div>

        )}

      </div>

    </div>
  );
}