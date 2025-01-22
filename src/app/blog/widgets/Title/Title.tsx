import React from 'react'
import { ITitle } from './types'

const Title:React.FC<ITitle> = ({title}) => {
    return (
        <h1 className="text-3xl lg:text-3xl font-extrabold mt-6 text-center font-redRat">
            {title}
        </h1>
    )
}

export default Title