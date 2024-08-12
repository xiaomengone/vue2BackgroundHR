import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import { apiGetUser } from '@/api/user'
import { asyncRoutes } from '@/router/index'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/404'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasGetUserInfo = store.state.user.headPort.username // 看看有没有获取用户资料，看有没有对应权限
      // 11开始
      if (!hasGetUserInfo) {
        // 没有用户信息时
        const res = await store.dispatch('user/getUserInfo')
        const { roles } = res
        const filterAsyncRoutes = asyncRoutes.filter((item) => {
          return roles.menus.includes(item.name)
        })
        console.log('筛选后的路由是', filterAsyncRoutes)

        router.addRoutes([...filterAsyncRoutes, { path: '*', redirect: '/404', hidden: true }])
        next(to.path)
        store.commit('user/setRoutes', filterAsyncRoutes)
      } else {
        // 有用户信息时
        next()
      }
    }
  } else {
    // 没有token的情况
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
