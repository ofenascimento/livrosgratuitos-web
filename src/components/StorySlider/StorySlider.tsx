'use client'
import React, { useEffect, useState } from "react";
import StorySliderSkeleton from "../Skeleton/StorySliderSkeleton";
import Link from "next/link";
import { url } from "inspector";

export const categoriesMock = [
  {
    id: "1",
    title: "Fantasia",
    cover: "./images/categories/fantasia.png",
    url: "Fantasia"
  },
  {
    id: "2",
    title: "Poesia",
    cover: "./images/categories/poesia.png",
    url: "Poesia"
  },
  {
    id: "3",
    title: "Terror",
    cover: "./images/categories/terror.png",
    url: "Terror"
  },
  {
    id: "4",
    title: "Filosofia",
    cover: "./images/categories/filosofia.webp",
    url: "Filosofia"
  },
  {
    id: "5",
    title: "Ficção",
    cover: "./images/categories/ficcao.png",
    url: "Ficcao"
  },
  {
    id: "6",
    title: "Romance",
    cover: "./images/categories/romance.png",
    url: "Romance"
  },
  {
    id: "7",
    title: "Política",
    cover: "./images/categories/politica.png",
    url: "Politica"
  },
  {
    id: "8",
    title: "História",
    cover: "./images/categories/historia.png",
    url: "Historia"
  },
  {
    id: "9",
    title: "Aventura",
    cover: "./images/categories/aventura.webp",
    url: "Aventura"
  },
];

const StorySlider = () => {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    const imagePromises = categoriesMock.map((category) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = category.cover;
        img.onload = resolve;
        img.onerror = resolve;
      });
    });

    Promise.all(imagePromises).then(() => {
      setImagesLoaded(true);
    });
  }, []);

  if (!imagesLoaded) {
    return <StorySliderSkeleton />;
  }

  return (
    <div className="w-full overflow-x-auto py-4 scrollbar-hide lg:flex lg:justify-center lg:items-center">
      <div className="flex gap-4">
        {categoriesMock.map((item, index) => (
          <div key={index} className="flex-shrink-0 w-24">
            <Link
              href={`/categoria?s=${item.url}`}
              className=" flex flex-col justify-center items-center"
            >
              <img
                src={item.cover}
                alt={item.title}
                className="h-24 w-24 object-cover rounded-3xl"
              />
              <span className="block text-center font-medium text-white py-2">
                {item.title}
              </span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StorySlider;
