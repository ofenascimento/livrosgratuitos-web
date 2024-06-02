"use client";
import React, { useState, useEffect } from "react";
import Title from "../Title/Title";

const emojis = ["📖", "📚", "🕵️‍♂️", "👩‍❤️‍💋‍👨", "⚔️", "👽", "💡", "🧛‍♂️", "🏛️", "🏆"];

const TitleWithEmoji: React.FC = () => {
  const [currentEmojiIndex, setCurrentEmojiIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEmojiIndex((prevIndex) => (prevIndex + 1) % emojis.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center text-2xl relative w-full justify-start lg:justify-center">
      <div className="w-full lg:w-[80%] flex justify-start items-center">
        <Title
          titleClassName="lg:text-start"
          title={
            <>
              Qual história vamos {"  "}
              <span
                className="font-semibold font-inter"
                style={{
                  background:
                    "linear-gradient(90deg,#6e48ff 0,#cf40ff 48%,#ffa22c)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                ler hoje?
              </span>
            </>
          }
        />
        <span className="emoji-switcher mb-12 bg-orange-200 ml-4  hidden lg:block">
          {emojis.map((emoji, index) => (
            <span
              key={index}
              className={`absolute transition-transform duration-[800ms] text-4xl ease-[cubic-bezier(0.68, -0.55, 0.27, 1.55)] ${
                index === currentEmojiIndex
                  ? "opacity-100 transform translate-y-0"
                  : "opacity-0 transform -translate-y-10"
              }`}
            >
              {emoji}
            </span>
          ))}
        </span>
      </div>
    </div>
  );
};

export default TitleWithEmoji;
