"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import StorySliderSkeleton from "../Skeleton/StorySliderSkeleton";

export const categoriesMock = [
  { id: "1", title: "Romance", cover: "/images/categories/romance.png", url: "Romance" }, { id: "2", title: "Poesia", cover: "/images/categories/poesia.png", url: "Poesia" },
  { id: "3", title: "Terror", cover: "/images/categories/terror.png", url: "Terror" },
  { id: "4", title: "Filosofia", cover: "/images/categories/filosofia.webp", url: "Filosofia" },
  { id: "5", title: "Ficção", cover: "/images/categories/ficcao.png", url: "Ficcao" },
  { id: "6", title: "Fantasia", cover: "/images/categories/fantasia.png", url: "Fantasia" },
  { id: "7", title: "Política", cover: "/images/categories/politica.png", url: "Politica" },
  { id: "8", title: "História", cover: "/images/categories/historia.png", url: "Historia" },
  { id: "9", title: "Aventura", cover: "/images/categories/aventura.webp", url: "Aventura" },
];

function CategoryCard({
  item,
  priority,
}: {
  item: (typeof categoriesMock)[number];
  priority?: boolean;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="flex-shrink-0 w-24">
      <Link
        href={`/categoria?s=${item.url}`}
        className="flex flex-col justify-center items-center"
      >
        <div className="relative h-24 w-24 overflow-hidden rounded-3xl">
          {!loaded && (
            <div className="absolute inset-0 animate-pulse bg-gray-700" />
          )}

          <Image
            src={item.cover}
            alt={item.title}
            fill
            sizes="96px"
            className={`object-cover transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"
              }`}
            priority={priority}
            onLoadingComplete={() => setLoaded(true)}
          />
        </div>

        <span className="block text-center font-light text-white py-2 font-lexend">
          {item.title}
        </span>
      </Link>
    </div>
  );
}

export default function StorySlider() {
  if (!categoriesMock?.length) return <StorySliderSkeleton />;

  return (
    <div className="w-full overflow-x-auto py-4 scrollbar-hide lg:flex lg:justify-center lg:items-center">
      <div className="flex gap-4">
        {categoriesMock.map((item, index) => (
          <CategoryCard key={item.id} item={item} priority={index < 3} />
        ))}
      </div>
    </div>
  );
}