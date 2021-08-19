import React, { ReactElement } from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from '../reducers'

const store = createStore(rootReducer)

export default function Provider({children}: {children: ReactElement | ReactElement[]}) {
  return (
    <ReduxProvider store={store}>
      {children}
    </ReduxProvider>
  )
}
