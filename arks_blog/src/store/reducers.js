import states from './states'

export const reducersUser = (state = states, action) => {
  switch (action.type) {
    case 'SET_USERINFO' :
      return Object.assign(state, { userInfo: action.value })
    default:
      break;
  }
  return state
}

export const reducers = (state = states, action) => {
  switch (action) {
    default:
      break;
  }
  return state
}