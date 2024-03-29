/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable no-undef */
import { useUserStore } from '~/stores/auth';

const { $msal } = useNuxtApp();

export default defineNuxtRouteMiddleware(async (to, form) => {
  const userStore = useUserStore();
  // const token = await $msal()?.acquireTokenSilent();
  const expToken = $msal()?.getAccounts()[0]?.idTokenClaims?.exp;

  if (expToken) {
    const jwtExpired = expToken ? Date.now() >= (expToken ?? 0) * 1000 : false;
    if (jwtExpired) {
      if ($msal().isAuthenticated()) {
        await $msal().signOut($msal().getAccounts()[0]?.homeAccountId);
      }
    }
  }

  if (to.name !== 'login' && !userStore.getAccesUser) {
    return await navigateTo('/login', { replace: true });
  } else if (to.name === 'login' && userStore.getAccesUser) {
    return await navigateTo('/', { replace: true });
  } else {
    return null;
  }
});
