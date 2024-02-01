<script setup lang="ts">
import { scheduleState } from '~/stores/scheduleStates';
import type { HorarioData } from '~/types/cursos.types';

const props = defineProps<{
  data: HorarioData | null
  handleDay: (day: number) => void
  day: number
  pending: boolean
  errorService: { titulo: string } | null
  error: Error | null
}>();
const states = scheduleState();

const hourModified = {
  '07': 38,
  '08': 38,
  '09': 38,
  10: 38,
  11: 38,
  12: 38,
  13: 38,
  14: 38,
  15: 38,
  16: 38,
  17: 38,
  18: 38,
  19: 38,
  20: 38,
  21: 38,
  22: 38,
  23: 38,
  24: 38,
};
const buildLayout = () => {
  for (const prop in hourModified) {
    hourModified[prop as keyof typeof hourModified] = 36;
  }
  if (props.data?.detalleHorario) {
    props.data.detalleHorario.forEach((course: any) => {
      const timeArrFin = course.horaFin.split(':');
      const timeArrInit = course.horaInicio.split(':');
      const finInMinutes = Number(timeArrFin[0]) * 60 + Number(timeArrFin[1]);
      const initInMinutes =
				Number(timeArrInit[0]) * 60 + Number(timeArrInit[1]);
      const courseDuration = (finInMinutes - initInMinutes) / 60;
      const fix =
				Number(timeArrInit[1]) > 30 &&
				Number(timeArrFin[1]) > 0 &&
				Number(timeArrInit[1]) >= Number(timeArrFin[1])
				  ? 1
				  : 0;
      let currentHour = Number(timeArrInit[0]);
      Array(Math.ceil(courseDuration) + fix)
        .fill(1)
        .forEach(() => {
          const key =
						currentHour.toString().length === 1
						  ? `0${currentHour}`
						  : currentHour.toString();
          hourModified[key as keyof typeof hourModified] = 62;
          currentHour += 1;
        });
    });
  }
};

const getDiff = (init: string, fin: string) => {
  const timeArrFin = fin.split(':');
  const timeArrInit = init.split(':');
  return (
    Number(timeArrFin[0]) * 60 +
		Number(timeArrFin[1]) -
		(Number(timeArrInit[0]) * 60 + Number(timeArrInit[1]))
  );
};

const getTopAndHeight = (init: string, fin: string) => {
  const hCard = 62;
  const height = getDiff(init, fin) * (hCard / 60) - 5;
  let top = 0;
  Object.keys(hourModified)
    .sort()
    .forEach((item) => {
      if (
        Number(init.split(':')[0]) !== 7 &&
				Number(item) < Number(init.split(':')[0])
      ) {
        top = top + hourModified[item as keyof typeof hourModified];
      }
    });
  const timeArrInit = init.split(':');
  if (Number(Number(timeArrInit[1])) / 60 > 0) { top = top + Number(timeArrInit[1]) * (hCard / 60); }
  return {
    top: `${top + 3}px`,
    height: `${height}px`,
  };
};

const eventClick = (item: Date) => {
  states.setDay(getNumDay(item.getDay()));
};

const getNumDay = (day: number) => (day + 6) % 7;

const getSelectedDay = computed(() => {
  const weekDates = getWeekDates();
  const selectedDay = Object.keys(getWeekDates())[states.day];

  return weekDates[selectedDay as keyof typeof weekDates];
});

onBeforeMount(() => {
  buildLayout();
});
onBeforeUpdate(() => {
  buildLayout();
});
</script>

<template>
  <div class="bg-white px-3 pt-4 mb-[25px] rounded-b-[14px] shadow-[0_10px_6px_0_rgba(0,0,0,0.05)]">
    <div class="datesList">
      <button
        v-for="(item, i) in getWeekDates()"
        :key="i"
        class="dateList-item"
        @click="eventClick(item)"
      >
        <div
          class="dateList-item-text"
          :class="{ isToday: getNumDay(item.getDay()) === states.day }"
        >
          <p class="font-solano text-[20px] mb-1">
            {{ useDateFormat(item, 'ddd', { locales: 'es-ES' }).value }}
          </p>
          <p class="font-solano text-[24px] leading-[1]">
            {{ useDateFormat(item, 'DD', { locales: 'es-ES' }).value }}
          </p>
        </div>
      </button>
    </div>
    <div class="mb-4">
      <span
        v-if="getNumDay(new Date().getDay()) === states.day"
        class="font-solano uppercase text-[18px]"
      >
        Hoy,
      </span>
      <span class="font-solano uppercase text-[18px]">
        {{ useDateFormat(getSelectedDay, 'DD', { locales: 'es-ES' }).value }}
        {{ ' ' }}
      </span>
      <span class="font-solano uppercase text-[18px]">
        {{ useDateFormat(getSelectedDay, 'MMM', { locales: 'es-ES' }).value }}.
      </span>
    </div>
    <SchedulesStatusLoading v-if="pending" class="h-[280px]" />
    <SchedulesStatusError
      v-else-if="error || Boolean(errorService)"
      :text="
        errorService?.titulo ?? 'Lo sentimos, no pudimos cargar tu horario'
      "
    />
    <SchedulesStatusNoData
      v-else-if="!states.dataStatus || !data?.detalleHorario"
      :text="errorService?.titulo ?? 'No tienes cursos asignados este día'"
    />
    <div v-else class="relative flex flex-col pr-3 lg:pr-4">
      <!-- Hora de clases -->
      <SchedulesGridLayoutMobile
        :hours="hourModified"
        :is-today="getNumDay(new Date().getDay()) === states.day"
      />
      <!-- Grilla de cursos -->
      <div class="w-full">
        <SchedulesCardContainer
          v-for="(course, i) in data?.detalleHorario"
          :key="i"
          :course="course"
          :get-top-and-height="getTopAndHeight"
          mobile
        />
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.datesList {
	@apply grid grid-cols-[repeat(7,_minmax(40px,_1fr))] mb-4 mr-2;
}
.dateList-item {
	@apply flex flex-col lg:flex-row items-center justify-center;
}
.dateList-item-text {
	@apply flex flex-col text-sm text-center py-1 lg:py-2;
}
.isToday {
	@apply bg-[#E50A17] text-white w-full h-full rounded-lg;
}
</style>
