<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core';

defineProps<{
  pending: boolean
  errorService: { titulo: string } | null
  error: Error | null
}>();

const isLargeScreen = useMediaQuery('(min-width: 1024px)');
const selectedCourseWeek = ref('Todos');
const today = new Date().getDay();
const currentDay = (today + 6) % 7;

const states = scheduleState();
states.setDay(currentDay);

const handleDay = (day: number) => { states.setDay(day); };

const eventClick = () => {
  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'Click-Horario',
      url: 'https://contacto.upn.edu.pe/',
      title: 'Contacto UPN',
    });
  }
};
</script>

<template>
  <div>
    <div class="controls-container">
      <SchedulesDayControls
        :active-week="`${
          useDateFormat(getWeekDates().Monday, 'DD MMMM', { locales: 'es-ES' })
            .value
        } - ${useDateFormat(getWeekDates().Sunday, 'DD MMMM', { locales: 'es-ES' }).value}`"
      />
    </div>
    <SchedulesBoardDesktop
      v-if="isLargeScreen"
      :pending="pending"
      :error-service="errorService"
      :error="error"
    />
    <SchedulesBoardMobile
      v-else
      :data="states.fullWeek[states.day] ?? null"
      :day="states.day"
      :handle-day="handleDay"
      :pending="pending"
      :error-service="errorService"
      :error="error"
    />
  </div>
</template>

<style lang="postcss" scoped>
.controls-container {
	@apply bg-[#5598FF] rounded-t-[14px] gap-x-3 gap-y-4 flex flex-col xl:flex-row justify-between px-3 py-4 lg:px-6 lg:py-5 lg:mx-0;
}

.disclaimer {
	@apply before:inline-block before:w-[10px] before:h-[10px] before:rounded-full;
}
</style>
