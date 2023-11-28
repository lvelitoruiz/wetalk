const getAuthHeaders  = () => {
    const authHeader = localStorage.getItem("tokenH");
    const config = useRuntimeConfig();
    const token = sessionStorage.getItem('token');
  
    const headers = {'Authorization': token , 'Api-Lambda-Key': authHeader}
    return headers
}


export default getAuthHeaders;