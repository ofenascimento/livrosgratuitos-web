import Image from 'next/image'
import React from 'react'

const CardInfo = () => {
    return (
        <div className='w-full flex justify-center items-center mt-10 px-4 md:px-0 lg:px-0 '>
            <div className='container flex flex-wrap  justify-between items-center gap-4 lg:gap-0 w-full'>
                <div style={{ backgroundColor: '#f3eeff' }} className='p-4 rounded w-full lg:w-auto'>
                    <div className='flex w-full justify-center items-center'>
                        <Image src='/card-info-1.png' width={150} height={150} alt='card-info-1' />
                    </div>

                    <h1 className=' font-medium'>Acesso Ilimitado</h1>
                    <p className=' w-full lg:w-64 mt-4'>Desfrute de acesso ilimitado a uma vasta biblioteca de ebooks sem gastar nada </p>
                </div>
                <div style={{ backgroundColor: '#f3eeff' }} className='p-4 rounded w-full lg:w-auto'>
                    <div className='flex w-full justify-center items-center'>
                        <Image src='/card-info-2.png' width={150} height={150} alt='card-info-1' />
                    </div>
                    <h1 className=' font-medium'>Descubra Tesouros Literários</h1>
                    <p className=' w-full lg:w-64 mt-4'>Explore uma coleção rica de obras clássicas que moldaram a literatura mundial </p>
                </div>
                <div style={{ backgroundColor: '#f3eeff' }} className='p-4 rounded w-full lg:w-auto'>
                    <div className='flex w-full justify-center items-center'>
                        <Image src='/card-info-3.png' width={150} height={150} alt='card-info-1' />
                    </div>
                    <h1 className=' font-medium'>Personalize Sua Leitura</h1>
                    <p className=' w-full lg:w-64 mt-4'>Ajuste o tamanho da fonte, o plano de fundo e mais para uma leitura confortável. </p>
                </div>
            </div>
        </div>
    )
}

export default CardInfo