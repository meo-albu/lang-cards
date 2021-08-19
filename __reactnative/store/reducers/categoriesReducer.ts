export interface Category {
  slug: string
  name: string
}
const defaultState: {
  categories: Category[]
} = {
  categories: [],
}

interface IAction {
  type: string
  categories: Category[]
}

export const categoriesReducer = (state = defaultState, action: IAction) => {
  switch (action.type) {
    case 'SET_CATEGORIES':
      return {
        ...state,
        categories: action.categories
      }
    default:
      return state
  }
}