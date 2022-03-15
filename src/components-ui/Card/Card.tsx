import React from 'react'

import style from './Card.module.scss'

import { ModelsUI } from 'types'

/* START - Card additional imports and module code. */
import loader from '../../assets/loader.svg'

const Card: React.FC<ModelsUI.ICardProps> = ({ city, condition, icon, localtime, temperature, isLoading }) => {
    const date = new Date(localtime).toLocaleString('ru', {
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    })

    return (
        <div className={`${style.card} ${isLoading ? style.card_loading : ''}`}>
            <div className={style.card__header}>
                <div className={style.card__headerTitle}>{city}</div>
                <img src={icon} alt={'weather icon'} />
            </div>

            <div className={style.card__temperature}>{temperature}°</div>
            <div className={style.card__condition}>{condition}</div>
            <div className={style.card__date}>{date}</div>

            {isLoading ? (
                <div className={style.card__loader}>
                    <img src={loader} alt={'loader'} />
                </div>
            ) : null}
        </div>
    )
}

export default Card
