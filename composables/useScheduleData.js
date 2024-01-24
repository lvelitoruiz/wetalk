/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable no-undef */
import getAuthHeaders from '~~/utils/authHeaders';
const useScheduleData = () => {
  const config = useRuntimeConfig();

  const getScheduleInit = async () => {
    const { data } = await useFetch(
      `${config.public.baseURL}Cursos/v1/Detalle_Matriculas`,
      {
        headers: getAuthHeaders(),
        params: {
          CodLineaNegocio: 'U',
          CodModalEst: 'AC',
          CodUsuario: 'U201520067',
          CodAlumno: '201520067',
          CodPeriodo: '201502',
        },
      },
    );

    return data.value;
  };

  const getScheduleCourse = async (course) => {
    const { data: matricula1, error } = await useFetch(
      `${config.public.baseURL}Cursos/v1/Detalle_Curso`,
      {
        headers: getAuthHeaders(),
        params: {
          CodLineaNegocio: 'U',
          CodModalEst: JSON.parse(sessionStorage.getItem('infoAlumn'))
            .codModalidadEstActual,
          CodUsuario: JSON.parse(sessionStorage.getItem('infoAlumn'))
            .codUsuario,
          CodAlumno: JSON.parse(sessionStorage.getItem('infoAlumn')).codAlumno,
          CodCurso: course.codCurso,
          CodPeriodo: JSON.parse(sessionStorage.getItem('infoAlumn'))
            .codPeriodoActual,
          Grupo: course.grupo,
          Seccion: course.seccion,
        },
      },
    );

    return { matricula1, error };
  };

  const getSchedule = async (day1, day2) => {
    const response = await useLazyFetch(
      `${config.public.baseURL}Horarios/v1/Horario_Alumno`,
      {
        headers: getAuthHeaders(),
        params: {
          CodLineaNegocio: JSON.parse(sessionStorage.getItem('infoAlumn'))
            .codLineaNegocio,
          CodModalEst: JSON.parse(sessionStorage.getItem('infoAlumn'))
            .codModalidadEstActual,
          CodUsuario: JSON.parse(sessionStorage.getItem('infoAlumn'))
            .codUsuario,
          CodAlumno: JSON.parse(sessionStorage.getItem('infoAlumn')).codAlumno,
          CodPeriodo: JSON.parse(sessionStorage.getItem('infoAlumn'))
            .codPeriodoActual,
          FechaSesion2: `${day2}T23:00:00Z`,
          FechaSesion1: `${day1}T00:00:00Z`,
        },
      },
    );

    return response;
  };

  const getListCalendarPeriods = async () => {
    const responses = await useLazyFetch(
      `${config.public.baseURL}Horarios/v1/ListarPeriodo`,
      {
        headers: getAuthHeaders(),
        params: {
          modalidad: JSON.parse(sessionStorage.getItem('infoAlumn'))
            .codModalidadEstActual,
        },
      },
    );

    return responses;
  };

  const getDataCalendar = async (actualCode, activo) => {
    const responses = await useLazyFetch(
      `${config.public.baseURL}Horarios/v1/CalendarioAcademico`,
      {
        headers: getAuthHeaders(),
        params: {
          periodo: actualCode,
          periodoActual: activo,
          modalidad: JSON.parse(sessionStorage.getItem('infoAlumn'))
            .codModalidadEstActual,
        },
      },
    );

    return responses;
  };

  const getDataCalendarPdf = async (actualCode) => {
    const responses = await useLazyFetch(
      `${config.public.baseURL}Horarios/v1/CalendarioAcademicoPDF`,
      {
        headers: getAuthHeaders(),
        params: {
          periodo: actualCode,
          modalidad: JSON.parse(sessionStorage.getItem('infoAlumn'))
            .codModalidadEstActual,
        },
      },
    );

    return responses;
  };

  const getDataHome = async (params) => {
    const response = useLazyFetch(
      `${config.public.baseURL}Horarios/v1/Horario_Alumno`,
      {
        headers: getAuthHeaders(),
        params: {
          CodLineaNegocio: JSON.parse(sessionStorage.getItem('infoAlumn'))
            .codLineaNegocio,
          CodModalEst: JSON.parse(sessionStorage.getItem('infoAlumn'))
            .codModalidadEstActual,
          CodUsuario: JSON.parse(sessionStorage.getItem('infoAlumn'))
            .codUsuario,
          CodAlumno: JSON.parse(sessionStorage.getItem('infoAlumn')).codAlumno,
          CodPeriodo: JSON.parse(sessionStorage.getItem('infoAlumn'))
            .codPeriodoActual,
          FechaSesion2: `${params}T23:00:00Z`,
          FechaSesion1: `${params}T00:00:00Z`,
        },
      },
    );

    return await response;
  };

  return {
    getScheduleInit,
    getScheduleCourse,
    getSchedule,
    getListCalendarPeriods,
    getDataCalendar,
    getDataCalendarPdf,
    getDataHome,
  };
};

export default useScheduleData;
