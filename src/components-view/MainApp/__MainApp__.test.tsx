import React from 'react'
import { Provider } from 'react-redux'

import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import store from '../../redux/redux-store'

import { MainApp } from 'components-view'

const renderWithRedux = (component: React.ReactElement<any, any>) => {
    return {
        ...render(<Provider store={store}>{component}</Provider>),
    }
}

describe('MainApp component testing', () => {
    it('checks that the request for getting the weather worked correctly', async () => {
        const { getByText, findAllByRole, getByRole } = renderWithRedux(<MainApp />)

        userEvent.click(getByRole('textbox'))
        userEvent.click(getByText('Москва'))

        const items = await findAllByRole('heading')

        expect(items).toHaveLength(1)
    })
})
