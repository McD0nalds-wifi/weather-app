import { AxiosError, AxiosResponse } from 'axios'

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

/**
 * Weather data request
 */
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

        // setTimeout(() => {
        //     const data: ModelsRedux.IResponseWeather = {
        //         location: {
        //             name: 'Челябинск',
        //             region: 'Chelyabinsk',
        //             country: 'Россия',
        //             lat: 55.15,
        //             lon: 61.43,
        //             tz_id: 'Asia/Yekaterinburg',
        //             localtime_epoch: 1647426538,
        //             localtime: '2022-03-16 15:28',
        //         },
        //         current: {
        //             last_updated_epoch: 1647425700,
        //             last_updated: '2022-03-16 15:15',
        //             temp_c: -7,
        //             temp_f: 19.4,
        //             is_day: 1,
        //             condition: {
        //                 text: 'Солнечно',
        //                 icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
        //                 code: 1000,
        //             },
        //             wind_mph: 0,
        //             wind_kph: 0,
        //             wind_degree: 0,
        //             wind_dir: 'N',
        //             pressure_mb: 1038,
        //             pressure_in: 30.65,
        //             precip_mm: 0,
        //             precip_in: 0,
        //             humidity: 45,
        //             cloud: 0,
        //             feelslike_c: -10,
        //             feelslike_f: 14.1,
        //             vis_km: 10,
        //             vis_miles: 6,
        //             uv: 1,
        //             gust_mph: 4.3,
        //             gust_kph: 6.8,
        //         },
        //     }
        //     dispatch(mainAppReducer.actions.performSetWeatherData(data))
        //     dispatch(mainAppReducer.actions.performSetWeatherPhase('Success'))
        // }, Math.random() * 100 + 300)

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
            (error: AxiosResponse<ModelsRedux.IError> | undefined) => {
                if (error) {
                    dispatch(mainAppReducer.actions.performSetWeatherError(error.data))
                    dispatch(mainAppReducer.actions.performSetWeatherPhase('Failure'))
                }
            },
            () => null,
            false,
        )
    }
    /* START - thunk callGetWeather after execute code. */
    /* END - thunk callGetWeather after execute code. */
}
