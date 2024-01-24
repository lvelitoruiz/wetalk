<!-- eslint-disable no-undef -->
<!-- eslint-disable vue/require-valid-default-prop -->
<script setup>
import { defineProps, ref, onBeforeUnmount } from 'vue';
import { getDay } from '../../utils/dateFunctions';

const props = defineProps({
  data: {
    type: Array,
    default: [
      // {
      //     "DTOHorarioAlumnoCab": {
      //         "CodLineaNegocio": "U",
      //         "CodModalEst": "FC",
      //         "NombreDia": "MIÉRCOLES",
      //         "CodPeriodo": "202302",
      //         "FechaSesion": "2023-10-25T00:00:00",
      //         "Dia": 0
      //     },
      //     "ListaDTOHorarioAlumnoDet": [
      //         {
      //             "IdSesion": 36040901,
      //             "HoraInicioSesion": "2023-10-25T19:00:00",
      //             "Seccion": "E72B",
      //             "Grupo": "00",
      //             "CodCurso": "IS221",
      //             "HoraTerminoSesion": "2023-10-25T23:00:00",
      //             "CodAula": "ONL-A",
      //             "CodLineaNegAula": "U",
      //             "CodTipoClase": "TE",
      //             "Vigente": "SI",
      //             "CodTipoPrueba": null,
      //             "NumTipoPrueba": null,
      //             "HoraLista": "2023-10-25T18:50:00",
      //             "Tema": null,
      //             "CodProducto": null,
      //             "VacanteExamen": null,
      //             "IdWsesion": 1105400,
      //             "UsuarioCreador": "EZUNIGA",
      //             "FechaCreacion": "2023-07-09T08:53:23",
      //             "UsuarioModifica": null,
      //             "FechaModifica": null,
      //             "IdPrestaAula": null,
      //             "Envio": "NO",
      //             "TipoMail": "0",
      //             "Observacion": null,
      //             "VistoExtranet": null,
      //             "MedioCalificacion": null,
      //             "IndPronabec": "SI",
      //             "IdDocenSecc": 1631470,
      //             "HoraAsistenciaDocSes": "2023-10-25T18:49:00",
      //             "JustificacionDocSes": null,
      //             "PagoSesionDocSes": "SI",
      //             "UsuarioCreadorDocSes": "EZUNIGA",
      //             "FechaCreacionDocSes": "2023-07-09T08:53:24",
      //             "UsuarioMoficaDocSes": null,
      //             "FechaModificaDocSes": null,
      //             "AsistioDocSes": "SI",
      //             "AvisoDocSes": null,
      //             "DireccionIPDocSes": "10.10.1.112",
      //             "CantidadReclamosDocSes": 0,
      //             "FechaDevolucionDocSes": null,
      //             "FechaADevolverDocSes": null,
      //             "DevolvioReclamosDocSes": "NO",
      //             "CantidadDevueltaDocSes": null,
      //             "ObservacionDocSes": null,
      //             "CodDocente": null,
      //             "CodCategDoc": "PR",
      //             "CodTarifaDocSes": null,
      //             "CodSubCatDoce": null,
      //             "CodLocal": "A",
      //             "CodPabellon": "9",
      //             "CodPiso": "NA",
      //             "CodTipoAula": "08",
      //             "VacantesAula": 2000,
      //             "EstadoAula": "SI",
      //             "ReservaAula": "NO",
      //             "VacantesRecuperacionAula": 2000,
      //             "CodProductoGrpCursec": null,
      //             "VacanteDisponibleGrpCursec": 45,
      //             "VacanteUsadaGrpCursec": 23,
      //             "FecheCierreGrpCursec": null,
      //             "VacanteUsadaMAutoGrpCursec": 0,
      //             "MedioCalificacionMC": null,
      //             "DescripcionTipoClase": "TEORÍA",
      //             "DescripcionTipoPrueba": null,
      //             "CodTipoSesion": "NO",
      //             "DescripcionTipoSesion": "NORMAL",
      //             "SesionReprograma": "NO",
      //             "ApePatImag": "Málaga",
      //             "ApeMatImag": "Segovia",
      //             "NombresImag": "Juan Carlos",
      //             "ApellidoPatern": "MALAGA",
      //             "ApellidoMatern": "SEGOVIA",
      //             "Nombres": "JUAN CARLOS",
      //             "TipoDocumento": "DNI",
      //             "DocumenIdentida": "07561600",
      //             "DescripcionTpCategDoce": "PROFESOR PRINCIPAL",
      //             "DescripcionTpSubcatDoce": "PRINCIPAL",
      //             "DescMinisterioCurso": "GERENCIA DE PROYECTOS",
      //             "DescEspecialCurso": "Gerencia de Proyectos",
      //             "CodDireccionCurso": "IS",
      //             "CodSedeAlumno": "A",
      //             "CodDocenteDocSec": 3781,
      //             "CodCategDocDocSec": null,
      //             "CodTarifaDocSec": null,
      //             "CodSubCatDocSec": "PR",
      //             "IndOnlineCurso": "SI",
      //             "DesCurso": "GERENCIA DE PROYECTOS",
      //             "strHoraInicio": null,
      //             "strHoraFin": null
      //         }
      //     ]
      // },
      // {
      //     "DTOHorarioAlumnoCab": {
      //         "CodLineaNegocio": "U",
      //         "CodModalEst": "FC",
      //         "NombreDia": "DOMINGO",
      //         "CodPeriodo": "202302",
      //         "FechaSesion": "2023-10-29T00:00:00",
      //         "Dia": 0
      //     },
      //     "ListaDTOHorarioAlumnoDet": [
      //         {
      //             "IdSesion": 36677968,
      //             "HoraInicioSesion": "2023-10-29T07:00:00",
      //             "Seccion": "G501",
      //             "Grupo": "00",
      //             "CodCurso": "OA00",
      //             "HoraTerminoSesion": "2023-10-29T08:00:00",
      //             "CodAula": "ONLA1",
      //             "CodLineaNegAula": "U",
      //             "CodTipoClase": "TE",
      //             "Vigente": "SI",
      //             "CodTipoPrueba": null,
      //             "NumTipoPrueba": null,
      //             "HoraLista": null,
      //             "Tema": null,
      //             "CodProducto": null,
      //             "VacanteExamen": null,
      //             "IdWsesion": 1114779,
      //             "UsuarioCreador": "JOLAURA",
      //             "FechaCreacion": "2023-10-04T09:25:13",
      //             "UsuarioModifica": null,
      //             "FechaModifica": null,
      //             "IdPrestaAula": null,
      //             "Envio": "NO",
      //             "TipoMail": "0",
      //             "Observacion": null,
      //             "VistoExtranet": null,
      //             "MedioCalificacion": null,
      //             "IndPronabec": "SI",
      //             "IdDocenSecc": 1674090,
      //             "HoraAsistenciaDocSes": null,
      //             "JustificacionDocSes": null,
      //             "PagoSesionDocSes": "SI",
      //             "UsuarioCreadorDocSes": "JOLAURA",
      //             "FechaCreacionDocSes": "2023-10-04T09:25:14",
      //             "UsuarioMoficaDocSes": null,
      //             "FechaModificaDocSes": null,
      //             "AsistioDocSes": "NO",
      //             "AvisoDocSes": null,
      //             "DireccionIPDocSes": null,
      //             "CantidadReclamosDocSes": 0,
      //             "FechaDevolucionDocSes": null,
      //             "FechaADevolverDocSes": null,
      //             "DevolvioReclamosDocSes": "NO",
      //             "CantidadDevueltaDocSes": null,
      //             "ObservacionDocSes": null,
      //             "CodDocente": null,
      //             "CodCategDoc": "PR",
      //             "CodTarifaDocSes": null,
      //             "CodSubCatDoce": null,
      //             "CodLocal": "A",
      //             "CodPabellon": "9",
      //             "CodPiso": "NA",
      //             "CodTipoAula": "08",
      //             "VacantesAula": 2000,
      //             "EstadoAula": "SI",
      //             "ReservaAula": "NO",
      //             "VacantesRecuperacionAula": 2000,
      //             "CodProductoGrpCursec": null,
      //             "VacanteDisponibleGrpCursec": 400,
      //             "VacanteUsadaGrpCursec": 400,
      //             "FecheCierreGrpCursec": "2023-08-09T23:36:53",
      //             "VacanteUsadaMAutoGrpCursec": 0,
      //             "MedioCalificacionMC": null,
      //             "DescripcionTipoClase": "TEORÍA",
      //             "DescripcionTipoPrueba": null,
      //             "CodTipoSesion": "NO",
      //             "DescripcionTipoSesion": "NORMAL",
      //             "SesionReprograma": "NO",
      //             "ApePatImag": "Natividad",
      //             "ApeMatImag": "Gomez",
      //             "NombresImag": "Patricia Andrea",
      //             "ApellidoPatern": "NATIVIDAD",
      //             "ApellidoMatern": "GOMEZ",
      //             "Nombres": "PATRICIA ANDREA",
      //             "TipoDocumento": "DNI",
      //             "DocumenIdentida": "44101390",
      //             "DescripcionTpCategDoce": "PROFESOR PRINCIPAL",
      //             "DescripcionTpSubcatDoce": null,
      //             "DescMinisterioCurso": "ISC GESTIONAR Y LIDERAR PARA EL FUTURO DEL TRABAJO",
      //             "DescEspecialCurso": "ISC Gestionar y Liderar para el Futuro del Trabajo",
      //             "CodDireccionCurso": "OA",
      //             "CodSedeAlumno": "A",
      //             "CodDocenteDocSec": 11419,
      //             "CodCategDocDocSec": null,
      //             "CodTarifaDocSec": null,
      //             "CodSubCatDocSec": null,
      //             "IndOnlineCurso": "SI",
      //             "DesCurso": "ISC GESTIONAR Y LIDERAR PARA EL FUTURO DEL TRABAJO",
      //             "strHoraInicio": null,
      //             "strHoraFin": null
      //         },
      //         {
      //             "IdSesion": 36677096,
      //             "HoraInicioSesion": "2023-10-29T16:00:00",
      //             "Seccion": "G501",
      //             "Grupo": "00",
      //             "CodCurso": "OA09",
      //             "HoraTerminoSesion": "2023-10-29T17:00:00",
      //             "CodAula": "ONLA4",
      //             "CodLineaNegAula": "U",
      //             "CodTipoClase": "TE",
      //             "Vigente": "SI",
      //             "CodTipoPrueba": null,
      //             "NumTipoPrueba": null,
      //             "HoraLista": null,
      //             "Tema": null,
      //             "CodProducto": null,
      //             "VacanteExamen": null,
      //             "IdWsesion": 1114795,
      //             "UsuarioCreador": "JOLAURA",
      //             "FechaCreacion": "2023-10-04T08:58:42",
      //             "UsuarioModifica": null,
      //             "FechaModifica": null,
      //             "IdPrestaAula": null,
      //             "Envio": "NO",
      //             "TipoMail": "0",
      //             "Observacion": null,
      //             "VistoExtranet": null,
      //             "MedioCalificacion": null,
      //             "IndPronabec": "SI",
      //             "IdDocenSecc": 1674072,
      //             "HoraAsistenciaDocSes": null,
      //             "JustificacionDocSes": null,
      //             "PagoSesionDocSes": "SI",
      //             "UsuarioCreadorDocSes": "JOLAURA",
      //             "FechaCreacionDocSes": "2023-10-04T08:58:43",
      //             "UsuarioMoficaDocSes": null,
      //             "FechaModificaDocSes": null,
      //             "AsistioDocSes": "NO",
      //             "AvisoDocSes": null,
      //             "DireccionIPDocSes": null,
      //             "CantidadReclamosDocSes": 0,
      //             "FechaDevolucionDocSes": null,
      //             "FechaADevolverDocSes": null,
      //             "DevolvioReclamosDocSes": "NO",
      //             "CantidadDevueltaDocSes": null,
      //             "ObservacionDocSes": null,
      //             "CodDocente": null,
      //             "CodCategDoc": "PR",
      //             "CodTarifaDocSes": null,
      //             "CodSubCatDoce": null,
      //             "CodLocal": "A",
      //             "CodPabellon": "9",
      //             "CodPiso": "NA",
      //             "CodTipoAula": "08",
      //             "VacantesAula": 2000,
      //             "EstadoAula": "SI",
      //             "ReservaAula": "NO",
      //             "VacantesRecuperacionAula": 2000,
      //             "CodProductoGrpCursec": null,
      //             "VacanteDisponibleGrpCursec": 185,
      //             "VacanteUsadaGrpCursec": 185,
      //             "FecheCierreGrpCursec": "2023-10-02T09:41:00",
      //             "VacanteUsadaMAutoGrpCursec": 0,
      //             "MedioCalificacionMC": null,
      //             "DescripcionTipoClase": "TEORÍA",
      //             "DescripcionTipoPrueba": null,
      //             "CodTipoSesion": "NO",
      //             "DescripcionTipoSesion": "NORMAL",
      //             "SesionReprograma": "NO",
      //             "ApePatImag": "Bossio",
      //             "ApeMatImag": "Montes De Oca",
      //             "NombresImag": "Jorge Ernesto Luis",
      //             "ApellidoPatern": "BOSSIO",
      //             "ApellidoMatern": "MONTES DE OCA",
      //             "Nombres": "JORGE ERNESTO LUIS",
      //             "TipoDocumento": "DNI",
      //             "DocumenIdentida": "07256522",
      //             "DescripcionTpCategDoce": "PROFESOR PRINCIPAL",
      //             "DescripcionTpSubcatDoce": null,
      //             "DescMinisterioCurso": "ISC FOTOGRAFÍA DIGITAL: DESDE SMARTPHONES A DSLR",
      //             "DescEspecialCurso": "ISC Fotografía Digital: Desde Smartphones a DSLR",
      //             "CodDireccionCurso": "OA",
      //             "CodSedeAlumno": "A",
      //             "CodDocenteDocSec": 6657,
      //             "CodCategDocDocSec": null,
      //             "CodTarifaDocSec": null,
      //             "CodSubCatDocSec": null,
      //             "IndOnlineCurso": "SI",
      //             "DesCurso": "ISC FOTOGRAFÍA DIGITAL: DESDE SMARTPHONES A DSLR",
      //             "strHoraInicio": null,
      //             "strHoraFin": null
      //         }
      //     ]
      // }
    ],
  },
});

