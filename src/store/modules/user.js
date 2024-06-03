import { getToken, setToken, removeToken, getHeadPortrait, setHeadPortrait } from '@/utils/auth'
// import request from '@/utils/request'

const state = {
  token: getToken(),
  headPort: getHeadPortrait()
}
const mutations = {
  setToken1(state, val) {
    state.token = val
    setToken(val)
  },
  clearToken(state) {
    state.token = null
    removeToken()
  },
  setHeadPort(state, val) {
    state.headPort = val
    setHeadPortrait('val')
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
