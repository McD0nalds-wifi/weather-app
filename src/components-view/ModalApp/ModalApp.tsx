import React from 'react'

import { shallowEqual, useDispatch } from 'react-redux'

import style from './ModalApp.module.scss'

import { Modal } from 'components-ui'

import * as modalAppThunk from '../../redux/thunks/modalApp-thunk'

import { ModalAppStateType } from '../../redux/reducers/modalApp-reducer'

import { useTypedSelector } from '../../hooks/useTypedSelector'

/* START - View ModalApp additional imports and module code. */
import internetErrorImage from '../../assets/internetError.png'

const renderModalContent = (appState: ModalAppStateType): JSX.Element => {
    switch (appState.modalContentType) {
        case 'InternetError':
            return (
                <div className={style.internetError}>
                    <img src={internetErrorImage} className={style.internetError__image} alt={'internet error'} />

                    <div className={style.internetError__text}>
                        Проверьте соединение с интернетом и обновите страницу
                    </div>
                </div>
            )
        default:
            return <div />
    }
}

const getModalTitle = (appState: ModalAppStateType): string => {
    switch (appState.modalContentType) {
        case 'InternetError':
            return 'Нет связи'
        default:
            return ''
    }
}

const ModalApp: React.FC = () => {
    /* START - Get store values. */
    const appState = useTypedSelector((state) => state.app, shallowEqual)
    /* END - Get store values. */

    /* START - Tracking side-effects. */
    const dispatch = useDispatch()
    /* END - Tracking side-effects. */

    /* START - View ModalApp content. */

    return (
        <Modal
            isOpen={appState.isModalOpen}
            title={getModalTitle(appState)}
            onClose={() => dispatch(modalAppThunk.performSetModalClose())}
        >
            {renderModalContent(appState)}
        </Modal>
    )
}

export default ModalApp
