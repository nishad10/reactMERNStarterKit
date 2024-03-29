import { AUTH_USER, UNAUTH_USER, AUTH_ERROR } from '../constants/types'

export default function(state = { error: false }, action) {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, error: false, authenticated: true }
    case UNAUTH_USER:
      return { ...state, authenticated: false }
    case AUTH_ERROR:
      return { ...state, error: action.payload }
    default:
      return state
  }
}
