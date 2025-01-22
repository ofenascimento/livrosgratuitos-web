import React from 'react'
import { IDescription } from './types'

const Description: React.FC<IDescription> = ({ description }) => {
    return (
        <p className="text-lg lg:text-xl mb-4 mt-2 border-b border-b-gray-700 pb-6 text-center font-lexend font-light">
            {description}
        </p>
    )
}

export default Description