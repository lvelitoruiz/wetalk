import { AxiosInstance } from 'axios'

export default function ({ $config }: { $config: { apiUrl: string } }) {
  return {
    baseURL: $config.apiUrl, // Use $config.apiUrl
    credentials: true, // Set to true if your API requires credentials (e.g., cookies, authentication headers)
    common: {
      Accept: 'application/json, text/plain, */*', // Default headers for all requests
    },
  }
}
