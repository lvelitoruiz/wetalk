// import { defineStore } from "pinia";


export const useUserStore = defineStore({
  id: "auth",
  state: () => ({
    userdata: null as any | null,
  }),
  persist: {
    storage: persistedState.localStorage,
  },
  getters: {
    getUserData: (state) => state.userdata,
  },
  actions: {
    async fetchUserData(token:string) {
      this.userdata = token
    }
  },
});