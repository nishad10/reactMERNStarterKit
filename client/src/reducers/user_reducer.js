let INITIAL_STATE = {
  updateProfileFailMsg: '',
  profile: {}
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case `GET_USER`:
      return { ...state, profile: action.payload.data }
    default:
      return state
  }
}
