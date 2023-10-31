const getAuthHeaders  = () => {
    const config = useRuntimeConfig();
    const token = sessionStorage.getItem('token');
  
    const headers = {'Authorization': token , 'Api-Lambda-Key': config.public.apiKey}
    return headers
}


export default getAuthHeaders;