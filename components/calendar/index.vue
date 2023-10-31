<script setup>
import VueCal from "vue-cal";
import { dayDescription } from "@/utils/dateFunctions";
import "vue-cal/dist/vuecal.css";
const props = defineProps({
  data: Array,
});

const arrListevents = props.data;
const eventsUpdate = ref([]);

const events = [];
const feriados = [];
const academic = [];

const eventFech = (fecha1) => {
  let eventDay = new Date(fecha1);
  let dia = eventDay.getDate();
  let mes = eventDay.getMonth() + 1;
  let anio = eventDay.getFullYear();

  let formtDay = anio + "-" + mes + "-" + dia;

  return formtDay;
};
//Filtro de eventos activos
const activeCalendar = arrListevents?.filter(
  (event) => event.mostrarEnCalendario == true
);

// Nueva lista de los eventos
activeCalendar?.forEach((eventService) => {
  let fEnd =
    eventService.fechaEnd == null
      ? eventService.fechaInit
      : eventService.fechaEnd;
  let start = eventFech(eventService.fechaInit);
  let end = eventFech(fEnd);
  if (eventService.feriado) {
    feriados.push(new Date(eventService.fechaInit).format());
    feriados.push(new Date(eventService.fechaEnd).format());
  } else
    academic.push({
      title: eventService.tramite,
      start: start,
      end: end,
      feriado: eventService.feriado,
    });
  events.push({
    title: eventService.tramite,
    start: start,
    end: end,
    feriado: eventService.feriado,
  });
});

const numMonth = (dayFe) => {
  let eventDay = new Date(dayFe);
  let mes = eventDay.getMonth() + 1;
  return mes;
};

let eventDay = new Date();
const res = events?.filter(
  (event) => numMonth(event.start) == numMonth(eventDay)
);
eventsUpdate.value = res;

const calEvents = (t, n) => {
  const holidays = events.filter(
    (event) => numMonth(event.start) === numMonth(n.startDate) && event.feriado
  );
  eventsUpdate.value = n.events.concat(holidays);
};
</script>
<template>
  <client-only>
    <vue-cal
      hide-view-selector
      :time="false"
      active-view="month"
      xsmall
      :events="academic"
      locale="es"
      class="C_calendar"
      :disable-days="feriados"
      @view-change="calEvents('view-change', $event)"
    >
      <template #arrow-prev>
        <nuxt-icon class="text-[14px] no-fill text-primary" name="left" />
      </template>
      <template #arrow-next>
        <nuxt-icon class="text-[14px] no-fill text-primary" name="right" />
      </template>
    </vue-cal>
  </client-only>
  <div class="list_events mb-5">
    <div
      v-for="event in eventsUpdate"
      :key="event"
      class="mt-3 p-3"
      :class="{
        feriado: event.feriado,
        academico: !event.feriado,
      }"
    >
      <h3 class="font-bold">{{ event.title }}</h3>
      <div class="flex details">
        <nuxt-icon class="text-[14px] mr-2" name="IconCalendarDays" />
        <span class="date-text">
          {{ dayDescription(event.start) }}
          <span
            v-if="dayDescription(event.start) !== dayDescription(event.end)"
          >
            - {{ dayDescription(event.end) }}</span
          >
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
.C_calendar .vuecal__cell--disabled {
  @apply cursor-default;
}
.C_calendar .vuecal__cell--disabled .vuecal__cell-date {
  @apply relative text-[#B70812] cursor-default after:content-[''] after:absolute 
  after:left-[50%] after:w-[1px] after:h-[90%] after:bg-[#B70812] after:rotate-45;
}
.C_calendar {
  height: auto;
}

/* Dash indicator */
.vuecal__cell-events-count {
  width: 18px;
  height: 2px;
  color: transparent;
}

/* Dot indicator */
.vuecal__cell-events-count {
  width: 4px;
  min-width: 0;
  height: 4px;
  padding: 0;
  color: transparent;
}
.vuecal__title-bar {
  background-color: transparent;
  font-family: "solano";
  font-size: 20px !important;
  width: 70%;
}
.vuecal__arrow--prev {
  margin-left: 0;
}

/* Month */
.vuecal__flex.weekday-label {
  font-size: 12px;
}

/* Cell background indicator */
.vuecal__cell--has-events .vuecal__cell-content {
  @apply h-[80%] w-full bg-[#9982D9];
}
.vuecal__cell--out-of-scope .vuecal__cell-content {
  @apply bg-transparent;
}
.vuecal__cell--has-events .vuecal__cell-date {
  color: #270b73;
}
.vuecal__cell-date {
  color: #191919;
  font-size: 11px;
}
.vuecal__cell--out-of-scope .vuecal__cell-date {
  color: #a6a6a6 !important;
}
.vuecal__cell--out-of-scope .vuecal__cell-date::after {
  background-color: #a6a6a6 !important;
}
.vuecal__cell:before {
  border: none;
}
.vuecal__weekdays-headings,
.vuecal__body {
  background-color: #ffffff;
  padding-left: 7px;
  padding-right: 7px;
}
.vuecal__body {
  padding-bottom: 7px;
}
.vuecal__cell {
  margin-top: 2px;
  margin-bottom: 2px;
}
.vuecal__cell-content {
  height: 28px;
}
.vuecal__cell-events-count {
  display: none;
}
.vuecal {
  box-shadow: none;
}
.vuecal__cell--today {
  @apply bg-transparent font-bold;
}
.vuecal__cell--today .vuecal__cell-date {
  @apply relative w-[60%] h-full mx-auto flex items-center justify-center bg-white before:absolute before:content-['']
  before:h-[28px] before:left-0 before:w-full before:border-[1px] before:border-primary before:rounded;
}

/* Events List */
.date-text {
  font-size: 13px;
}
.list_events h3 {
  font-size: 14px;
}

.feriado {
  @apply bg-[#FACED1] rounded border-[#F2858B] border-[1px];
}
.feriado .details,
.feriado h3 {
  @apply text-[#B70812];
}
.academico {
  @apply bg-[#B3A1E6] rounded border-[#9982D9] border-[1px];
}
.academico .details,
.academico h3 {
  @apply text-[#270B73];
}
</style>
