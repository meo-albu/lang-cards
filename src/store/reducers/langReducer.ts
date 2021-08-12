
const defaultState: {
  langs: string[]
  currentLang: 'english' | 'romanian'
} = {
  langs: ['english', 'romanian'],
  currentLang: 'english'
}

interface IAction {
  type: string
  lang: 'english' | 'romanian'
}

export const langReducer = (state = defaultState, action: IAction) => {
  switch (action.type) {
    case 'SET_LANG':
      return {
        ...state,
        currentLang: action.lang
      }
    default:
      return state
  }
}