import {render} from '@testing-library/react'
import Main from '../Main'

import rootReducer from '../../store/reducers'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

export const store = createStore(rootReducer)

export const MockProvider = ({children}: any) => {
  return <Provider store={store} >{children}</Provider>
}

describe('Main component', () => {
  it('basic render', () => {
    render(
      <MockProvider>
        <Main />
      </MockProvider>
    )
  })
})