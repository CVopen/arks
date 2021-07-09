import {createStore} from 'vuex'
import app from './module/app'
import user from './module/user'

export default createStore({
    modules: {
      app,
      user
    }
})