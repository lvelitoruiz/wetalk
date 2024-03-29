/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-undef */
export const useUserStore = defineStore({
  id: 'auth',
  state: () => ({
    userToken: null as any | null,
    userdata: null as any | null,
    accesUser: null as any | null,
  }),
  persist: {
    storage: persistedState.localStorage,
  },
  getters: {
    getUserToken: (state) => state.userToken,
    getUserData: (state) => state.userdata,
    getAccesUser: (state) => state.accesUser,
  },
  actions: {
    async fetchUserData(accesUser: boolean, token: string, userdata: Object) {
      this.accesUser = accesUser;
      this.userToken = token;
      this.userdata = userdata;
    },
  },
});
