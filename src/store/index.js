import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
  state:sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state')): {
    username:'',
    employeeId:'',
    managerId:''
  },
  mutations: {
    changeusername(state, username){
      state.username = username
    },
    changeemployeeId(state,employeeId){
      state.employeeId = employeeId
    },
    changemanagerId(state,managerId){
      state.managerId = managerId
    }
  },
  actions: {
  },
  modules: {
  }
})