const selectedCourseDay = ref('Todos');
const selectedCourseWeek = ref('Todos');
const allCourses = ref({});
const hours = ref({
  '07': 55,
  '08': 55,
  '09': 55,
  10: 55,
  11: 55,
  12: 55,
  13: 55,
  14: 55,
  15: 55,
  16: 55,
  17: 55,
  18: 55,
  19: 55,
  20: 55,
  21: 55,
  22: 55,
  23: 55,
  24: 0,
});
const today = getDay(new Date());

onBeforeUnmount(() => {
  states.setDay(today);
  selectedCourseDay.value = 'Todos';
  selectedCourseWeek.value = 'Todos';
});

const states = scheduleState();
states.setDay(today);
states.setWeekCourses(props.data);
states.setcoursesListDay(states.fullWeek[states.day]);
states.setSessions(props.data);

const handleChange = (val) => {
  states.changeDay(val);
  states.setcoursesListDay(states.fullWeek[states.day]);
  selectedCourseDay.value = 'Todos';
};

const active = ref('day');
const changeView = (str) => {
  active.value = str;
  selectedCourseDay.value = 'Todos';
  selectedCourseWeek.value = 'Todos';
  states.setDay(today);
  states.setcoursesListDay(states.fullWeek[states.day]);
};

const handleFilter = (e) => {
  selectedCourseDay.value = e.target.value;
};
const handleFilterWeek = (e) => {
  Object.keys(allCourses.value).forEach((cod) => {
    allCourses.value[cod].state = false;
  });
  selectedCourseWeek.value = e.target.value;
  if (e.target.value !== 'Todos') {
    allCourses.value[e.target.value].state = true;
  }
};

