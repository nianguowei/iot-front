
const state = {
  username: '',
  nickname: '',
  id: '',
  mobile: '',
  system: '',
  authRolesInfor: {},
  avatar: '' // 头像
}

const mutations = {
  setUserInfo: (state, data) => {
    debugger
    if (data) {
      state.username = data.username // 本人
      state.nickname = data.nickname
      state.id = data.id
      state.mobile = data.mobile
      state.system = data.system
      state.avatar = data.avatarOssKey
      // state.authRolesInfor.roleCode = data.accountDetailVO.roleCode // 是否为店长
      // state.authRolesInfor.organizationCode = data.accountDetailVO.organizationCode // 本部
      // state.authRolesInfor.largeRegionCode = data.accountDetailVO.largeRegionCode // 本大区
      // state.authRolesInfor.regionCode = data.accountDetailVO.regionCode // 本区
      // state.authRolesInfor.storeNo = data.accountDetailVO.storeNo // 本店
      // state.authRolesInfor.storeGroupId = data.accountDetailVO.storeGroupId // 本组
      // state.authRolesInfor.username = data.accountDetailVO.username // 本人
    } else {
      state.username = ''
      state.nickname = ''
      state.id = ''
      state.mobile = ''
      state.system = ''
      // state.authRolesInfor = {}
      state.avatar = ''
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
