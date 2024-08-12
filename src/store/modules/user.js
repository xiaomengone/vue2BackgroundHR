import { getToken, setToken, removeToken } from '@/utils/auth'
import { apiGetUser } from '@/api/user'
import { constantRoutes } from '@/router/index'
// import request from '@/utils/request'

const state = {
  token: getToken(),
  headPort: {},
  routes: [...constantRoutes]
}
const mutations = {
  setRoutes(state, val) {
    state.routes = [...val, ...constantRoutes]
  },
  setToken1(state, val) {
    state.token = val
    setToken(val)
  },
  clearToken(state) {
    state.token = null
    removeToken()
  },
  setHeadPort(state, val) {
    console.log('传过来的值是', val)
    state.headPort = val
  }
}

const actions = {
  async getUserInfo(ctx, val) {
    const res = await apiGetUser()
    ctx.commit('setHeadPort', res.data)
    return res.data
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
