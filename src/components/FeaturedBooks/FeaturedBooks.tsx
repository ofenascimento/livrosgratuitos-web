import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const FeaturedBooks: React.FC = () => {
    return (
        <div className='bg-dark-background rounded-lg flex flex-wrap md:flex-nowrap'>
            <div className='w-full md:w-1/4 p-2 flex justify-center items-center relative'>
                <div className='pb-[100%]'>
                    <Image
                        src='/featured-books/1.webp'
                        layout='fill'
                        objectFit='cover'
                        alt='Featured Book'
                    />
                </div>
            </div>
            <div className='w-full md:w-3/4 flex flex-col p-2 mt-4 ml-4'>
                <h1 className='text-2xl lg:text-3xl font-poppins' style={{
                    textDecorationColor: "#7B66FF",
                    textDecorationThickness: "5px",
                    textDecorationLine: "underline",
                }}>Coleção Machado de Assis</h1>
                <p className='mt-4 lg:mt-3 font-lexend font-light'>Explorando Machado de Assis: Um mergulho nas obras icônicas do mestre da literatura brasileira. Descubra contos intrigantes como 'Dom Casmurro' e 'Memórias Póstumas de Brás Cubas', que desafiam convenções e exploram as complexidades da condição humana.</p>
                <div className='flex gap-2 py-5 overflow-x-auto scrollbar-hide'>
                    <Link href='/livro?bookId=65eeabf7822f5ccbb5d70831' className='cursor-pointer flex-shrink-0'>
                        <Image src='/featured-books/2.png' width={160} height={160} alt='' className='rounded-md' />
                    </Link>
                    <Link href='/livro?bookId=65eeac38822f5ccbb5d70837' className='cursor-pointer flex-shrink-0'>
                        <Image src='/featured-books/3.png' width={160} height={160} alt='' className='rounded-md' />
                    </Link>
                    <Link href='/livro?bookId=65f42c3a032f702921e340ab' className='cursor-pointer flex-shrink-0'>
                        <Image src='/featured-books/4.png'width={160} height={160} alt='' className='rounded-md' />
                    </Link>
                    <Link href='/livro?bookId=65f4183b032f702921e3395c' className='cursor-pointer flex-shrink-0'>
                        <Image src='/featured-books/5.png'width={160} height={160} alt='' className='rounded-md' />
                    </Link>
                    <Link href='/livro?bookId=65f4183b032f702921e3395c' className='cursor-pointer flex-shrink-0'>
                        <Image src='/featured-books/6.png'width={160} height={160} alt='' className='rounded-md' />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default FeaturedBooks;
