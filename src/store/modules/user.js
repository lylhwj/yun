 
const state = {
  userInfo: {},
  unreadMessagesCount: 0 ,
  userAvatar:'',
  isShowUserPop:false
}

// getters
const getters = {
  userInfo: state => state.currentUser,
  unreadMessagesCount: state => state.unreadMessagesCount,
  isShowUserPop: state => state.isShowUserPop,
}

// actions
const actions = {
  
}

// mutations
const mutations = {
  changeUserInfo(state, info) { 
    state = Object.assign(state, info)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
