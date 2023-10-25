import axios from "axios";


const authHeader = localStorage.getItem("tokenH");

export const useMetaStore = defineStore({
  id: "meta",
  state: () => ({
    metaData: null as any | null,
    imagesData: null as ImageItem[] | null,
  }),
  persist: {
    storage: persistedState.localStorage,
  },
  getters: {
    getMetaData: (state) => state.metaData,
    getImages: (state) => state.imagesData,
  },
  actions: {
    async fetchMetaData(apiUrl: string, apiKey: string, id: string) {
      try {
        const axiosConf = {
          baseURL: apiUrl,
          common: {
            Accept: "application/json, text/plain, */*",
          },
          headers: {
            Authorization:
            authHeader
          },
        };

        const response = await axios
          .create(axiosConf)
          .get<any>(`/Perfil/v1/meta/obtener?institucion=upc&id=${id}`);

        this.metaData = response.data.data;
      } catch (error) {
        console.error("Error fetching meta data:", error);
      }

      return this.metaData;
    },

    async registerMetaData(apiUrl: string, apiKey: string, metaInfo: MetaItem) {
      try {
        const axiosConf = {
          baseURL: apiUrl,
          common: {
            Accept: "application/json, text/plain, */*",
          },
          headers: {
            Authorization:
              authHeader
          },
        };

        const response = await axios
          .create(axiosConf)
          .post(`/Perfil/v1/meta/registrar?institucion=upc`, metaInfo);

        // Store the registered meta data in the state
        this.metaData = response.data;
      } catch (error) {
        console.error("Error registering meta data:", error);
      }
    },

    async obtainImages(apiUrl: string) {
      try {
        const axiosConf = {
          baseURL: apiUrl,
          common: {
            Accept: "application/json, text/plain, */*",
          },
          headers: {
            Authorization:
              authHeader
          },
        };

        const response = await axios
          .create(axiosConf)
          .get(`/Perfil/v1/meta/listar/imagenes?institucion=upc`);

        this.imagesData = response.data.data;
      } catch (error) {
        console.error("Error getting images:", error);
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

interface ImageItem {
  imagen: string;
  categoria: string;
}
