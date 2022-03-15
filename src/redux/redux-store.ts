import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { ThunkAction } from 'redux-thunk'
import { Action } from 'redux'

import modalAppReducer from './reducers/modalApp-reducer'
import mainAppReducer from './reducers/mainApp-reducer'

const rootReducer = combineReducers({
    modalApp: modalAppReducer.reducer,
    mainApp: mainAppReducer.reducer,
})

type RootReducerType = typeof rootReducer
export type RootStateType = ReturnType<RootReducerType>

export type InferActionsTypes<T> = T extends {
    [key: string]: (...args: any[]) => infer U
}
    ? U
    : never

export type BaseThunkType<A extends Action, R = void> = ThunkAction<R, RootStateType, unknown, A>

// redux-thunk идет из коробки
const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
})

export default store
