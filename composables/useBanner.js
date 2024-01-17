/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable no-undef */
import getAuthHeaders from '~~/utils/authHeaders'
const useScheduleData = () => {
  const config = useRuntimeConfig()

  const getBanner = async () => {
    const response = useLazyFetch(
      `${config.public.baseURL}Home/v1/Banner?destacado=true`,
      {
        headers: getAuthHeaders(),
      },
    )
    return await response
  }

  return {
    getBanner,
  }
}

export default useScheduleData
