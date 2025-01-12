import React from 'react'
import { IBannerWithButton } from './types'

const BannerWithButton:React.FC<IBannerWithButton> = ({title, subtitle, buttonLabel, onClick, srcImg, backgroundColor}) => {
    return (
        <>
            <div className="p-8 flex items-center font-lexend rounded-lg flex-wrap-reverse" style={{backgroundColor: backgroundColor ?? '#D6E2F3'}}>
                <div className="flex-1">
                    <h2 className="text-3xl font-bold mb-4 text-black">{title}</h2>
                    <p className="text-lg mb-6 text-black font-light">
                       {subtitle}
                    </p>
                    <button onClick={onClick} className="bg-main-400 text-white py-2 px-6 w-full md:w-auto rounded-full hover:bg-main-500 transition">
                        {buttonLabel}
                    </button>
                </div>

                <div className="flex-shrink-0 ml-6 mb-2 md:mb-0">
                    <img
                        src={srcImg}
                        alt=""
                        className="w-48 h-auto"
                    />
                </div>
            </div></>
    )
}

export default BannerWithButton