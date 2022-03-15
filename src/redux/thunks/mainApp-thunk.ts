import { AxiosResponse } from 'axios'

import { ModelsRedux, EnumsRedux } from 'types'

import mainAppReducer, { MainAppThunkType } from '../reducers/mainApp-reducer'

import * as constants from '../../common/constants'
import * as util from '../../common/util'

import { API } from '../../api/api'

/* START - MainApp additional imports and module code. */
import * as modalAppThunk from './modalApp-thunk'

/**
 * Thunk update inputSearchSelectValue
 * @param {ModelsRedux.IInputSearchSelectValue} value new value
 */
export const performInputSearchSelectValue =
    (value: ModelsRedux.IInputSearchSelectValue): MainAppThunkType =>
    (dispatch, getState) => {
        /* START - thunk performInputSearchSelectValue before execute code. */
        /* END - thunk performInputSearchSelectValue before execute code. */
        dispatch(mainAppReducer.actions.performInputSearchSelectValue(value))
        /* START - thunk performInputSearchSelectValue after execute code. */
        dispatch(callGetWeather())
        /* END - thunk performInputSearchSelectValue after execute code. */
    }

export const callGetWeather = (): MainAppThunkType => (dispatch, getState) => {
    /* START - thunk callGetWeather before execute code. */
    if (!util.checkInternetConnected()) {
        dispatch(modalAppThunk.performSetModalOpen('InternetError'))
        return
    }
    /* END - thunk callGetWeather before execute code. */
    let reducerState = getState().mainApp

    if (reducerState.weatherPhase !== 'InProgress') {
        dispatch(mainAppReducer.actions.performSetWeatherPhase('InProgress'))
        dispatch(mainAppReducer.actions.performSetWeatherError(null))

        API.apiGet<ModelsRedux.IReguestWeather, ModelsRedux.IResponseWeather>(
            'current.json',
            {
                key: constants.WEATHER_API_KEY,
                q: reducerState.inputSearchSelectValue ? reducerState.inputSearchSelectValue.value : '-',
                aqi: 'no',
                lang: 'ru',
            },
            (response: AxiosResponse<ModelsRedux.IResponseWeather>) => {
                dispatch(mainAppReducer.actions.performSetWeatherData(response.data))
                dispatch(mainAppReducer.actions.performSetWeatherPhase('Success'))
            },
            (error: AxiosResponse<ModelsRedux.IError>) => {
                dispatch(mainAppReducer.actions.performSetWeatherError(error.data))
                dispatch(mainAppReducer.actions.performSetWeatherPhase('Failure'))
            },
            () => null,
            false,
        )
    }
    /* START - thunk callGetWeather after execute code. */
    /* END - thunk callGetWeather after execute code. */
}
