import { getToken, setToken, removeToken } from '@/utils/auth'
import { apiGetUser } from '@/api/user'
import { constantRoutes } from '@/router/index'
// import request from '@/utils/request'
import approval from '@/router/modules/approval'

const state = {
  token: getToken(),
  headPort: {},
  routes: [...constantRoutes]
}
const mutations = {
  setRoutes(state, val) {
    state.routes = [...constantRoutes, ...val, approval]
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
    state.headPort = val
  }
}

const actions = {
  async getUserInfo(ctx, val) {
    const res = await apiGetUser()
    console.log('用户信息', res)

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
