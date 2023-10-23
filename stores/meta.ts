import axios from "axios";

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
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZFVQQyI6IlUyMDEwMTAwMTMiLCJOb21icmUiOiJNQVggQUxPTlpPIE1BUlRJTiIsIkFwZWxsaWRvIjoiUk9EUklHVUVaIEZFUk5BTkRFWiIsIkVtYWlsIjoidTIwMTAxMDAxM0B1cGMuZWR1LnBlIiwiSG9yYVNlc2lvbiI6IjMvMTUvMjAyMyAxMDoyNzozNCBQTSIsIldlYnNpdGUiOiIiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3ByaW1hcnlzaWQiOiJVMjAxMDEwMDEzIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoidTIwMTAxMDAxM0B1cGMuZWR1LnBlIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZ2l2ZW5uYW1lIjoiTUFYIEFMT05aTyBNQVJUSU4iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zdXJuYW1lIjoiUk9EUklHVUVaIEZFUk5BTkRFWiIsIm5iZiI6MTY3ODkxOTI1NCwiZXhwIjoxODUxNzE5MjU0LCJpc3MiOiJVUEMgU1NPIiwiYXVkIjoiVVBDIFNTTyJ9.onmQZ_9rIP2v8HoX9lfECX0c2H1IfTSeI9lysGb6aGs",
          },
        };

        const response = await axios
          .create(axiosConf)
          .get<any>(`/Perfil/v1/meta/obtener?institucion=upc&id=${id}`);

        console.log("metadata working", response.data.data);

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
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZFVQQyI6IlUyMDEwMTAwMTMiLCJOb21icmUiOiJNQVggQUxPTlpPIE1BUlRJTiIsIkFwZWxsaWRvIjoiUk9EUklHVUVaIEZFUk5BTkRFWiIsIkVtYWlsIjoidTIwMTAxMDAxM0B1cGMuZWR1LnBlIiwiSG9yYVNlc2lvbiI6IjMvMTUvMjAyMyAxMDoyNzozNCBQTSIsIldlYnNpdGUiOiIiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3ByaW1hcnlzaWQiOiJVMjAxMDEwMDEzIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoidTIwMTAxMDAxM0B1cGMuZWR1LnBlIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZ2l2ZW5uYW1lIjoiTUFYIEFMT05aTyBNQVJUSU4iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zdXJuYW1lIjoiUk9EUklHVUVaIEZFUk5BTkRFWiIsIm5iZiI6MTY3ODkxOTI1NCwiZXhwIjoxODUxNzE5MjU0LCJpc3MiOiJVUEMgU1NPIiwiYXVkIjoiVVBDIFNTTyJ9.onmQZ_9rIP2v8HoX9lfECX0c2H1IfTSeI9lysGb6aGs",
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
        };

        const response = await axios
          .create(axiosConf)
          .get(`v1/meta/listar/imagenes?institucion=upc`);

        this.imagesData = response.data;
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
