import axios from "axios";
import { useUserStore } from "./auth";
const authHeader = localStorage.getItem("tokenH");
const codUser = localStorage.getItem("codUser")


export const useMenuStore = defineStore({
  id: "menu",
  state: () => ({
    menuData: [] as MenuItem[],
    accesoDirectoData: [] as AccesoDirectoItem[],
    ayudaData: [] as AyudaItem[],
    contenidoData: [] as any,
    calendarData: [] as any,
    notificationData: [] as any,
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
  },
  actions: {
    

    async fetchMenuData(apiUrl: string, apiKey: string) {
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
          headers: {
            Authorization:
              authHeader
          },
        };
    
        const response = await axios
          .create(axiosConf)
          .get<any>("/Masservicios/v1/AccesosRapidosPerfil?institucion=upc");

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

    async fetchAyudaData(apiUrl: string, apiKey: string, accesToken: string) {
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
          .get<any>("/Home/v1/Ayuda?institucion=upc");

        this.ayudaData = response.data.data;
      } catch (error) {
        console.error("Error fetching acceso directo data:", error);
        this.ayudaData = [
          {
            id: 1,
            numero: "(01) 604 2400",
            icono:
              "https://wetalk-directus-dev-upc.stage01.link/assets/66bead94-8673-4426-97ef-50b78e76ca77",
          },
          {
            id: 2,
            numero: "962 222 408",
            icono:
              "https://wetalk-directus-dev-upc.stage01.link/assets/861a7a84-9b91-4f65-bc80-aad4cafadb67",
          },
        ];
      }
    },

    async fetchNotificationData(apiUrl: string, apiKey: string) {
      try {
        const axiosConf = {
          baseURL: apiUrl,
          common: {
            Accept: "application/json, text/plain, */*",
          },
          // headers: {
          //   Authorization:
          //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZFVQQyI6IlUyMDEwMTAwMTMiLCJOb21icmUiOiJNQVggQUxPTlpPIE1BUlRJTiIsIkFwZWxsaWRvIjoiUk9EUklHVUVaIEZFUk5BTkRFWiIsIkVtYWlsIjoidTIwMTAxMDAxM0B1cGMuZWR1LnBlIiwiSG9yYVNlc2lvbiI6IjMvMTUvMjAyMyAxMDoyNzozNCBQTSIsIldlYnNpdGUiOiIiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3ByaW1hcnlzaWQiOiJVMjAxMDEwMDEzIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoidTIwMTAxMDAxM0B1cGMuZWR1LnBlIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZ2l2ZW5uYW1lIjoiTUFYIEFMT05aTyBNQVJUSU4iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zdXJuYW1lIjoiUk9EUklHVUVaIEZFUk5BTkRFWiIsIm5iZiI6MTY3ODkxOTI1NCwiZXhwIjoxODUxNzE5MjU0LCJpc3MiOiJVUEMgU1NPIiwiYXVkIjoiVVBDIFNTTyJ9.onmQZ_9rIP2v8HoX9lfECX0c2H1IfTSeI9lysGb6aGs",
          // },
        };

        const response = await axios
          .create(axiosConf)
          .get<any>(`/Home/v1/Notificaciones?codAlumno=${codUser}&poblacion=AC&ciclo=10&institucion=upc`);

        console.log(response.data.data);

        this.notificationData = response.data.data;
      } catch (error) {
        console.error("Error fetching acceso directo data:", error);
      }
    },

    async fetchCalendarData(apiUrl: string, apiKey: string) {
      try {
        const axiosConf = {
          baseURL: apiUrl,
          common: {
            Accept: "application/json, text/plain, */*",
          },
          // headers: {
          //   Authorization:
          //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZFVQQyI6IlUyMDEwMTAwMTMiLCJOb21icmUiOiJNQVggQUxPTlpPIE1BUlRJTiIsIkFwZWxsaWRvIjoiUk9EUklHVUVaIEZFUk5BTkRFWiIsIkVtYWlsIjoidTIwMTAxMDAxM0B1cGMuZWR1LnBlIiwiSG9yYVNlc2lvbiI6IjMvMTUvMjAyMyAxMDoyNzozNCBQTSIsIldlYnNpdGUiOiIiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3ByaW1hcnlzaWQiOiJVMjAxMDEwMDEzIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoidTIwMTAxMDAxM0B1cGMuZWR1LnBlIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZ2l2ZW5uYW1lIjoiTUFYIEFMT05aTyBNQVJUSU4iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zdXJuYW1lIjoiUk9EUklHVUVaIEZFUk5BTkRFWiIsIm5iZiI6MTY3ODkxOTI1NCwiZXhwIjoxODUxNzE5MjU0LCJpc3MiOiJVUEMgU1NPIiwiYXVkIjoiVVBDIFNTTyJ9.onmQZ_9rIP2v8HoX9lfECX0c2H1IfTSeI9lysGb6aGs",
          // },
        };

        const response = await axios
          .create(axiosConf)
          .get<any>("/Horarios/v1/Horario_Alumno?CodLineaNegocio=U&CodModalEst=FC&CodUsuario=U201921568&CodAlumno=201921568&CodPeriodo=202301&FechaSesion2=2023-11-05T23:00:00Z&FechaSesion1=2023-10-30T00:00:00Z&institucion=upc");
        this.calendarData = response.data.ListaDTOHorarioOBJAlumno;
      } catch (error) {
        console.error("Error fetching acceso directo data:", error);
        // this.ayudaData = [
        //   {
        //     id: 1,
        //     numero: "(01) 604 2400",
        //     icono:
        //       "https://wetalk-directus-dev-upc.stage01.link/assets/66bead94-8673-4426-97ef-50b78e76ca77",
        //   },
        //   {
        //     id: 2,
        //     numero: "962 222 408",
        //     icono:
        //       "https://wetalk-directus-dev-upc.stage01.link/assets/861a7a84-9b91-4f65-bc80-aad4cafadb67",
        //   },
        // ];
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
            Authorization:
              authHeader
          },
        };

        const newData = [];

        const response = await axios
          .create(axiosConf)
          .get<any>("/Home/v1/Ciclos?institucion=upc&ciclo_actual="+cycle);
        
        console.log('the response data: ',response.data);

        newData.push(response.data.data.ciclo_actual);
        newData.push(response.data.data.ciclo_siguiente);
        newData.push(response.data.data.ruta_archivo);

        this.contenidoData = newData;
      } catch (error) {
        console.error("Error fetching acceso directo data:", error);
        this.contenidoData = [
          [
            {
              id: 1,
              ciclo: 0,
              unidad: "1",
              texto: "I am …",
              detalles: [
                {
                  id: 1,
                  texto: "Decir de dónde eres ",
                },
                {
                  id: 2,
                  texto: "Pedir y dar información personal ",
                },
                {
                  id: 3,
                  texto: "Registrarte en un hotel ",
                },
                {
                  id: 4,
                  texto: "Conocer a una nueva persona ",
                },
              ],
            },
            {
              id: 2,
              ciclo: 0,
              unidad: "2",
              texto: "Great people",
              detalles: [
                {
                  id: 5,
                  texto: "Hablar sobre tu familia ",
                },
                {
                  id: 6,
                  texto: "Describir amigos y familiares ",
                },
                {
                  id: 7,
                  texto: "Hablar sobre edades y cumpleaños ",
                },
                {
                  id: 8,
                  texto: "Comparar información sobre amigos y familiares ",
                },
              ],
            },
            {
              id: 3,
              ciclo: 0,
              unidad: "3",
              texto: "Come in",
              detalles: [
                {
                  id: 9,
                  texto: "Habla de tu hogar",
                },
                {
                  id: 10,
                  texto: "Hablar de muebles",
                },
                {
                  id: 11,
                  texto: "Ofrecer y aceptar una bebida y un aperitivo",
                },
                {
                  id: 12,
                  texto: "Elegir cosas para un hogar ",
                },
              ],
            },
            {
              id: 4,
              ciclo: 0,
              unidad: "4",
              texto: "I love it!",
              detalles: [
                {
                  id: 13,
                  texto: "Habla de tus cosas favoritas",
                },
                {
                  id: 14,
                  texto: "Decir cómo usas la tecnología",
                },
                {
                  id: 15,
                  texto: "Hablar sobre cómo te comunicas",
                },
                {
                  id: 16,
                  texto: "Hablar sobre tu música favorita ",
                },
              ],
            },
            {
              id: 5,
              ciclo: 0,
              unidad: "5",
              texto: "Mondays and fun days ",
              detalles: [
                {
                  id: 17,
                  texto:
                    "Hablar sobre el día de la semana y actividades del fin de semana dar la hora y hablar sobre tus rutinas",
                },
                {
                  id: 18,
                  texto:
                    "Demostrar que estás de acuerdo y tienes cosas en común ",
                },
                {
                  id: 19,
                  texto: "Comparar diferentes semanas de trabajo ",
                },
              ],
            },
            {
              id: 6,
              ciclo: 0,
              unidad: "6",
              texto: "Zoom in, zoom out ",
              detalles: [
                {
                  id: 20,
                  texto: "Hablar de lugares en la ciudad ",
                },
                {
                  id: 21,
                  texto: "Hablar sobre la naturaleza en tu área ",
                },
                {
                  id: 22,
                  texto: "Pedir y dar instrucciones ",
                },
                {
                  id: 23,
                  texto: "Planificar un nuevo vecindario para una ciudad ",
                },
              ],
            },
          ],
          [
            {
              id: 7,
              ciclo: 1,
              unidad: "7",
              texto: "Now is good ",
              detalles: [
                {
                  id: 24,
                  texto: "Hablar sobre actividades alrededor de la casa ",
                },
                {
                  id: 25,
                  texto: "Hacer y responder preguntas acerca de los viajes",
                },
                {
                  id: 26,
                  texto: "Compartir noticias por teléfono",
                },
                {
                  id: 27,
                  texto: "Preguntar qué está haciendo la gente estos días",
                },
              ],
            },
            {
              id: 8,
              ciclo: 1,
              unidad: "8",
              texto: "You’re good!",
              detalles: [
                {
                  id: 28,
                  texto: "Hablar sobre tus habilidades y destrezas ",
                },
                {
                  id: 29,
                  texto:
                    "Decir lo que puedes y no puedes hacer en el trabajo o en la escuela",
                },
                {
                  id: 30,
                  texto:
                    "Decir por qué eres la persona adecuada para un trabajo",
                },
                {
                  id: 31,
                  texto:
                    "Hablar acerca de en qué son buenas las personas en tu país",
                },
              ],
            },
            {
              id: 9,
              ciclo: 1,
              unidad: "9",
              texto: "Places to go",
              detalles: [
                {
                  id: 32,
                  texto: "Hablar sobre viajes y vacaciones ",
                },
                {
                  id: 33,
                  texto: "Hacer planes de viaje",
                },
                {
                  id: 34,
                  texto: "Pedir información en una tienda",
                },
                {
                  id: 35,
                  texto: "Planificar unas vacaciones para alguien",
                },
              ],
            },
            {
              id: 10,
              ciclo: 1,
              unidad: "10",
              texto: "Get ready",
              detalles: [
                {
                  id: 36,
                  texto: "Hacer planes al aire libre para el fin de semana",
                },
                {
                  id: 37,
                  texto: "Discutir qué ropa usar para diferentes viajes ",
                },
                {
                  id: 38,
                  texto: "Sugerir planes para actividades nocturnas ",
                },
                {
                  id: 39,
                  texto:
                    "Planificar y presentar un fin de semana divertido en tu ciudad",
                },
              ],
            },
            {
              id: 11,
              ciclo: 1,
              unidad: "11",
              texto: "Colorful memories",
              detalles: [
                {
                  id: 40,
                  texto: "Describir personas, lugares y cosas en el pasado",
                },
                {
                  id: 41,
                  texto: "Hablar sobre colores y recuerdos",
                },
                {
                  id: 42,
                  texto: "Hablar de películas y actores",
                },
                {
                  id: 43,
                  texto: "Hablar sobre programas de televisión de tu niñez ",
                },
              ],
            },
            {
              id: 12,
              ciclo: 1,
              unidad: "12",
              texto: "Stop, eat, go",
              detalles: [
                {
                  id: 44,
                  texto: "Hablar sobre bocadillos y comidas pequeñas ",
                },
                {
                  id: 45,
                  texto: "Hablar sobre comidas en restaurantes ",
                },
                {
                  id: 46,
                  texto: "Ofrecer y aceptar comida y bebida",
                },
                {
                  id: 47,
                  texto: "Crear un menú para un restaurante",
                },
              ],
            },
          ],
          [
              "https://wetalk-directus-dev-upc.stage01.link/assets/84168706-55eb-4541-b360-6f9a71447b30"
          ]
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
