import {combineReducers} from 'redux'
import {langReducer} from './langReducer'
import {categoriesReducer} from './categoriesReducer'

const rootReducer = combineReducers({
  langReducer,
  categoriesReducer
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer