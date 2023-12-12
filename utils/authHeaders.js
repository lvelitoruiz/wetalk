const { $msal, $config } = useNuxtApp();

const getAuthHeaders  = () => {
    const authHeader = localStorage.getItem("tokenH");
    const config = useRuntimeConfig();
    const token = sessionStorage.getItem('token');
  
    const headers = {'Authorization': token , 'Api-Lambda-Key': authHeader}
    return headers
}

export async function logout() {
    if($config.public.stage != 'prod') {
        localStorage.clear();
        location.reload();
    } else {
        if($msal().isAuthenticated()){
            await $msal().signOut($msal().getAccounts()[0]?.homeAccountId)
        }
    }
}

export default getAuthHeaders;