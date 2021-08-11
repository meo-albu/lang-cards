import rootReducer from '../../store/reducers'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import { screen, render, act } from '@testing-library/react';
import Category from '../../pages/category/[slug]'

import {MockedProvider} from '@apollo/client/testing'
import { gql } from '@apollo/client';

export const store = createStore(rootReducer)

export const MockProvider = ({children}: any) => {
  return <Provider store={store} >{children}</Provider>
}

const Query = gql`
  query Query($slug: String!) {
    getWords(slug: $slug) {
      german
      id
      translations {
        english
        romanian
      }
    }
  }
`

const mocks: any[] = [
  {
    request: {
      query: Query,
      variables: {
        slug: 'general',
      },
    },
    result: {
      data: {
        getWords: [{ german: 'ab', id: 'id1', translations: {english: 'from', romanian: 'din'} }]
      },
    },
  },
]

describe('Category page', () => {
  it('basic render', async () => {

    render(
      <MockProvider>
        <MockedProvider mocks={mocks} addTypename={false}>
          <Category slug='general' />
        </MockedProvider>
      </MockProvider>
    )
    
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0))
    })
    
    screen.getByText('ab')
  })
})