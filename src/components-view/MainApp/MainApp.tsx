import React from 'react'

import { Redirect, Route, Switch } from 'react-router-dom'
import { shallowEqual, useDispatch } from 'react-redux'

import style from './MainApp.module.scss'

import { Card } from 'components-ui'

/* START - View MainApp additional imports and module code. */
import { ModalApp } from 'components-view'

const MainApp: React.FC = () => {
    /* START - Get store values. */
    /* END - Get store values. */

    /* START - Tracking side-effects. */
    const dispatch = useDispatch()
    /* END - Tracking side-effects. */

    /* START - View MainApp content. */

    return (
        <React.Fragment>
            <div className={style.content}>
                <Card />
            </div>
            <ModalApp />
        </React.Fragment>
    )
}

export default MainApp
