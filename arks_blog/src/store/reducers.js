import states from './states'

const reducers = (state = states, action) => {
  console.log(state)
  switch (action) {
    default:
      break;
  }
  return state
}
export default reducers