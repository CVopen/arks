import { userState, appState } from './states'

export const reducersUser = (state = userState, action) => {
  switch (action.type) {
    case 'SET_USERINFO' :
      return Object.assign(state, { userInfo: action.value })
    default:
      break;
  }
  return state
}

export const reducers = (state = appState, action) => {
  switch (action.type) {
    case 'add':
      return { num: state.num + action.value}
    default:
      break;
  }
  return state
}