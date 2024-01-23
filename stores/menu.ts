/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable @typescript-eslint/member-delimiter-style */
/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable no-undef */
import axios from 'axios';

import { useUserStore } from './auth';
// import { defineStore } from "pinia";
// let authHeader = localStorage.getItem("tokenH");
// let codUser = localStorage.getItem("codUser");
// let institution = localStorage.getItem("institucion");
// const config = useRuntimeConfig();
export const useMenuStore = defineStore({
  id: 'menu',
  state: () => ({
    menuData: [] as MenuItem[],
    accesoDirectoData: [] as AccesoDirectoItem[],
    ayudaData: [] as AyudaItem[],
    contenidoData: [] as any,
    calendarData: [] as any,
    notificationData: [] as any,
    profileData: [] as any,
    profesorData: [] as any,
    coursesData: [] as any,
    notasData: [] as any,
    faltasData: [] as any,
    companionsData: [] as any,
    newsData: [] as any,
    newsDataId: [] as any,
    interestedData: [] as any,
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
    getCourses: (state) => state.coursesData,
    getNews: (state) => state.newsData,
    getNewsId: (state) => state.newsDataId,
    getNotasItems: (state) => state.notasData,
    getfaltasItems: (state) => state.faltasData,
    getListStudents: (state) => state.companionsData,
    getProfesorItems: (state) => state.profesorData,
    getInterestedItems: (state) => state.interestedData,
  },
  actions: {
    async fetchData() {
      const userStore = useUserStore();
      const dataU = userStore.getUserData;
      const { $msal } = useNuxtApp();

      const token = $msal ? await $msal()?.acquireTokenSilent() : '';
      const dataUser = {
        localHeader: token,
        localCodUser: dataU.codUser,
        localIntitution: dataU.institucion,
      };

      return dataUser;
    },
    async fetchMenuData(apiUrl: string) {
      try {
        const axiosConf = {
          baseURL: apiUrl,
          common: {
            Accept: 'application/json, text/plain, */*',
          },
          headers: {
            Authorization: (await this.fetchData())?.localHeader,
          },
        };

        const response = await axios
          .create(axiosConf)
          .get<any>(
            `/Home/v1/Menu?institucion=${(await this.fetchData())?.localIntitution}`
          );
        this.menuData = response.data.data;
      } catch (error) {
        console.error('Error fetching menu data:', error);
      }
    },

    async fetchNotasData(apiUrl: string) {
      const curso = localStorage.getItem('curso');
      const periodo = localStorage.getItem('periodo');
      const seccion = localStorage.getItem('seccion');

      if (curso && periodo && seccion) {
        try {
          const axiosConf = {
            baseURL: apiUrl,
            common: {
              Accept: 'application/json, text/plain, */*',
            },
            headers: {
              Authorization: (await this.fetchData())?.localHeader,
            },
          };

          const response = await axios
            .create(axiosConf)
            .get<any>(
              `/Cursos/v1/Detalle_Curso?CodAlumno=${(await this.fetchData())?.localCodUser}&institucion=${(await this.fetchData())?.localIntitution}&CodCurso=${curso}&Seccion=${seccion}&CodPeriodo=${periodo}`
            );
          this.notasData = response.data.data;
        } catch (error) {
          console.error('Error fetching menu data:', error);
        }
      }
    },

    async fetchListCompanions(apiUrl: string) {
      const curso = localStorage.getItem('curso');
      const periodo = localStorage.getItem('periodo');
      const seccion = localStorage.getItem('seccion');

      if (curso && periodo && seccion) {
        try {
          const axiosConf = {
            baseURL: apiUrl,
            common: {
              Accept: 'application/json, text/plain, */*',
            },
            headers: {
              Authorization: (await this.fetchData())?.localHeader,
            },
          };

          const response = await axios
            .create(axiosConf)
            .get<any>(
              `/Cursos/v1/ListaDeAlumnosPorCurso?institucion=${(await this.fetchData())?.localIntitution}&CodPeriodo=${periodo}&CodCurso=${curso}&Seccion=${seccion}`
            );
          this.companionsData = response.data.data;
        } catch (error) {
          if (error instanceof Error) {
            console.error('Error al procesar la solicitud:', error.message);
          } else {
            console.error('Error de tipo desconocido:', error);
          }
        }
      }
    },

    async fetchFaltasData(apiUrl: string) {
      const curso = localStorage.getItem('curso');
      const periodo = localStorage.getItem('periodo');
      const seccion = localStorage.getItem('seccion');

      if (curso && periodo && seccion) {
        try {
          const axiosConf = {
            baseURL: apiUrl,
            common: {
              Accept: 'application/json, text/plain, */*',
            },
            headers: {
              Authorization: (await this.fetchData())?.localHeader,
            },
          };

          const response = await axios
            .create(axiosConf)
            .get<any>(
              `/Cursos/v1/Inasistencias_Alumno?CodAlumno=${(await this.fetchData())?.localCodUser}&CodCurso=${curso}&CodPeriodo=${periodo}&institucion=${(await this.fetchData())?.localIntitution}&CodSeccion=${seccion}`
            );
          this.faltasData = response.data.data;
        } catch (error) {
          console.error('Error fetching menu data:', error);
        }
      }
    },

    async fetchAccesoDirectoData(apiUrl: string) {
      try {
        const axiosConf = {
          baseURL: apiUrl,
          common: {
            Accept: 'application/json, text/plain, */*',
          },
          headers: {
            Authorization: (await this.fetchData())?.localHeader,
          },
        };

        const response = await axios
          .create(axiosConf)
          .get<any>(
            `/Masservicios/v1/AccesosRapidosPerfil?CodAlumno=${(await this.fetchData())?.localCodUser}&institucion=${(await this.fetchData())?.localIntitution}`
          );

        this.accesoDirectoData = response.data.data;
      } catch (error) {
        console.error('Error fetching acceso directo data:', error);
      }
    },

    async fetchAyudaData(apiUrl: string) {
      try {
        const axiosConf = {
          baseURL: apiUrl,
          common: {
            Accept: 'application/json, text/plain, */*',
          },
          headers: {
            Authorization: (await this.fetchData())?.localHeader,
          },
        };

        const response = await axios
          .create(axiosConf)
          .get<any>(
            `/Home/v1/Ayuda?institucion=${(await this.fetchData())?.localIntitution}`
          );

        this.ayudaData = response.data.data;
      } catch (error) {
        console.error('Error fetching acceso directo data:', error);
      }
    },

    async registerNotificationData(
      apiUrl: string,
      notificationData: RegisterNotificationData
    ) {
      try {
        const axiosConfig = {
          baseURL: apiUrl,
          common: {
            Accept: 'application/json, text/plain, */*',
          },
          headers: {
            Authorization: (await this.fetchData())?.localHeader,
          },
        };

        const response = await axios
          .create(axiosConfig)
          .post(
            `/Home/v1/Notificaciones/Register?institucion=${(await this.fetchData())?.localIntitution}`,
            notificationData
          );

        if (response.status >= 200 && response.status < 300) {
          return response.data?.registerCount ?? 0;
        } else {
          console.error(
            'Error en la respuesta de la solicitud:',
            response.status,
            response.data
          );
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error('Error al procesar la solicitud:', error.message);
        } else {
          console.error('Error de tipo desconocido:', error);
        }
      }
    },

    async fetchNotificationData(apiUrl: string) {
      try {
        const axiosConf = {
          baseURL: apiUrl,
          common: {
            Accept: 'application/json, text/plain, */*',
          },
          headers: {
            Authorization: (await this.fetchData())?.localHeader,
          },
        };

        const response = await axios
          .create(axiosConf)
          .get<any>(
            `/Home/v1/Notificaciones?codAlumno=${(await this.fetchData())?.localCodUser}&poblacion=AC&ciclo=10&institucion=${(await this.fetchData())?.localIntitution}`
          );

        this.notificationData = response.data.data;
      } catch (error) {
        console.error('Error fetching acceso directo data:', error);
      }
    },

    async fetchCalendarData(apiUrl: string) {
      try {
        const axiosConf = {
          baseURL: apiUrl,
          common: {
            Accept: 'application/json, text/plain, */*',
          },
          headers: {
            Authorization: (await this.fetchData())?.localHeader,
          },
        };

        const response = await axios
          .create(axiosConf)
          .get<any>(
            `/Horarios/v1/Horario_Alumno?CodLineaNegocio=U&CodModalEst=FC&CodUsuario=${(await this.fetchData())?.localCodUser}&CodAlumno=${(await this.fetchData())?.localCodUser}&CodPeriodo=202301&FechaSesion2=2023-11-05T23:00:00Z&FechaSesion1=2023-10-30T00:00:00Z&institucion=${(await this.fetchData())?.localIntitution}`
          );

        if (response.status >= 200 && response.status < 300) {
          return response.data.ListaDTOHorarioOBJAlumno;
        } else {
          console.error(
            'Error en la respuesta de la solicitud:',
            response.status,
            response.data
          );
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error('Error al procesar la solicitud:', error.message);
        } else {
          console.error('Error de tipo desconocido:', error);
        }
      }
    },

    async fetchContenidoData(apiUrl: string, cycle: string) {
      try {
        const axiosConf = {
          baseURL: apiUrl,
          common: {
            Accept: 'application/json, text/plain, */*',
          },
          headers: {
            Authorization: (await this.fetchData())?.localHeader,
          },
        };

        const newData = [];

        const response = await axios
          .create(axiosConf)
          .get<any>(
            `/Home/v1/Ciclos?institucion=${(await this.fetchData())?.localIntitution}&ciclo_actual=` +
              cycle
          );

        newData.push(response.data.data.ciclo_actual);
        newData.push(response.data.data.ciclo_siguiente);
        newData.push(response.data.data.ruta_archivo);

        this.contenidoData = newData;
      } catch (error) {
        console.error('Error fetching acceso directo data:', error);
      }
    },

    async fetchProfileData(apiUrl: string) {
      try {
        const axiosConf = {
          baseURL: apiUrl,
          common: {
            Accept: 'application/json, text/plain, */*',
          },
          headers: {
            Authorization: (await this.fetchData())?.localHeader,
          },
        };

        const response = await axios
          .create(axiosConf)
          .get<any>(
            `/Accesos/v1/data_alumno?CodAlumno=${(await this.fetchData())?.localCodUser}&institucion=${(await this.fetchData())?.localIntitution}`
          );
        this.profileData = response.data;
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    },

    async fetchProfesorData(apiUrl: string) {
      const periodo = localStorage.getItem('periodo');
      const seccion = localStorage.getItem('seccion');
      try {
        const axiosConf = {
          baseURL: apiUrl,
          common: {
            Accept: 'application/json, text/plain, */*',
          },
          headers: {
            Authorization: (await this.fetchData())?.localHeader,
          },
        };

        const response = await axios
          .create(axiosConf)
          .get<any>(
            `/Cursos/v1/ProfesorCursoSeccion?institucion=${(await this.fetchData())?.localIntitution}&Seccion=${seccion}&CodPeriodo=${periodo}`
          );
        this.profesorData = response.data?.data ?? [];
      } catch (error) {
        console.error('Error fetching profesor data:', error);
      }
    },

    async fetchCoursesData(apiUrl: string) {
      try {
        const axiosConf = {
          baseURL: apiUrl,
          common: {
            Accept: 'application/json, text/plain, */*',
          },
          headers: {
            Authorization: (await this.fetchData())?.localHeader,
          },
        };

        const response = await axios
          .create(axiosConf)
          .get<any>(
            `/Cursos/v1/Todos?institucion=${(await this.fetchData())?.localIntitution}`
          );
        this.coursesData = response.data?.data ?? [];
      } catch (error) {
        console.error('Error fetching courses data:', error);
      }
    },

    async fetchNewsData(apiUrl: string) {
      try {
        const axiosConf = {
          baseURL: apiUrl,
          common: {
            Accept: 'application/json, text/plain, */*',
          },
          headers: {
            Authorization: (await this.fetchData())?.localHeader,
          },
        };

        const response = await axios
          .create(axiosConf)
          .get<any>('/Informativos/v1/Informativo?institucion=upn');
        this.newsData = response.data?.data ?? [];
      } catch (error) {
        console.error('Error fetching News data:', error);
      }
    },

    async fetchNewsDataId(apiUrl: string, id: number) {
      try {
        const axiosConf = {
          baseURL: apiUrl,
          common: {
            Accept: 'application/json, text/plain, */*',
          },
          headers: {
            Authorization: (await this.fetchData())?.localHeader,
          },
        };

        const response = await axios
          .create(axiosConf)
          .get<any>(`/Informativos/v1/Informativo?institucion=upn&id=${id}`);
        this.newsDataId = response.data?.data ?? [];
      } catch (error) {
        console.error('Error fetching News data:', error);
      }
    },

    async fetchInterestsData(apiUrl: string, landingType: string) {
      try {
        const axiosConf = {
          baseURL: apiUrl,
          common: {
            Accept: 'application/json, text/plain, */*',
          },
          headers: {
            Authorization: (await this.fetchData())?.localHeader,
          },
        };
        const response = await axios
          .create(axiosConf)
          .get<any>(
            `/Masservicios/v1/ContenidoDinamico/Respuesta?institucion=${(await this.fetchData())?.localIntitution}&component_name=${landingType}&course_code=CONEJOS1&student_code=N20123123`
          );
        // `/Masservicios/v1/ContenidoDinamico/Respuesta?institucion=${(await this.fetchData())?.localIntitution}&component_name=${landingType}&course_code=CONEJOS1&student_code=${(await this.fetchData())?.localCodUser}`

        if (response.status >= 200 && response.status < 300) {
          if (response.data) {
            this.interestedData = response.data.data;
          } else {
            return null;
          }
        }
        console.log(`${(await this.fetchData())?.localCodUser}`);
      } catch (error) {
        if (error.response.status === 404) {
          return null;
        }
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
  tipo: string;
}

interface RegisterNotificationData {
  codAlumno: string;
  notificaciones: NotificatioDataItem[];
}
