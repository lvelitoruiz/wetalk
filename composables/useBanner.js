import getAuthHeaders from "~~/utils/authHeaders";
const useScheduleData = () => {
    const config = useRuntimeConfig();

    const getBanner = () => {
        const response = useLazyFetch(
            `${config.public.baseURL}Home/v1/Banner?destacado=true`, {
                headers:getAuthHeaders(),
            }
        );
        return response;
    }
    

    return {
        getBanner
    }
}


export default useScheduleData;