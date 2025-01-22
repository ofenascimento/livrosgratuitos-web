import React from 'react'
import { IParagraph } from './types'

const Paragraph: React.FC<IParagraph> = ({ text }) => {
    return (
        <div className="prose prose-xl font-nunito leading-6 text-xl mt-4 ">
            <p>
                {text}
            </p>
        </div>
    )
}

export default Paragraph