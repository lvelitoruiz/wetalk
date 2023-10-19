import axios from "axios";

export const useMenuStore = defineStore({
  id: "menu",
  state: () => ({
    menuData: [] as MenuItem[],
    accesoDirectoData: [] as AccesoDirectoItem[],
  }),
  persist: true,
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
      const runtimeConfig = useRuntimeConfig();
      try {
        const axiosConf = {
          baseURL: apiUrl,
          common: {
            Accept: "application/json, text/plain, */*",
          },
          headers: {
            'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZFVQQyI6IlUyMDEwMTAwMTMiLCJOb21icmUiOiJNQVggQUxPTlpPIE1BUlRJTiIsIkFwZWxsaWRvIjoiUk9EUklHVUVaIEZFUk5BTkRFWiIsIkVtYWlsIjoidTIwMTAxMDAxM0B1cGMuZWR1LnBlIiwiSG9yYVNlc2lvbiI6IjMvMTUvMjAyMyAxMDoyNzozNCBQTSIsIldlYnNpdGUiOiIiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3ByaW1hcnlzaWQiOiJVMjAxMDEwMDEzIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoidTIwMTAxMDAxM0B1cGMuZWR1LnBlIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZ2l2ZW5uYW1lIjoiTUFYIEFMT05aTyBNQVJUSU4iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zdXJuYW1lIjoiUk9EUklHVUVaIEZFUk5BTkRFWiIsIm5iZiI6MTY3ODkxOTI1NCwiZXhwIjoxODUxNzE5MjU0LCJpc3MiOiJVUEMgU1NPIiwiYXVkIjoiVVBDIFNTTyJ9.onmQZ_9rIP2v8HoX9lfECX0c2H1IfTSeI9lysGb6aGs'
          }
        };

        const response = await axios
          .create(axiosConf)
          .get<any>("/Masservicios/v1/AccesosRapidosPerfil?institucion=upc");

        // Store the fetched data in a separate state variable

        console.log('the response: ',response.data.data);
        this.accesoDirectoData = response.data.data;
      } catch (error) {
        console.error("Error fetching acceso directo data:", error);
        this.accesoDirectoData = [
          {
            id: 1,
            status: "",
            titulo: "Aula virtual (sesiones en línea)",
            imagen: "",
            url: "https://aulavirtual.upc.edu.pe/",
            secuencia: -1,
            abrir_nueva_pagina: false,
            date_created: null,
          },
          {
            id: 2,
            status: "ZXME-6RND-N89T-6J7V",
            titulo: "Plataforma Cambridge",
            imagen: "",
            url: "https://www.cambridgeone.org/home",
            secuencia: -1,
            abrir_nueva_pagina: false,
            date_created: null,
          },
          {
            id: 3,
            status: "",
            titulo: "Matrícula",
            imagen: "",
            url: "https://idiomas.upc.edu.pe/",
            secuencia: -1,
            abrir_nueva_pagina: false,
            date_created: null,
          },
          {
            id: 4,
            status: "",
            titulo: "Evaluación TOEIC",
            imagen: "",
            url: "https://app-electron-latam.sumadi.net/download/app/es/us/global/v2",
            secuencia: -1,
            abrir_nueva_pagina: false,
            date_created: null,
          },
        ];
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
  status: string;
  titulo: string;
  imagen: string;
  secuencia: number;
  url: string | null;
  abrir_nueva_pagina: boolean;
  date_created: any;
}
