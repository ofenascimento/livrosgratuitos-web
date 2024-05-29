import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className='my-8 flex flex-col md:flex-row gap-8 justify-center items-center'>
      <Link href='/politica-de-privacidade'> Política de Privacidade </Link>
      <Link href='/termos-e-condicoes'> Termos e Condições </Link>
      <Link href='mailto:contato@livrosgratuitos.com'> Contato </Link>
    </div>
  )
}

export default Footer