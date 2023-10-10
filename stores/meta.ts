import axios from "axios";

export const useMetaStore = defineStore({
  id: "meta",
  state: () => ({
    metaData: null as MetaItem | null, // Define the state for meta data
  }),
  getters: {
    getMetaData: (state) => state.metaData,
  },
  actions: {
    async fetchMetaData(apiUrl: string, apiKey: string, id: string) {
      try {
        const axiosConf = {
          baseURL: apiUrl,
          common: {
            Accept: "application/json, text/plain, */*",
          },
        };

        const response = await axios
          .create(axiosConf)
          .get<MetaItem>(`v1/meta/obtener?id=${id}&institucion=upc`);

        
        this.metaData = response.data;
      } catch (error) {
        console.error("Error fetching meta data:", error);
      }
    },

    async registerMetaData(apiUrl: string, apiKey: string, metaInfo: MetaItem) {
      try {
        const axiosConf = {
          baseURL: apiUrl,
          common: {
            Accept: "application/json, text/plain, */*",
          },
        };

        const response = await axios
          .create(axiosConf)
          .post(`v1/meta/registrar?institucion=upc`, metaInfo);

        // Store the registered meta data in the state
        this.metaData = response.data;
      } catch (error) {
        console.error("Error registering meta data:", error);
      }
    },
  },
});

interface MetaItem {
  id: string;
  imagen: string;
  meta: string;
  color: string;
}
