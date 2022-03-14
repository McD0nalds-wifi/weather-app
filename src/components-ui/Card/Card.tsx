import React from 'react'

import style from './Card.module.scss'

import * as ModelsUI from '../../types/ui/models'

/* START - Card additional imports and module code. */

const Card: React.FC = () => {
    return (
        <div
            style={{
                padding: '20px',
                backgroundColor: 'white',
                borderRadius: '20px',
                boxShadow: '0px 5px 10px 2px rgba(34, 60, 80, 0.2)',
            }}
        >
            some text
        </div>
    )
}

export default Card