const sessionDate = computed(() => {
  if (states.coursesListDay?.empty) {
    const today = new Date();
    return new Date(
      today.setDate(today.getDate() - today.getDay() + states.day + 1),
    ).toDateString();
  }
  return states.coursesListDay?.DTOHorarioAlumnoCab.FechaSesion;
});
</script>

<template>
  <div>
    <div
      class="bg-[#5598FF] box-border w-full grid grid-cols-2 gap-x-3 gap-y-4 xl:flex xl:justify-between px-3 xl:px-10 py-2 mb-0"
    >
      <ScheduleDayWeekTab
        :change-view="changeView"
        :active="active"
      />
      <!-- Filtro  -->
      <ScheduleCourseFilter
        v-if="active === 'day'"
        :selected-course="selectedCourseDay"
        :handle-course="handleFilter"
        :all-courses="states.dayFilter"
      />
      <ScheduleCourseFilter
        v-else
        :selected-course-week="selectedCourseWeek"
        :handle-course="handleFilterWeek"
        :all-courses="allCourses"
      />
      <!-- Tab Dia/Mes -->
      <ScheduleDayControls
        :handle-change="handleChange"
        :day="states.day"
        :session-date="
          active === 'day' ? sessionDate : new Date().toDateString()
        "
        :courses="states.fullWeek"
        :active="active === 'week'"
      />
    </div>
    <!-- Calendario dia - semana -->
    <ScheduleDayBoard
      v-if="active === 'day'"
      :filter="selectedCourseDay"
    />
    <ScheduleWeekBoard
      v-else-if="active === 'week'"
      :data="data"
      :all-courses="allCourses"
      selected-course="selectedCourseWeek"
      :filter="selectedCourseDay"
      :hours="hours"
      :handle-change="handleChange"
    />
  </div>
</template>
