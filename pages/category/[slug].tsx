import React from 'react'
import { Transition } from '@headlessui/react'

import { gql, useQuery } from '@apollo/client'
import { GetServerSideProps } from 'next'
import { Word } from '../../apollo/types'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/reducers'

const constants = require('../../constants.json')

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
interface Props {
  slug: string
}

export default function Category({slug}: Props) {
  
  const { data, loading } = useQuery(Query, {variables: {slug}})

  const [active, setActive] = React.useState(0)
  const [flipped, setFlipped] = React.useState(false)
  const [direction, setDirection] = React.useState<'left' | 'right'>('right')

  const {currentLang} = useSelector((state: RootState) => state.langReducer)

  if (loading) return (
    <div className='h-screen grid place-content-center bg-primary overflow-hidden'>
      <div className="w-80 h-48 shadow-lg bg-white animate-pulse rounded-md" />
      <div className='w-full flex justify-between mt-10'>
        <div className='h-10 w-20 rounded-md bg-white animate-pulse' />
        <div className='h-10 w-20 rounded-md bg-white animate-pulse' />
      </div>
    </div>
  )
  return (
    <div className='h-screen grid place-content-center bg-primary overflow-hidden'>
      {
        data?.getWords.map((word: Word, index: number) => {
          return (
            <div key={word.id} className='w-80 relative bg-red-500'>
              {
                  // <Transition
                  //   show={index === active}
                  //   enter="transition-all duration-300"
                  //   enterFrom={`opacity-0 ${direction === 'left' ? '-translate-x-full' : 'translate-x-full'}`}
                  //   enterTo="opacity-100 translate-x-0"
                  //   leave="transition-all duration-300"
                  //   leaveFrom="opacity-100 translate-x-0"
                  //   leaveTo={`opacity-0 ${direction === 'left' ? 'translate-x-full' : '-translate-x-full'}`}
                  //   className='absolute bottom-0'
                  // >
                    <div style={{perspective: '800px'}} className="container w-80 h-48 relative" onClick={() => setFlipped(!flipped)}>
                      <div
                        style={{
                          transform: flipped ? 'rotateY(180deg)' : '',
                          transformStyle: flipped ? 'preserve-3d' : 'preserve-3d'
                        }}
                        className="card w-full h-full transition-transform duration-700 absolute shadow-2xl cursor-pointer"
                      >
                        <div style={{backfaceVisibility: 'hidden'}} className="front absolute h-full w-full bg-white rounded-md grid place-content-center">{word.german}</div>
                        <div style={{transform: 'rotateY(180deg)', backfaceVisibility: 'hidden'}} className="back absolute h-full w-full bg-white rounded-md grid place-content-center p-6 text-center">
                          {
                            word.translations[currentLang].length > 0
                              ? word.translations[currentLang]
                              : constants['no-translation'][currentLang]
                          }
                        </div>
                      </div>
                    </div>
                  // </Transition>
              }
            </div>
          )
        })
      }
      <div className='w-full flex justify-between mt-10'>
        <button 
          className='px-6 py-2 bg-white rounded-md disabled:bg-opacity-30 disabled:cursor-not-allowed'
          onClick={() => {
            setDirection('left')
            setFlipped(false)
            setActive(prev => prev - 1)
          }}
          disabled={active === 0}
        >
          prev
        </button>
        <button
          className='px-6 py-2 bg-white rounded-md disabled:bg-opacity-30 disabled:cursor-not-allowed'
          onClick={() => {
            setDirection('right')
            setFlipped(false)
            setActive(prev => prev + 1)
          }}
          disabled={active === data?.getWords.length}
        >
          next
        </button>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: { 
      slug: context.query.slug
    }
  }
}