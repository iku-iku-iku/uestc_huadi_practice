import { createStore } from 'vuex'
import getters from "./getters";
import mutations from "./mutations";
export default createStore({
  state: {
    provinces: [],
    colleges: [],
    province2Colleges: {},
    college2Id: {},
    college2Province: {},
    college2Type: {},
    stateId: 0,
    college2Info: {},
  },
  getters,
  mutations,
  actions: {
  },
  modules: {
  }
})
