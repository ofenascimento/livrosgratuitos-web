import React from 'react'
import { IH3 } from './types'

const H3:React.FC<IH3> = ({text}) => {
    return (
        <h3 className="mt-2 font-semibold text-xl">{text}</h3>
    )
}

export default H3