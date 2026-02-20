import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { IBookWidget } from './types'

const Book: React.FC<IBookWidget> = ({ imageSrc, urlBook, pdfBook, urlEpub }) => {
    return (
        <div className=" flex justify-center items-center flex-col gap-2 mt-4">
            <Image
                src={imageSrc}
                width={156}
                height={225}
                alt=""
                className='rounded-lg'
            />
            <div className=" flex flex-col justify-center items-center gap-2">
                {urlEpub && <Link href={urlEpub}>
                    <div className=" bg-main-400 rounded-full px-8 py-2 font-normal w-64 text-center">EPUB</div>
                </Link>}
                <Link href={pdfBook}>
                    <div className="bg-[#F72C5B] rounded-full px-8 py-2 font-normal w-64 text-center">PDF</div>
                </Link>
                {urlBook && <Link href={urlBook}>
                    <div className=" bg-orange-400 rounded-full px-8 py-2 font-normal w-64 text-center">TXT</div>
                </Link>}

            </div>
        </div>
    )
}

export default Book