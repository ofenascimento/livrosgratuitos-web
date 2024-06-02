import React from "react";
import style from "./StorySlider.module.css";

export const categoriesMock = [
  {
    id: "1",
    title: "Fantasia",
    cover: "./images/categories/fantasia.png",
  },
  {
    id: "2",
    title: "Poesia",
    cover: "./images/categories/poesia.png",
  },
  {
    id: "3",
    title: "Terror",
    cover: "./images/categories/terror.png",
  },
  {
    id: "4",
    title: "Filosofia",
    cover: "./images/categories/filosofia.webp",
  },
  {
    id: "5",
    title: "Ficcao",
    cover: "./images/categories/ficcao.png",
  },
  {
    id: "6",
    title: "Romance",
    cover: "./images/categories/romance.png",
  },
  {
    id: "7",
    title: "Política",
    cover: "./images/categories/politica.png",
  },
  {
    id: "8",
    title: "História",
    cover: "./images/categories/historia.png",
  },
];

const StorySlider = () => {
  return (
    <div className={style.slide}>
      <div className={style.scrollingWrapper}>
        {categoriesMock.map((item, index) => (
          <div className={style.boxSlide} key={index}>
            <a href={item.cover} target="_blank">
              <img src={item.cover} alt={item.title} />
              <span className={style.text}>{item.title}</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StorySlider;
