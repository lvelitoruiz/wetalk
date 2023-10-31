<script setup>
const { getDataCalendar, getListCalendarPeriods, getDataCalendarPdf } =
  useScheduleData();
const dataCalendar = ref(null);
const { data: dataCAPeriodo } = await getDataCalendar("", true);
dataCalendar.value = dataCAPeriodo.value?.data;
const {
  data: litsPeriodos,
  error: errorListPeriod,
  pending: pendingListPerid,
} = await getListCalendarPeriods();
const periodoValue = ref(dataCalendar.value[0]?.ciclo);
const periodosList = ref(null);
const route = useRoute();
const isFromSuperapp = Boolean(route?.query?._app === "superapp");
watch(litsPeriodos, async (response) => {
  if (response.menssage !== null) {
    periodosList.value = response;
    periodosList.value?.data.sort((x, y) => x.periodo - y.periodo);
  }
});
const { data: dataPdf, pending: pendingPdf } = await getDataCalendarPdf(
  periodoValue.value
);
const contentPdf = ref([]);
watch(dataPdf, (response) => {
  if (response?.flag) {
    contentPdf.value = response.data;
  }
});
const pendingDC = ref(false);
const pendingPfdChange = ref(false);
const eventChangePeriodo = async () => {
  pendingDC.value = true;
  pendingPfdChange.value = true;
  await getDataCalendar(periodoValue.value, false).then((response) => {
    pendingDC.value = false;
    dataCalendar.value = response.data.value.data.filter(
      (item) => !item.feriado
    );
  });
  await getDataCalendarPdf(periodoValue.value).then((response) => {
    pendingPfdChange.value = false;
    contentPdf.value = response.data.value?.data;
  });
};
const modalidad = JSON.parse(
  sessionStorage.getItem("infoAlumn")
).codModalidadEstActual;
const modalidadActual = () => {
  if (modalidad === "AC") {
    return "Pregrado";
  } else {
    return "EPE";
  }
};
</script>
<template>
  <h1 class="subtitle mb-5">Calendario Académico {{ modalidadActual() }}</h1>

  <div v-if="pendingListPerid || pendingPdf || pendingPfdChange" class="flex justify-center items-center py-10">
    <img class="w-[70px]" src="~/assets/images/loading.gif" alt="Cargando" />
  </div>
  <div v-else>
    <div v-if="Boolean(periodosList?.flag) && periodosList?.data.length > 0">
      <div class="c_filter text-right my-5 flex justify-between">
        <div class="flex flex-col md:flex-row items-start md:items-center">
          <strong class="mr-8 text-sm md:text-base">Periodo:</strong>
          <select @change="eventChangePeriodo()" v-model="periodoValue"
            class="w-48 p-2 border-solid border-2 border-gray-200 base-select-purple">
            <option v-for="period in periodosList?.data" :key="period" :value="period.periodo">
              <span>{{ period.periodo }}</span>
            </option>
          </select>
        </div>
        <a v-if="contentPdf?.length > 0 && !isFromSuperapp" :href="contentPdf[0].url_calendario" target="_blank"
          rel="noopener noreferrer" class="flex flex-col justify-center items-center self-end">
          <NuxtIcon name="IconPdf" class="text-[24px] inline-flex"></NuxtIcon>
          <div class="text-xs md:text-sm font-bold leading-none">Descargar</div>
        </a>
      </div>
      <div v-if="pendingDC" class="flex justify-center items-center py-10 mt-5 h-60">
        <img class="w-[70px]" src="~/assets/images/loading.gif" alt="Cargando" />
      </div>
      <div v-else class="table_calendar">
        <BaseAltMsgInt class="py-10" v-if="dataCalendar?.length === 0" mainText="Estamos trabajando en esta información"
          secondaryText="Pronto compartiremos contenido actualizado" />
        <div v-else>
          <table class="table-payment">
            <thead>
              <tr>
                <th>Descripción</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="item in dataCalendar" :key="item">
                <tr v-if="!item.feriado">
                  <td class="left" :class="{ 'font-semibold': item.mostrarEnCalendario }">
                    {{ item.tramite }}
                  </td>
                  <td :class="{ 'font-semibold': item.mostrarEnCalendario }">
                    {{ item.fecha }}
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <BaseAltMsgInt v-else :error="true" class="py-10" :mainText="periodosList?.error.titulo
        ? periodosList?.error.titulo
        : 'Lo sentimos, no pudimos cargar el detalle del Calendario Académico'
      " :secondaryText="periodosList?.error.descripcion
      ? periodosList?.error.descripcion
      : 'Inténtalo de nuevo más tarde'
    " />
  </div>
</template>
<style>
.table_calendar .table-payment {
  width: 100%;
}

.table_calendar .left {
  text-align: left;
}

@media screen and (min-width: 1200px) {

  .table_calendar .table-payment,
  .c_filter {
    width: 80% !important;
  }
}
</style>
