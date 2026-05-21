



"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  {
    title: "Launch Your Startup Idea",
    desc: "Share innovative startup ideas with creators and investors around the world.",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
  },

  {
    title: "Discover Future Innovation",
    desc: "Explore trending ideas in AI, health, technology and education.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
  },

  {
    title: "Collaborate & Build Together",
    desc: "Connect with creative minds and improve startup concepts together.",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72",
  },
];


export default function Home() {

  useEffect(()=>{
 document.title =
 "Home | IdeaVault";
},[])

  const [currentSlide, setCurrentSlide] =
    useState(0);

  const [ideas, setIdeas] =
    useState([]);

  // Slider
  useEffect(() => {

    const interval = setInterval(() => {

      setCurrentSlide((prev) =>
        prev === slides.length - 1
          ? 0
          : prev + 1
      );

    }, 4000);

    return () =>
      clearInterval(interval);

  }, []);

  // Trending Ideas Fetch
  useEffect(() => {

    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/trending-ideas`
    )
      .then((res) => res.json())
      .then((data) => {

        setIdeas(data);

      });

  }, []);

  return (

    <div>

      {/* Banner Slider */}
      <section
        className="h-[85vh] bg-cover bg-center duration-500"
        style={{
          backgroundImage: `url(${slides[currentSlide].image})`,
        }}
      >

        <div className="bg-black/60 w-full h-full flex items-center">

          <div className="max-w-7xl mx-auto px-4 text-white">

            <div className="max-w-2xl">

              <h1 className="text-5xl md:text-6xl font-bold leading-tight">

                {slides[currentSlide].title}

              </h1>

              <p className="mt-6 text-lg text-gray-200">

                {slides[currentSlide].desc}

              </p>

              <Link
                href="/ideas"
                className="inline-block mt-8 bg-green-600 hover:bg-green-700 duration-300 px-6 py-3 rounded-lg font-semibold"
              >

                Explore Ideas

              </Link>

            </div>

          </div>

        </div>

      </section>

      {/* Trending Ideas */}
      <section className="max-w-7xl mx-auto px-4 py-20">

        <div className="flex items-center justify-between mb-12">

          <h2 className="text-4xl font-bold">

            Trending Ideas

          </h2>

          <Link
            href="/ideas"
            className="text-green-600 font-semibold"
          >

            View All

          </Link>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {ideas.map((idea) => (

            <div
              key={idea._id}
              className="border rounded-2xl overflow-hidden hover:shadow-2xl duration-300 flex flex-col"
            >

             <Image
  src={idea.imageURL}
  alt={idea.title}
  fill
  className="object-cover"
/>

              <div className="p-5 flex flex-col flex-grow">

                <h3 className="text-2xl font-bold">

                  {idea.title}

                </h3>

                <p className="text-green-600 mt-2 font-medium">

                  {idea.category}

                </p>

                <p className="mt-4 text-sm text-gray-500 flex-grow">

                  {idea.shortDescription}

                </p>

                <Link
                  href={`/ideas/${idea._id}`}
                  className="mt-6 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg text-center font-semibold duration-300"
                >

                  View Details

                </Link>

              </div>

            </div>

          ))}

        </div>

      </section>

      {/* Extra Section 1 */}
      <section className="bg-gray-100 dark:bg-gray-900 py-20">

        <div className="max-w-7xl mx-auto px-4">

          <h2 className="text-4xl font-bold text-center mb-14">

            Popular Categories

          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            {[
              "Technology",
              "Health",
              "Education",
              "Artificial Intelligence",
            ].map((category) => (

              <div
                key={category}
                className="bg-white dark:bg-black rounded-2xl p-10 text-center shadow-lg hover:-translate-y-2 duration-300"
              >

                <h3 className="text-2xl font-bold">

                  {category}

                </h3>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* Extra Section 2 */}
      <section className="max-w-7xl mx-auto px-4 py-20">

        <h2 className="text-4xl font-bold text-center mb-14">

          Community Statistics

        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="border rounded-2xl p-12 text-center hover:shadow-xl duration-300">

            <h3 className="text-5xl font-bold text-green-600">

              500+

            </h3>

            <p className="mt-4 text-lg">

              Startup Ideas

            </p>

          </div>

          <div className="border rounded-2xl p-12 text-center hover:shadow-xl duration-300">

            <h3 className="text-5xl font-bold text-green-600">

              2K+

            </h3>

            <p className="mt-4 text-lg">

              Active Users

            </p>

          </div>

          <div className="border rounded-2xl p-12 text-center hover:shadow-xl duration-300">

            <h3 className="text-5xl font-bold text-green-600">

              10K+

            </h3>

            <p className="mt-4 text-lg">

              Community Comments

            </p>

          </div>

        </div>

      </section>

    </div>
  );
}