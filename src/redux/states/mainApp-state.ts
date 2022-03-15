import { ModelsRedux, EnumsRedux } from 'types'

/* START - MainApp additional imports and module code. */

export const mainAppState = {
    inputSearchSelectValue: null as ModelsRedux.IInputSearchSelectValue | null,
    weatherData: null as ModelsRedux.IResponseWeather | null,
    weatherPhase: 'never' as EnumsRedux.ThunkChainPhase,
    weatherError: null as ModelsRedux.IError | null,
}
