import React, { ReactElement } from 'react'
import { Text } from 'react-native'
import tw from 'tailwind-react-native-classnames'

export interface Props {
  children?: String | ReactElement
  level: '1' | '2' | '3' | '4' | '5' | '6'
  style?: string
}

export default function Heading({children, level, style}: Props) {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  React.useEffect(() => dispatch({type: level}), [level])

  return (
    React.createElement(
      Text, 
      {
        style: tw`${state?.fontSize} ${state?.fontWeight} ${style ? style : ''}`
      }, 
      children
    )
  )
}

export const initialState = {
  fontSize: '',
  fontWeight: '',
}

interface Action {
  type: '1' | '2' | '3' | '4' | '5' | '6'
}

export const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case '1':
      return {
        fontSize: 'text-4xl',
        fontWeight: 'font-bold',
      }
    case '2':
      return {
        fontSize: 'text-3xl',
        fontWeight: 'font-bold',
      }
    case '3':
      return {
        fontSize: 'text-2xl',
        fontWeight: 'font-bold',
      }
    case '4':
      return {
        fontSize: 'text-xl',
        fontWeight: 'font-bold',
      }
    case '5':
      return {
        fontSize: 'text-md',
        fontWeight: 'font-bold',
      }
    case '6':
      return {
        fontSize: 'text-sm',
        fontWeight: 'font-bold',
      }
    default: 
      return state
  }
}
