import axios from "axios";
import { useUserStore } from "./auth";

// const authHeader = localStorage.getItem("tokenH");
// const codUser = localStorage.getItem("codUser");
// const institution = localStorage.getItem("institucion");

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
    fetchData(){
      const userStore = useUserStore();
      let dataU = userStore.getUserData; 
      const dataUser = {
        localHeader: dataU.bearerToken,
        localCodUser: dataU.codUser,
        localIntitution: dataU.institucion
      }

      return  dataUser;
    },
    async fetchMetaData(apiUrl: string) {
      try {
        const axiosConf = {
          baseURL: apiUrl,
          common: {
            Accept: "application/json, text/plain, */*",
          },
          headers: {
            Authorization:
            this.fetchData()?.localHeader
          },
        };

        const response = await axios
          .create(axiosConf)
          .get<any>(`/Perfil/v1/meta/obtener?institucion=${this.fetchData()?.localIntitution}&id=${this.fetchData()?.localCodUser}`);

        this.metaData = response.data.data;
      } catch (error) {
        console.error("Error fetching meta data:", error);
      }

      return this.metaData;
    },

    async registerMetaData(apiUrl: string, metaInfo: MetaItem) {
      try {
        const axiosConf = {
          baseURL: apiUrl,
          common: {
            Accept: "application/json, text/plain, */*",
          },
          headers: {
            Authorization:
            this.fetchData()?.localHeader
          },
        };

        const response = await axios
          .create(axiosConf)
          .post(`/Perfil/v1/meta/registrar?institucion=${this.fetchData()?.localIntitution}`, metaInfo);

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
            this.fetchData()?.localHeader
          },
        };

        const response = await axios
          .create(axiosConf)
          .get(`/Perfil/v1/meta/listar/imagenes?institucion=${this.fetchData()?.localIntitution}`);

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
