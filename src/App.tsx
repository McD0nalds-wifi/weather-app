import React from 'react'

import { Provider } from 'react-redux'

import './App.module.scss'

/* START - View App additional imports and module code. */
import store from './redux/redux-store'

import { MainApp } from 'components-view'

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <MainApp />
        </Provider>
    )
}

export default App
