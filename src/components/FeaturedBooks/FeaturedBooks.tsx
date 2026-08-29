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
                        fill
                        style={{ objectFit: 'cover' }}
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
                <div className="flex gap-2 py-5 overflow-x-auto scrollbar-hide">
                    <Link href="/memorias-postumas-de-bras-cubas" className="cursor-pointer flex-shrink-0">
                        <Image
                            src="/featured-books/2.png"
                            width={160}
                            height={160}
                            alt="Livro 2"
                            loading="lazy"
                            sizes="160px"
                            className="rounded-md"
                        />
                    </Link>

                    <Link href="/o-alienista" className="cursor-pointer flex-shrink-0">
                        <Image
                            src="/featured-books/3.png"
                            width={160}
                            height={160}
                            alt="Livro 3"
                            loading="lazy"
                            sizes="160px"
                            className="rounded-md"
                        />
                    </Link>

                    <Link href="/dom-casmurro" className="cursor-pointer flex-shrink-0">
                        <Image
                            src="/featured-books/4.png"
                            width={160}
                            height={160}
                            alt="Livro 4"
                            loading="lazy"
                            sizes="160px"
                            className="rounded-md"
                        />
                    </Link>

                    <Link href="/helena" className="cursor-pointer flex-shrink-0">
                        <Image
                            src="/featured-books/5.png"
                            width={160}
                            height={160}
                            alt="Livro 5"
                            loading="lazy"
                            sizes="160px"
                            className="rounded-md"
                        />
                    </Link>

                    <Link href="/quincas-borba" className="cursor-pointer flex-shrink-0">
                        <Image
                            src="/featured-books/6.png"
                            width={160}
                            height={160}
                            alt="Livro 6"
                            loading="lazy"
                            sizes="160px"
                            className="rounded-md"
                        />
                    </Link>
                    <Link href="/a-mao-e-a-luva" className="cursor-pointer flex-shrink-0">
                        <Image
                            src="/featured-books/7.png"
                            width={160}
                            height={160}
                            alt="Livro 6"
                            loading="lazy"
                            sizes="160px"
                            className="rounded-md"
                        />
                    </Link>
                    <Link href="/esau-e-jaco" className="cursor-pointer flex-shrink-0">
                        <Image
                            src="/featured-books/8.png?v=1"
                            width={160}
                            height={160}
                            alt="Livro 6"
                            loading="lazy"
                            sizes="160px"
                            className="rounded-md"
                        />
                    </Link>
                    <Link href="/ressurreicao" className="cursor-pointer flex-shrink-0">
                        <Image
                            src="/featured-books/9.png"
                            width={160}
                            height={160}
                            alt="Livro 6"
                            loading="lazy"
                            sizes="160px"
                            className="rounded-md"
                        />
                    </Link>
                    <Link href="/iaia-garcia" className="cursor-pointer flex-shrink-0">
                        <Image
                            src="/featured-books/10.png"
                            width={160}
                            height={160}
                            alt="Livro 6"
                            loading="lazy"
                            sizes="160px"
                            className="rounded-md"
                        />
                    </Link>
                    <Link href="/memorial-de-aires" className="cursor-pointer flex-shrink-0">
                        <Image
                            src="/featured-books/11.png"
                            width={160}
                            height={160}
                            alt="Livro 6"
                            loading="lazy"
                            sizes="160px"
                            className="rounded-md"
                        />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default FeaturedBooks;