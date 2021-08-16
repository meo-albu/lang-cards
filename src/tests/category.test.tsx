import rootReducer from 'store/reducers'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import { screen, render, act, fireEvent } from '@testing-library/react';
import Category from 'pages/category/[slug]'

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
        getWords: [
          { german: 'ab', id: 'id1', translations: {english: 'from', romanian: 'din'} },
          { german: 'bevor', id: 'id2', translations: {english: 'before', romanian: 'inainte'} },
        ]
      },
    },
  },
]

describe('Category page', () => {

  const Component = () => {
    return (
      <MockProvider>
        <MockedProvider mocks={mocks} addTypename={false}>
          <Category slug='general' />
        </MockedProvider>
      </MockProvider>
    )
  }

  it('basic render', async () => {

    render(<Component />)
    
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0))
    })

    screen.getByText('ab')
  })

  it("should change the word on 'next' button click", async () => {

    render(<Component />)
    
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0))
    })

    fireEvent.click(screen.getByRole('button', {name: 'next'}))
    
    screen.getByText('bevor')
  })

  it("should change the word on 'prev' button click", async () => {

    render(<Component />)
    
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0))
    })

    fireEvent.click(screen.getByRole('button', {name: 'next'}))
    screen.getByText('bevor')

    fireEvent.click(screen.getByRole('button', {name: 'prev'}))
    screen.getByText('ab')
  })

  it("the button should be disabled if first or last word is displayed", async () => {
    render(<Component />)
    
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0))
    })
    expect(screen.getByRole('button', {name: 'prev'})).toBeDisabled()
    expect(screen.getByRole('button', {name: 'next'})).not.toBeDisabled()
    
    fireEvent.click(screen.getByRole('button', {name: 'next'}))
    fireEvent.click(screen.getByRole('button', {name: 'next'}))
    expect(screen.getByRole('button', {name: 'next'})).toBeDisabled()
    expect(screen.getByRole('button', {name: 'prev'})).not.toBeDisabled()
  })
})