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
    newsDataMeta: [] as any,
    newsDataId: [] as any,
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
    getNewsMeta: (state) => state.newsDataMeta,
    getNewsId: (state) => state.newsDataId,
    getNotasItems: (state) => state.notasData,
    getfaltasItems: (state) => state.faltasData,
    getListStudents: (state) => state.companionsData,
    getProfesorItems: (state) => state.profesorData,
  },
  actions: {
    async fetchData () {
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
    async fetchMenuData (apiUrl: string) {
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
            `/Home/v1/Menu?institucion=${(await this.fetchData())?.localIntitution}`,
          );
        this.menuData = response.data.data;
      } catch (error) {
        console.error('Error fetching menu data:', error);
      }
    },

    async fetchNotasData (apiUrl: string) {
      const curso = localStorage.getItem('curso');
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
            `/Cursos/v1/Detalle_Curso?CodAlumno=${(await this.fetchData())?.localCodUser}&institucion=${(await this.fetchData())?.localIntitution}&CodCurso=${curso}&Seccion=${seccion}&CodPeriodo=${periodo}`,
          );
        this.notasData = response.data.data;
      } catch (error) {
        console.error('Error fetching menu data:', error);
      }
    },

    async fetchListCompanions (apiUrl: string) {
      const curso = localStorage.getItem('curso');
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
            `/Cursos/v1/ListaDeAlumnosPorCurso?institucion=${(await this.fetchData())?.localIntitution}&CodPeriodo=${periodo}&CodCurso=${curso}&Seccion=${seccion}`,
          );
        console.log(this.companionsData);
        this.companionsData = response.data.data;
      } catch (error) {
        console.error('Error fetching menu data:', error);
      }
    },

    async fetchFaltasData (apiUrl: string) {
      const curso = localStorage.getItem('curso');
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
            `/Cursos/v1/Inasistencias_Alumno?CodAlumno=${(await this.fetchData())?.localCodUser}&CodCurso=${curso}&CodPeriodo=${periodo}&institucion=${(await this.fetchData())?.localIntitution}&CodSeccion=${seccion}`,
          );
        this.faltasData = response.data.data;
      } catch (error) {
        console.error('Error fetching menu data:', error);
      }
    },

    async fetchAccesoDirectoData (apiUrl: string) {
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
            `/Masservicios/v1/AccesosRapidosPerfil?CodAlumno=${(await this.fetchData())?.localCodUser}&institucion=${(await this.fetchData())?.localIntitution}`,
          );

        this.accesoDirectoData = response.data.data;
      } catch (error) {
        console.error('Error fetching acceso directo data:', error);
      }
    },

    async fetchAyudaData (apiUrl: string) {
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
            `/Home/v1/Ayuda?institucion=${(await this.fetchData())?.localIntitution}`,
          );

        this.ayudaData = response.data.data;
      } catch (error) {
        console.error('Error fetching acceso directo data:', error);
      }
    },

    async registerNotificationData (
      apiUrl: string,
      notificationData: RegisterNotificationData,
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
            notificationData,
          );

        return response.data?.registerCount ?? 0;
      } catch (error) {
        console.error('Error saving notification data', error);
      }
    },

    async fetchNotificationData (apiUrl: string) {
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
            `/Home/v1/Notificaciones?codAlumno=${(await this.fetchData())?.localCodUser}&poblacion=AC&ciclo=10&institucion=${(await this.fetchData())?.localIntitution}`,
          );

        console.log(response.data.data);

        this.notificationData = response.data.data;
      } catch (error) {
        console.error('Error fetching acceso directo data:', error);
      }
    },

    async fetchCalendarData (apiUrl: string) {
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

        // const response = await axios
        //   .create(axiosConf)
        //   .get<any>(
        //     `/Horarios/v1/Horario_Alumno?institucion=${(await this.fetchData())?.localIntitution}&CodigoNivel=2247031001`,
        //   );
        // this.calendarData = response.data.ListaDTOHorarioOBJAlumno;
        this.calendarData = {
          "message": "Se encontraron horarios",
          "flag": true,
          "error": null,
          "data": [
              {
                  "horario": {
                      "fechaInicio": null,
                      "fechaFin": null,
                      "diaNombre": "LUNES",
                      "diaNumero": "0",
                      "codPeriodo": null
                  },
                  "detalleHorario": [
                      {
                          "titulo": null,
                          "nrc": null,
                          "descripMetodoEducativo": "Presencial",
                          "codmetodoEducativo": null,
                          "descripMateria": "DIAGNÓST.E INFORME PSICOLÓGICO",
                          "codMateria": "PSGE1303A",
                          "codSeccion": "2224344248",
                          "descripPartePeriodo": null,
                          "codPartePeriodo": "",
                          "cantidadVeces": "1",
                          "codAula": "A507",
                          "descripAula": "Edificio A",
                          "codCampus": "LE0",
                          "descripCampus": "Lima San Juan de Lurigancho",
                          "codEdificio": null,
                          "descripEdificio": null,
                          "fechaInicio": "2023-11-15",
                          "fechaFin": "2023-12-28",
                          "diaNombre": "LUNES",
                          "diaNumero": "0",
                          "horaInicio": "12:30:00",
                          "horaFin": "14:00:00",
                          "profesor": [
                              {
                                  "nombres": "",
                                  "apellidos": "",
                                  "nombreCompleto": "GIULIANA MARGARITA OBREGON LOPEZ",
                                  "correo": "giuliana.obregon@upn.pe",
                                  "idBanner": "",
                                  "pidm": "",
                                  "tipoDesc": "Titular"
                              }
                          ],
                          "orden": null
                      },
                      {
                          "titulo": null,
                          "nrc": null,
                          "descripMetodoEducativo": "Presencial",
                          "codmetodoEducativo": null,
                          "descripMateria": "DIAGNÓST.E INFORME PSICOLÓGICO",
                          "codMateria": "PSGE1303A",
                          "codSeccion": "2224344248",
                          "descripPartePeriodo": null,
                          "codPartePeriodo": "",
                          "cantidadVeces": "1",
                          "codAula": "AUFOG",
                          "descripAula": "Edificio D",
                          "codCampus": "LE0",
                          "descripCampus": "Lima San Juan de Lurigancho",
                          "codEdificio": null,
                          "descripEdificio": null,
                          "fechaInicio": "2023-09-15",
                          "fechaFin": "2023-11-28",
                          "diaNombre": "LUNES",
                          "diaNumero": "0",
                          "horaInicio": "14:30:00",
                          "horaFin": "16:00:00",
                          "profesor": [
                              {
                                  "nombres": "",
                                  "apellidos": "",
                                  "nombreCompleto": "GIULIANA MARGARITA OBREGON LOPEZ",
                                  "correo": "giuliana.obregon@upn.pe",
                                  "idBanner": "",
                                  "pidm": "",
                                  "tipoDesc": "Titular"
                              }
                          ],
                          "orden": null
                      },
                      {
                          "titulo": null,
                          "nrc": null,
                          "descripMetodoEducativo": "Presencial",
                          "codmetodoEducativo": null,
                          "descripMateria": "PSIC.DE PERSONAS CON HAB.DIF.",
                          "codMateria": "PSED1404A",
                          "codSeccion": "2224344283",
                          "descripPartePeriodo": null,
                          "codPartePeriodo": "",
                          "cantidadVeces": "1",
                          "codAula": "B404",
                          "descripAula": "Edificio B",
                          "codCampus": "LE0",
                          "descripCampus": "Lima San Juan de Lurigancho",
                          "codEdificio": null,
                          "descripEdificio": null,
                          "fechaInicio": "2023-11-15",
                          "fechaFin": "2023-12-28",
                          "diaNombre": "LUNES",
                          "diaNumero": "0",
                          "horaInicio": "19:30:00",
                          "horaFin": "22:40:00",
                          "profesor": [
                              {
                                  "nombres": "",
                                  "apellidos": "",
                                  "nombreCompleto": "IGNACIO DE LOYOLA PEREZ DIAZ",
                                  "correo": "ignacio.perez@upn.pe",
                                  "idBanner": "",
                                  "pidm": "",
                                  "tipoDesc": "Titular"
                              }
                          ],
                          "orden": null
                      }
                  ]
              },
              {
                  "horario": {
                      "fechaInicio": null,
                      "fechaFin": null,
                      "diaNombre": "MARTES",
                      "diaNumero": "1",
                      "codPeriodo": null
                  },
                  "detalleHorario": [
                      {
                          "titulo": null,
                          "nrc": null,
                          "descripMetodoEducativo": "Presencial",
                          "codmetodoEducativo": null,
                          "descripMateria": "PSICOTERAPIA 1",
                          "codMateria": "PSCL1421A",
                          "codSeccion": "2224344261",
                          "descripPartePeriodo": null,
                          "codPartePeriodo": "",
                          "cantidadVeces": "1",
                          "codAula": "B302",
                          "descripAula": "Edificio B",
                          "codCampus": "LE0",
                          "descripCampus": "Lima San Juan de Lurigancho",
                          "codEdificio": null,
                          "descripEdificio": null,
                          "fechaInicio": "2023-11-15",
                          "fechaFin": "2023-12-28",
                          "diaNombre": "MARTES",
                          "diaNumero": "1",
                          "horaInicio": "12:30:00",
                          "horaFin": "17:40:00",
                          "profesor": [
                              {
                                  "nombres": "",
                                  "apellidos": "",
                                  "nombreCompleto": "GINA PAOLA NOEL BRAVO",
                                  "correo": "gina.noel@upn.pe",
                                  "idBanner": "",
                                  "pidm": "",
                                  "tipoDesc": "Titular"
                              }
                          ],
                          "orden": null
                      }
                  ]
              },
              {
                  "horario": {
                      "fechaInicio": null,
                      "fechaFin": null,
                      "diaNombre": "MIÉRCOLES",
                      "diaNumero": "2",
                      "codPeriodo": null
                  },
                  "detalleHorario": [
                      {
                          "titulo": null,
                          "nrc": null,
                          "descripMetodoEducativo": "Presencial",
                          "codmetodoEducativo": null,
                          "descripMateria": "SELECCIÓN DE PERSONAL",
                          "codMateria": "PSOR1401",
                          "codSeccion": "2224344265",
                          "descripPartePeriodo": null,
                          "codPartePeriodo": "",
                          "cantidadVeces": "1",
                          "codAula": "B701",
                          "descripAula": "Edificio B",
                          "codCampus": "LE0",
                          "descripCampus": "Lima San Juan de Lurigancho",
                          "codEdificio": null,
                          "descripEdificio": null,
                          "fechaInicio": "2023-11-15",
                          "fechaFin": "2023-12-28",
                          "diaNombre": "MIÉRCOLES",
                          "diaNumero": "2",
                          "horaInicio": "08:00:00",
                          "horaFin": "09:00:00",
                          "profesor": [
                              {
                                  "nombres": "",
                                  "apellidos": "",
                                  "nombreCompleto": "FIORELA MILAGROS ALFARO AMASIFEN",
                                  "correo": "fiorela.alfaro@upn.edu.pe",
                                  "idBanner": "",
                                  "pidm": "",
                                  "tipoDesc": "Titular"
                              }
                          ],
                          "orden": null
                      },
                      {
                          "titulo": null,
                          "nrc": null,
                          "descripMetodoEducativo": "Presencial",
                          "codmetodoEducativo": null,
                          "descripMateria": "SELECCIÓN DE PERSONAL",
                          "codMateria": "PSOR1401",
                          "codSeccion": "2224344265",
                          "descripPartePeriodo": null,
                          "codPartePeriodo": "",
                          "cantidadVeces": "1",
                          "codAula": "AUFOG",
                          "descripAula": "Edificio D",
                          "codCampus": "LE0",
                          "descripCampus": "Lima San Juan de Lurigancho",
                          "codEdificio": null,
                          "descripEdificio": null,
                          "fechaInicio": "2023-11-15",
                          "fechaFin": "2023-12-28",
                          "diaNombre": "MIÉRCOLES",
                          "diaNumero": "2",
                          "horaInicio": "17:50:00",
                          "horaFin": "19:20:00",
                          "profesor": [
                              {
                                  "nombres": "",
                                  "apellidos": "",
                                  "nombreCompleto": "FIORELA MILAGROS ALFARO AMASIFEN",
                                  "correo": "fiorela.alfaro@upn.edu.pe",
                                  "idBanner": "",
                                  "pidm": "",
                                  "tipoDesc": "Titular"
                              }
                          ],
                          "orden": null
                      }
                  ]
              },
              {
                  "horario": {
                      "fechaInicio": null,
                      "fechaFin": null,
                      "diaNombre": "VIERNES",
                      "diaNumero": "4",
                      "codPeriodo": null
                  },
                  "detalleHorario": [
                      {
                          "titulo": null,
                          "nrc": null,
                          "descripMetodoEducativo": "Presencial",
                          "codmetodoEducativo": null,
                          "descripMateria": "PSICOPATOLOGÍA 2",
                          "codMateria": "PSCL1412A",
                          "codSeccion": "2224344253",
                          "descripPartePeriodo": null,
                          "codPartePeriodo": "",
                          "cantidadVeces": "1",
                          "codAula": "B402",
                          "descripAula": "Edificio B",
                          "codCampus": "LE0",
                          "descripCampus": "Lima San Juan de Lurigancho",
                          "codEdificio": null,
                          "descripEdificio": null,
                          "fechaInicio": "2023-11-15",
                          "fechaFin": "2023-12-28",
                          "diaNombre": "VIERNES",
                          "diaNumero": "4",
                          "horaInicio": "17:50:00",
                          "horaFin": "20:00:00",
                          "profesor": [
                              {
                                  "nombres": "",
                                  "apellidos": "",
                                  "nombreCompleto": "MEDALIT LILIANA LUCHO CABILLAS",
                                  "correo": "medalit.lucho@upn.pe",
                                  "idBanner": "",
                                  "pidm": "",
                                  "tipoDesc": "Titular"
                              }
                          ],
                          "orden": 1
                      },
                      {
                          "titulo": null,
                          "nrc": null,
                          "descripMetodoEducativo": "Remoto",
                          "codmetodoEducativo": null,
                          "descripMateria": "PSICOPATOLOGÍA 2",
                          "codMateria": "PSCL1412A",
                          "codSeccion": "2224344253",
                          "descripPartePeriodo": null,
                          "codPartePeriodo": "",
                          "cantidadVeces": "1",
                          "codAula": "B402",
                          "descripAula": "Edificio B",
                          "codCampus": "LE0",
                          "descripCampus": "Lima San Juan de Lurigancho",
                          "codEdificio": null,
                          "descripEdificio": null,
                          "fechaInicio": "2023-11-15",
                          "fechaFin": "2023-12-28",
                          "diaNombre": "VIERNES",
                          "diaNumero": "4",
                          "horaInicio": "18:50:00",
                          "horaFin": "21:00:00",
                          "profesor": [
                              {
                                  "nombres": "",
                                  "apellidos": "",
                                  "nombreCompleto": "MEDALIT LILIANA LUCHO CABILLAS",
                                  "correo": "medalit.lucho@upn.pe",
                                  "idBanner": "",
                                  "pidm": "",
                                  "tipoDesc": "Titular"
                              },
                             {
                                  "nombres": "",
                                  "apellidos": "",
                                  "nombreCompleto": "RODRIGO",
                                  "correo": "medalit.lucho@upn.pe",
                                  "idBanner": "",
                                  "pidm": "",
                                  "tipoDesc": "Titular"
                              }
                          ],
                          "orden": 2
                      }
                  ]
              }
          ]
      };
      } catch (error) {
        console.error('Error fetching acceso directo data:', error);
      }
    },

    async fetchContenidoData (apiUrl: string, cycle: string) {
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
              cycle,
          );

        console.log('the response data: ', response.data);

        newData.push(response.data.data.ciclo_actual);
        newData.push(response.data.data.ciclo_siguiente);
        newData.push(response.data.data.ruta_archivo);

        this.contenidoData = newData;
      } catch (error) {
        console.error('Error fetching acceso directo data:', error);
      }
    },

    async fetchProfileData (apiUrl: string) {
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
            `/Accesos/v1/data_alumno?CodAlumno=${(await this.fetchData())?.localCodUser}&institucion=${(await this.fetchData())?.localIntitution}`,
          );
        this.profileData = response.data;
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    },
    async fetchProfesorData (apiUrl: string) {
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
            `/Cursos/v1/ProfesorCursoSeccion?institucion=${(await this.fetchData())?.localIntitution}&Seccion=${seccion}&CodPeriodo=${periodo}`,
          );
        this.profesorData = response.data?.data ?? [];
      } catch (error) {
        console.error('Error fetching profesor data:', error);
      }
    },
    async fetchCoursesData (apiUrl: string) {
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
            `/Cursos/v1/Todos?institucion=${(await this.fetchData())?.localIntitution}`,
          );
        this.coursesData = response.data?.data ?? [];
      } catch (error) {
        console.error('Error fetching courses data:', error);
      }
    },
    async fetchNewsData(apiUrl: string, page: string = "1", searchTerm: string = "", limit: string = "15", career = "", course = "") {
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
            `/Informativos/v1/Informativo?institucion=upn&page=${page}&search=${searchTerm}&limit=${limit}&user_course_name=${career}&user_career_name=${course}`
          );
        this.newsData = response.data?.data ?? [];
        this.newsDataMeta = response.data ?? [];
      } catch (error) {
        console.error('Error fetching News data:', error);
      }
    },
    async fetchNewsDataId (apiUrl: string, id: number) {
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
  },
});

interface MenuItem {
  id: number
  etiqueta: string
  nombre: string
  url: string | null
  submenu: []
}

interface AccesoDirectoItem {
  id: number
  status: string
  titulo: string
  imagen: string
  secuencia: number
  url: string | null
  abrir_nueva_pagina: boolean
  date_created: any
}

interface AyudaItem {
  id: number
  numero: string
  icono: string
}

interface ContenidosItem {
  data: ContenidoItem[]
}

interface ContenidoItem {
  id: number
  ciclo: number
  unidad: string
  texto: string
  detalles: Detail[]
}

interface Detail {
  id: number
  texto: string
}

interface NotificatioDataItem {
  id: string
  tipo: string
}

interface RegisterNotificationData {
  codAlumno: string
  notificaciones: NotificatioDataItem[]
}
