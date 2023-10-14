import axios from "axios";

export const useMenuStore = defineStore({
  id: "menu",
  state: () => ({
    menuData: [] as MenuItem[],
    accesoDirectoData: [] as AccesoDirectoItem[],
  }),
  getters: {
    getMenuItems: (state) => state.menuData,
    getAccesoItems: (state) => state.accesoDirectoData,
  },
  actions: {
    async fetchMenuData(apiUrl: string, apiKey: string) {
      try {
        const axiosConf = {
          baseURL: apiUrl,
          common: {
            Accept: "application/json, text/plain, */*",
          },
        };

        const response = await axios
          .create(axiosConf)
          .get<MenuItem[]>("v1/menu?institucion=upc");
        this.menuData = response.data;
      } catch (error) {
        console.error("Error fetching menu data:", error);
      }

      //   var requestOptions = {
      //     method: "GET",
      //     redirect: "follow" as RequestRedirect,
      //   };

      //   console.log(requestOptions);

      //   fetch(`${apiUrl}v1/menu?institucion=upc`, requestOptions)
      //     .then((response) => response.text())
      //     .then((result) => console.log(result))
      //     .catch((error) => console.log("error", error));
    },

    async fetchAccesoDirectoData(apiUrl: string, apiKey: string) {
      try {
        const axiosConf = {
          baseURL: apiUrl,
          common: {
            Accept: "application/json, text/plain, */*",
          },
        };

        const response = await axios
          .create(axiosConf)
          .get<AccesoDirectoItem[]>("v1/acceso-directo?institucion=upc");

        // Store the fetched data in a separate state variable
        this.accesoDirectoData = response.data;
      } catch (error) {
        console.error("Error fetching acceso directo data:", error);
      }
    },
  },
});


interface MenuItem {
  id: number;
  etiqueta: string;
  nombre: string;
  url: string | null;
  submenu: [];
}

interface AccesoDirectoItem {
    id: number;
    etiqueta: string;
    nombre: string;
    url: string | null;
    url_secundario: string | null;
  }
