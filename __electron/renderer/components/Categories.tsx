import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'store/reducers'

import Link from 'next/link'

const constants = require('constants.json')

interface Title {
  english: string
  romanian: string
}

interface Category {
  title: Title
  slug: string
}

interface Props {
  categories: Category[]
}

export default function Categories({categories}: Props) {
  const {currentLang} = useSelector((state: RootState) => state.langReducer)

  return (
    <div className='bg-primary/50 py-[10%]'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14'>
        <h2 className='text-4xl'>
          {constants['categories-title'][currentLang]}
        </h2>
      </div>
      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-x-24 gap-y-10 text-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {
          categories.map((category, index) => {
            return (
              <Link
                key={index}
                href={{
                  pathname: `/category/${category.slug}`,
                }}
                passHref
              >
                <button
                  className='px-9 py-12 bg-white rounded-md shadow-md hover:shadow-lg cursor-pointer transition focus:outline-none focus:ring-2 focus:ring-primary focus:shadow-lg'
                >
                  {category.title[currentLang]}
                </button>
              </Link>
            )
          })
        }
      </div>
    </div>
  )
}
