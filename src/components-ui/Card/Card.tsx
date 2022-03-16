import React from 'react'

import style from './Card.module.scss'

import { ModelsUI } from 'types'

/* START - Card additional imports and module code. */

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
                <h4 className={style.card__headerTitle}>{city}</h4>
                <img src={icon} alt={'weather icon'} />
            </div>

            <div className={style.card__temperature}>{temperature}°</div>
            <div className={style.card__condition}>{condition}</div>
            <div className={style.card__date}>{date}</div>

            {isLoading ? (
                <div className={style.card__loader}>
                    <div className={style.card__loaderImg} />
                </div>
            ) : null}
        </div>
    )
}

export default Card
