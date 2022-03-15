import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ModelsRedux, EnumsRedux } from 'types'

import { mainAppState } from './../states/mainApp-state'

import { InferActionsTypes, BaseThunkType } from '../redux-store'

/* START - MainApp additional imports and module code. */

const mainAppReducer = createSlice({
    name: 'mainApp',
    initialState: mainAppState,
    reducers: {
        performComponentInit(state) {},
        performInputSearchSelectValue(state, data: PayloadAction<ModelsRedux.IInputSearchSelectValue | null>) {
            state.inputSearchSelectValue = data.payload
        },
        performSetWeatherData(state, data: PayloadAction<ModelsRedux.IResponseWeather | null>) {
            state.weatherData = data.payload
        },
        performSetWeatherPhase(state, data: PayloadAction<EnumsRedux.ThunkChainPhase>) {
            state.weatherPhase = data.payload
        },
        performSetWeatherError(state, data: PayloadAction<ModelsRedux.IError | null>) {
            state.weatherError = data.payload
        },
    },
})

export default mainAppReducer

export type MainAppStateType = typeof mainAppState
type ActionsTypes = InferActionsTypes<typeof mainAppReducer.actions>
export type MainAppThunkType = BaseThunkType<ActionsTypes>
