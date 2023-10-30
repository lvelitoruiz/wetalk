import { useUserStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware(async (to, from) => {
    
  const { $msal } = useNuxtApp();
  const accounts = $msal().getAccounts();
  const userStore = useUserStore();
  const accessToken = await $msal().acquireTokenSilent();
  let isAuthenticated = $msal().isAuthenticated() && accessToken;
    if (isAuthenticated) {
        const user = {
          ...accounts[0],
          bearerToken: accessToken,
        };
    
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("tokenH", JSON.stringify(accessToken))
    
       userStore.fetchUserData(JSON.stringify(accessToken));
      
    }

    if (to.name !== "login" && !isAuthenticated) {
      return navigateTo("/login", { replace: true });
    } else if (to.name === "login" && isAuthenticated) {
      return navigateTo("/", { replace: true });
    } else {
      return;
    }
        
    // if (!auth.value.isAuthenticated) {
    //   return navigateTo('/login')
    // }
  })
  
