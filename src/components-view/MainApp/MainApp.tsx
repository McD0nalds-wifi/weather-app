import React from 'react'

import { shallowEqual, useDispatch } from 'react-redux'

import style from './MainApp.module.scss'

import { ModelsUI } from 'types'

import { Card, SearchSelect } from 'components-ui'

import * as mainAppThunk from '../../redux/thunks/mainApp-thunk'

import { useTypedSelector } from '../../hooks/useTypedSelector'

/* START - View MainApp additional imports and module code. */
import { ModalApp } from 'components-view'

const MainApp: React.FC = () => {
    /* START - Get store values. */
    const reducerState = useTypedSelector((state) => state.mainApp, shallowEqual)
    /* END - Get store values. */

    /* START - Tracking side-effects. */
    const dispatch = useDispatch()
    /* END - Tracking side-effects. */

    /* START - View MainApp content. */
    reducerState.weatherData?.location.name
    reducerState.weatherData?.location.localtime
    reducerState.weatherData?.location.localtime_epoch
    reducerState.weatherData?.current.temp_c
    reducerState.weatherData?.current.condition.text
    reducerState.weatherData?.current.condition.icon

    return (
        <React.Fragment>
            <div className={style.content}>
                <SearchSelect
                    title={'Город'}
                    placeholder={'Выберите город'}
                    selectList={[
                        { value: 'Москва', id: 1 },
                        { value: 'Челябинск', id: 2 },
                        { value: 'Самара', id: 3 },
                    ]}
                    selectedItem={reducerState.inputSearchSelectValue}
                    error={null}
                    onChange={(value: ModelsUI.ISelectedData) =>
                        dispatch(mainAppThunk.performInputSearchSelectValue(value))
                    }
                />

                {reducerState.weatherData ? (
                    <Card
                        city={reducerState.weatherData.location.name}
                        localtime={reducerState.weatherData.location.localtime}
                        temperature={reducerState.weatherData.current.temp_c}
                        condition={reducerState.weatherData.current.condition.text}
                        icon={reducerState.weatherData.current.condition.icon}
                        isLoading={reducerState.weatherPhase === 'InProgress'}
                    />
                ) : null}
            </div>
            <ModalApp />
        </React.Fragment>
    )
}

export default MainApp
