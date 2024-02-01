<script setup lang="ts">
import { useNow, useDateFormat } from '@vueuse/core';

defineProps<{
  pending: boolean
  errorService: { titulo: string } | null
  error: Error | null
}>();

const hours = ref({
  '07': 72,
  '08': 72,
  '09': 72,
  10: 72,
  11: 72,
  12: 72,
  13: 72,
  14: 72,
  15: 72,
  16: 72,
  17: 72,
  18: 72,
  19: 72,
  20: 72,
  21: 72,
  22: 72,
  23: 72,
  24: 0,
});

const states = scheduleState();
const nowMark = useNow();

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
  const timeArrInit = init.split(':');
  const hCard = 72;
  const height = getDiff(init, fin) * (hCard / 60) - 2;
  let top = 0;
  Object.keys(hours.value)
    .sort()
    .forEach((item) => {
      if (Number(item) < Number(timeArrInit[0])) {
        top = top + hCard;
      }
    });

  if (Number(Number(timeArrInit[1])) / 60 > 0) { top = top + Number(timeArrInit[1]) * (hCard / 60); }
  return {
    top: `${top + 11}px`,
    height: `${height}px`,
  };
};

const currentDay = (getDay(new Date()) + 6) % 7;

onBeforeUnmount(() => {
  states.handleFilter('Todos');
});
</script>

<template>
  <div class="flex flex-col pl-1 pr-5 lg:py-4 bg-white rounded-b-[14px] shadow-[0_10px_6px_0_rgba(0,0,0,0.05)]">
    <!-- Días de la semana -->
    <div ref="datesList" class="datesList">
      <div v-for="(day, i) in getWeekDates()" :key="i" class="dateList-item">
        <div
          class="dateList-item-text"
          :class="{ isToday: day.getDay() === new Date().getDay() }"
        >
          <p class="font-solano text-[20px] mb-1 uppercase">
            {{ useDateFormat(day, 'ddd', { locales: 'es-ES' }).value }}
          </p>
          <p class="font-solano text-[24px] leading-[1]">
            {{ useDateFormat(day, 'DD', { locales: 'es-ES' }).value }}
          </p>
        </div>
      </div>
    </div>
    <SchedulesStatusLoading v-if="pending" class="h-[280px]" />
    <SchedulesStatusError
      v-else-if="error || Boolean(errorService)"
      :text="
        errorService?.titulo || 'Lo sentimos, no pudimos cargar tu horario'
      "
    />
    <SchedulesStatusNoData
      v-else-if="!states.dataStatus"
      :text="errorService?.titulo || 'No tienes cursos asignados esta semana'"
    />
    <div v-else class="calendar-container">
      <!-- Hora de clases -->
      <div ref="listHours" class="hours-container relative">
        <div class="h-[10px] border-[#A6A6A6]"></div>
        <div
          v-for="(hour, i) in Object.keys(hours!).sort()"
          :key="hour"
          class="relative border-r-[1px] border-[#A6A6A6]"
          :class="{
            'h-[62px] lg:h-[72px]': i !== Object.keys(hours!).length - 1,
          }"
        >
          <div class="leading-[1] text-xs absolute top-[-10px] lg:top-[-10px]">
            {{ hour === '24' ? '00' : hour }}:00
          </div>
        </div>
        <div class="lg:h-[5px]"></div>
      </div>
      <!-- Grilla de cursos -->
      <div class="calendar-grid relative">
        <div v-for="(item, ix) in states.fullWeek" :key="item" class="relative">
          <div class="absolute top-0 w-full h-full">
            <div class="h-[10px] border-b-[1px] border-[#A6A6A6]"></div>
            <!-- cuadros horas y marca de hora actual -->
            <SchedulesGridLayoutDesktop
              v-for="(hour, i) in Object.keys(hours!).sort()"
              :key="hour"
              :hours="hours"
              :hour="hour"
              :row-number="i"
              :column-number="ix"
              :height-box="72"
              :now-mark="nowMark"
              :current-day="currentDay"
            />
            <div class="lg:h-[5px]"></div>
          </div>
          <!-- card -->
          <template v-if="!item?.empty">
            <template v-for="(course, i) in item.detalleHorario" :key="i">
              <SchedulesCardContainer
                :course="course"
                :get-top-and-height="getTopAndHeight"
                :position-x="ix"
              />
            </template>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.datesList {
	@apply ml-[40px] grid grid-cols-[repeat(7,_minmax(73px,_1fr))] mb-2 overflow-hidden;
}
.dateList-item {
	@apply flex flex-col lg:flex-row items-center justify-center;
}
.dateList-item-text {
	@apply flex flex-col text-sm text-center py-2;
}
.isToday {
	@apply bg-[#E50A17] text-white w-full h-full rounded-lg;
}
.calendar-container {
	@apply relative grid grid-cols-[40px_1fr] w-full;
}
.hours-container {
	@apply mb-[25px] overflow-hidden;
}
.calendar-grid {
	@apply grid grid-cols-[repeat(7,_minmax(73px,_1fr))];
}
</style>
