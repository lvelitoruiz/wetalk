import axios from "axios";
const authHeader = localStorage.getItem("tokenH");
const codUser = localStorage.getItem("codUser");
const institution = localStorage.getItem("institucion");

export const useMenuStore = defineStore({
  id: "menu",
  state: () => ({
    menuData: [] as MenuItem[],
    accesoDirectoData: [] as AccesoDirectoItem[],
    ayudaData: [] as AyudaItem[],
    contenidoData: [] as any,
    calendarData: [] as any,
    notificationData: [] as any,
    profileData: [] as any,
    notasData: [] as any,
    faltasData: [] as any,
  }),
  persist: {
    storage: persistedState.localStorage,
  },
  getters: {
    getMenuItems: (state) => state.menuData,
    getAccesoItems: (state) => state.accesoDirectoData,
    getAyudaItems: (state) => state.ayudaData,
    getContenidoItems: (state) => state.contenidoData,
    getCalendarItems: (state) => state.calendarData,
    getNotificationItems: (state) => state.notificationData,
    getProfileItems: (state) => state.profileData,
    getNotasItems: (state) => state.notasData,
    getfaltasItems: (state) => state.faltasData,
  },
  actions: {
    async fetchMenuData(apiUrl: string) {
      try {
        const axiosConf = {
          baseURL: apiUrl,
          common: {
            Accept: "application/json, text/plain, */*",
          },
          headers: {
            Authorization: authHeader,
          },
        };

        const response = await axios
          .create(axiosConf)
          .get<any>(`/Home/v1/Menu?institucion=${institution}`);
        this.menuData = response.data.data;
      } catch (error) {
        console.error("Error fetching menu data:", error);
      }
    },

    async fetchNotasData(apiUrl: string) {
      const curso = localStorage.getItem("curso");
      const periodo = localStorage.getItem("periodo");
      const seccion = localStorage.getItem("seccion");

      try {
        const axiosConf = {
          baseURL: apiUrl,
          common: {
            Accept: "application/json, text/plain, */*",
          },
          headers: {
            Authorization: authHeader,
          },
        };

        const response = await axios
          .create(axiosConf)
          .get<any>(
            `/Cursos/v1/Detalle_Curso?CodAlumno=${codUser}&institucion=${institution}&CodCurso=${curso}&Seccion=${seccion}&CodPeriodo=${periodo}`
          );
        this.notasData = response.data.data;
      } catch (error) {
        console.error("Error fetching menu data:", error);
      }
    },

    async fetchFaltasData(apiUrl: string) {
      const curso = localStorage.getItem("curso");
      const periodo = localStorage.getItem("periodo");
      const seccion = localStorage.getItem("seccion");
      try {
        const axiosConf = {
          baseURL: apiUrl,
          common: {
            Accept: "application/json, text/plain, */*",
          },
          headers: {
            Authorization: authHeader,
          },
        };

        const response = await axios
          .create(axiosConf)
          .get<any>(
            `/Cursos/v1/Inasistencias_Alumno?CodAlumno=${codUser}&CodCurso=${curso}&CodPeriodo=${periodo}&institucion=upn&CodSeccion=${seccion}`
          );
        this.faltasData = response.data.data;
      } catch (error) {
        console.error("Error fetching menu data:", error);
      }
    },

    async fetchAccesoDirectoData(apiUrl: string) {
      try {
        const axiosConf = {
          baseURL: apiUrl,
          common: {
            Accept: "application/json, text/plain, */*",
          },
          headers: {
            Authorization: authHeader,
          },
        };

        const response = await axios
          .create(axiosConf)
          .get<any>(
            `/Masservicios/v1/AccesosRapidosPerfil?institucion=${institution}`
          );

        this.accesoDirectoData = response.data.data;
      } catch (error) {
        console.error("Error fetching acceso directo data:", error);
      }
    },

    async fetchAyudaData(apiUrl: string) {
      try {
        const axiosConf = {
          baseURL: apiUrl,
          common: {
            Accept: "application/json, text/plain, */*",
          },
          headers: {
            Authorization: authHeader,
          },
        };

        const response = await axios
          .create(axiosConf)
          .get<any>(`/Home/v1/Ayuda?institucion=${institution}`);

        this.ayudaData = response.data.data;
      } catch (error) {
        console.error("Error fetching acceso directo data:", error);
      }
    },

    async registerNotificationData(apiUrl: string, notificationData: RegisterNotificationData) {
      try {
        const axiosConfig = {
          baseURL: apiUrl,
          common: {
            Accept: "application/json, text/plain, */*"
          },
          headers: {
            Authorization:
            authHeader
          }
        };

        const response = await axios
          .create(axiosConfig)
          .post("/Home/v1/Notificaciones/Register?institucion=upc", notificationData);
          
        return response.data?.registerCount || 0;

      } catch (error) {
        console.error("Error saving notification data", error);
      }
    },

    async fetchNotificationData(apiUrl: string) {
      try {
        const axiosConf = {
          baseURL: apiUrl,
          common: {
            Accept: "application/json, text/plain, */*",
          },
          headers: {
            Authorization: authHeader,
          },
        };

        const response = await axios
          .create(axiosConf)
          .get<any>(
            `/Home/v1/Notificaciones?codAlumno=${codUser}&poblacion=AC&ciclo=10&institucion=${institution}`
          );

        console.log(response.data.data);

        this.notificationData = response.data.data;
      } catch (error) {
        console.error("Error fetching acceso directo data:", error);
      }
    },

    async fetchCalendarData(apiUrl: string) {
      try {
        const axiosConf = {
          baseURL: apiUrl,
          common: {
            Accept: "application/json, text/plain, */*",
          },
          headers: {
            Authorization: authHeader,
          },
        };

        const response = await axios
          .create(axiosConf)
          .get<any>(
            `/Horarios/v1/Horario_Alumno?CodLineaNegocio=U&CodModalEst=FC&CodUsuario=${codUser}&CodAlumno=${codUser}&CodPeriodo=202301&FechaSesion2=2023-11-05T23:00:00Z&FechaSesion1=2023-10-30T00:00:00Z&institucion=${institution}`
          );
        this.calendarData = response.data.ListaDTOHorarioOBJAlumno;
      } catch (error) {
        console.error("Error fetching acceso directo data:", error);
      }
    },

    async fetchContenidoData(apiUrl: string, cycle: string) {
      try {
        const axiosConf = {
          baseURL: apiUrl,
          common: {
            Accept: "application/json, text/plain, */*",
          },
          headers: {
            Authorization: authHeader,
          },
        };

        const newData = [];

        const response = await axios
          .create(axiosConf)
          .get<any>(
            `/Home/v1/Ciclos?institucion=${institution}&ciclo_actual=` + cycle
          );

        console.log("the response data: ", response.data);

        newData.push(response.data.data.ciclo_actual);
        newData.push(response.data.data.ciclo_siguiente);
        newData.push(response.data.data.ruta_archivo);

        this.contenidoData = newData;
      } catch (error) {
        console.error("Error fetching acceso directo data:", error);
      }
    },

    async fetchProfileData(apiUrl: string) {
      try {
        const axiosConf = {
          baseURL: apiUrl,
          common: {
            Accept: "application/json, text/plain, */*",
          },
          headers: {
            Authorization: authHeader,
          },
        };

        const response = await axios
          .create(axiosConf)
          .get<any>(
            `/Accesos/v1/data_alumno?CodAlumno=${
              institution === "upn" ? "n" : "u"
            }${codUser}&institucion=${institution}`
          );
        this.profileData = response.data;
      } catch (error) {
        console.error("Error fetching profile data:", error);
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

interface AyudaItem {
  id: number;
  numero: string;
  icono: string;
}

interface ContenidosItem {
  data: ContenidoItem[];
}

interface ContenidoItem {
  id: number;
  ciclo: number;
  unidad: string;
  texto: string;
  detalles: Detail[];
}

interface Detail {
  id: number;
  texto: string;
}

interface NotificatioDataItem {
  id: string;
  tipo: string
}


interface RegisterNotificationData {
  codAlumno: string;
  notificaciones: NotificatioDataItem[]
}