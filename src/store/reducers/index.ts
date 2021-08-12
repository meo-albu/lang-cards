import {combineReducers} from 'redux'
import {langReducer} from './langReducer'

const rootReducer = combineReducers({
  langReducer
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer