import { combineReducers } from 'redux'

import auth from './auth_reducer'
import user from './user_reducer'
import general from './general_reducer'

const rootReducer = combineReducers({
  general,
  auth,
  user
})

export default rootReducer
