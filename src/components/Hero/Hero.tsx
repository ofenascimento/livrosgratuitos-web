import Image from 'next/image'
import React from 'react'

const Hero = () => {
    return (
        <div className='  w-full flex justify-center items-center mt-10 flex-wrap'>
            <div className='container  flex flex-wrap justify-center items-center'>
                <div className='w-full md:w-2/4 flex flex-col flex-wrap justify-center md:justify-start items-center md:items-start'>
                    <h1 className=' text-title text-center md:text-start font-semibold'>Explore Histórias Incríveis</h1>
                    <h1 className=' text-title font-semibold text-main'>Totalmente grátis</h1>
                    <p className=' mt-6 text-center md:text-start px-4 md:px-0'>Junte-se à nossa comunidade de amantes de livros e desfrute de uma experiência de leitura sem fronteiras. Sem taxas, sem compromissos – apenas puro prazer de leitura.</p>
                    <div className=' flex justify-center md:justify-start items-center w-full mt-6 gap-4'  >
                        <button className=' bg-main p-4 rounded-md text-white'  >Comece a Ler Agora</button>
                    </div>
                </div>
                <div className=' w-2/4 flex flex-wrap justify-center items-center mt-6 md:mt-0'>
                    <Image src='/preview.png' width={450} height={300} alt='' />
                </div>
            </div>
        </div>
    )
}

export default Hero