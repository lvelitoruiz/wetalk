import { useUserStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware(async (to, from) => {
    
  // if(process.server) return;
  // console.log(process.server, 'process server')
  const { $msal } = useNuxtApp();
  console.log($msal, 'msal');
  const accounts = $msal().getAccounts();
  const userStore = useUserStore();
  const accessToken = await $msal().acquireTokenSilent();
  let isAuthenticated = $msal().isAuthenticated() && accessToken;
    console.log(isAuthenticated, 'isAutheticated line 12')
    if (isAuthenticated) {
        const user = {
          ...accounts[0],
          bearerToken: accessToken,
        };
    
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("tokenH", JSON.stringify(accessToken))
    
       userStore.fetchUserData(JSON.stringify(accessToken));
      
        // userStore.$patch((state) => {
        //   state.user = user;
        // });
    }
    console.log(to.name, isAuthenticated, 'line 26')
    // if (to.name !== "login" && !isAuthenticated) {
    //     return navigateTo("/login");
    //   } else if (to.path !== '/' && isAuthenticated) {
    //     return navigateTo("/");
    //   } else {
    //     return;
    //   }
        
    // if (!auth.value.isAuthenticated) {
    //   return navigateTo('/login')
    // }
  })
  
