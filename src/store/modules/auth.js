import Vue from 'vue'
// import Router from '@/router'
// import RouterDate from '@/rou2ter/route.json'

const state = {
  navList: [],
  auths: {},
}

const mutations = {
  setNavList: (state, data) => {
    state.navList = data
  },
  setAuths: (state, data) => {
    state.auths = data
  }
}

const actions = {
  // 登录
  login ({ commit }, userForm) {
    return new Promise((resolve) => {
      // 登录
      Vue.prototype.postServer("/api/login?" + Vue.prototype.getParams(userForm),{}, function (result) {
        if (result && result.status === "success") {
            // 获取用户信息
            Vue.prototype.getServer('/api/admin/user/' + userForm.username, {}, function (result) {
                //保存用户信息
                commit('user/setUserInfo', result, { root: true })
                //权限
                // Vue.prototype.get('/rbac/api/v1/permission/common/' + roleCode, {}, (auths) => {
                //   if (auths.data.length > 0) {
                //     let authsMap = {}
                //     auths.data.forEach(item => {
                //       authsMap[item.subModelCode + '-' + item.element] = item.value
                //     })
                //     commit('setAuths', authsMap)
                //   }
                  resolve('success')
                // }, () => {
                //   resolve('获取权限失败')
                // })
            }, function (errResult) {
                if (errResult.response.data.error) {
                    resolve(errResult.response.data.error)
                } else {
                    resolve('获取用户信息失败')
                }
            })
        } else {
            resolve(result.msg)
        }
      })
    })
  },

  // 登出
  logout ({commit}) {
    return new Promise((resolve) => {
      // commit('setNavList', [])
      commit('user/setUserInfo', '', { root: true })
      // commit('tagNav/removeTagNav', '', { root: true })
      resolve()
    })
  },


  // 获取该用户的菜单列表
  getNavList ({commit, state}, companyId) {
    return navListForNotGroup()
    // 非集团菜单
    function navListForNotGroup () {
      return new Promise((resolve) => {
        var ret = [] // 判断是否重复的数组
        var menu = [] // 生效的数组
        // let copyRouterDate = JSON.parse(JSON.stringify(RouterDate))
        // copyRouterDate[0].path = state.homePath
        // for (var i = 0; i < copyRouterDate.length; i++) {
        //   if (ret.indexOf(copyRouterDate[i].name) === -1) {
        //     ret.push(copyRouterDate[i].name)
        //     menu.push(copyRouterDate[i])
        //   }
        // }
        // let routeMap = {}
        // let routers = Router.options.routes[1].children
        // for (let index = 0; index < routers.length; index++) {
        //   const element = routers[index]
        //   if (element.auth) {
        //     routeMap['/main/' + element.path] = element.auth
        //   }
        // }
        // function getNavListByAuth (list) {
        //   for (let index = 0; index < list.length; index++) {
        //     const element = list[index]
        //     if (routeMap[element.path] && !Vue.prototype.ifHasAuth(routeMap[element.path])) {
        //       list.splice(index, 1)
        //       index--
        //     }
        //     if (element.subList.length > 0) {
        //       getNavListByAuth(element.subList)
        //     }
        //     if (!element.path && element.subList.length === 0) {
        //       list.splice(index, 1)
        //       index--
        //     }
        //   }
        //   return list
        // }
        // menu = getNavListByAuth(menu)
        // commit('setNavList', menu)
        resolve(menu)
      })
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
