'use client'
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

const images = [{ src: './banner/banner-criar-conta.png?v=1', href: '/categoria?s=Poesia' },
{ src: './banner/banner-sherlock-2.png?v=1', href: '' },
{ src: './banner/banner-historia.png', href: 'https://pix-qr-code.com'}
];



export default function ImageSlider({ auto = false }: IImageSlider) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToNextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const goToPreviousSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (auto) {
            interval = setInterval(() => {
                goToNextSlide();
            }, 6000);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [auto]);

    return (
        <div className="relative w-full overflow-hidden py-4">
            <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {images.map((image, index) => (
                    <Link href={image.href} key={index} className="w-full flex-shrink-0 cursor-pointer">
                        <img src={image.src} className="w-full object-cover rounded-lg" alt={`Slide ${index}`} />
                    </Link>
                ))}
            </div>
            <button className=" hidden lg:block absolute top-1/2 left-2 transform -translate-y-1/2 p-2 bg-gray-700 text-white rounded-full" onClick={goToPreviousSlide}>
                <HiChevronLeft />
            </button>
            <button className="hidden lg:block absolute top-1/2 right-2 transform -translate-y-1/2 p-2 bg-gray-700 text-white rounded-full" onClick={goToNextSlide}>
                <HiChevronRight />
            </button>
            <div className=" flex justify-center items-center mt-2 gap-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-main-400 w-8' : 'bg-gray-600'}`}
                        onClick={() => goToSlide(index)}
                    ></button>
                ))}
            </div>
        </div>
    );
}
