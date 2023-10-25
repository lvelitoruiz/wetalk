const config = useRuntimeConfig();
const { $msal } = await useNuxtApp();
const accessToken = await $msal()?.acquireTokenSilent();
export const apiUrl = config.public.apiUrl+"/api/";
export const apiUrlAlter = config.public.apiUrlAlter;
export const apiKey = config.public.apiKey;
export const authHeader = accessToken;
