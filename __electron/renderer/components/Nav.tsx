import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store/reducers'

export default function Nav() {
  const {langs, currentLang} = useSelector((state: RootState) => state.langReducer)

  const dispatch = useDispatch()

  return (
    <div className='p-3 shadow-md fixed z-40 w-full flex justify-end bg-white px-[5%]'>
      <select
        className='border rounded-md px-2 focus:outline-none focus:ring-2 bg-white focus:ring-primary'
        value={currentLang}
        onChange={(e) => {
          localStorage.setItem('lang', e.target.value)
          dispatch({
            type: 'SET_LANG',
            lang: e.target.value
          })
        }}
      >
        {langs.map(lang => <option key={lang} value={lang}>{lang.substr(0, 2).toUpperCase()}</option>)}
      </select>
    </div>
  )
}
