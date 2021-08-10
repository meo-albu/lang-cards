import rootReducer from '../../store/reducers'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import {getPage} from 'next-page-tester'

import { screen, fireEvent, render } from '@testing-library/react';
import Category from './[slug]'

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
        getWords: [
          { german: 'ab' }
        ],
      },
    },
  },
]

describe('Main component', () => {
  it('basic render', async () => {
    const { render } = await getPage({
      route: '/category/general',
      wrapper: {
        // eslint-disable-next-line
        Page: (Category) => (pageProps) => {
          return (
            <MockedProvider mocks={mocks} addTypename={false}>
              <Category {...pageProps} />
            </MockedProvider>
          );
        },
      },
    })

    // render(
    //   <MockProvider>
    //     <MockedProvider mocks={mocks} addTypename={false}>
    //       <Category slug='general' />
    //     </MockedProvider>
    //   </MockProvider>
    // )

    render()

    await new Promise(resolve => setTimeout(resolve, 300))

    screen.getByText('ab')
  })
})