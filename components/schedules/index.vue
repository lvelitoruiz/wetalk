<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core';

defineProps<{
	pending: boolean;
	errorService: { titulo: string } | null;
	error: Error | null;
}>();

const isLargeScreen = useMediaQuery('(min-width: 1024px)');
const selectedCourseWeek = ref('Todos');
const today = new Date().getDay();
const currentDay = (today + 6) % 7;

const states = scheduleState();
states.setDay(currentDay);

const handleDay = (day: number) => states.setDay(day);

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
				:activeWeek="`${
					useDateFormat(getWeekDates().Monday, 'DD MMMM', { locales: 'es-ES' })
						.value
				} - ${useDateFormat(getWeekDates().Sunday, 'DD MMMM', { locales: 'es-ES' }).value}`"
			/>
			<SchedulesCourseFilter
				v-if="isLargeScreen"
				:selectedCourseWeek="selectedCourseWeek"
				:handleCourse="states.handleFilter"
				:filteredCourses="states.filter"
			/>
		</div>
		<SchedulesBoardDesktop
			v-if="isLargeScreen"
			:pending="pending"
			:errorService="errorService"
			:error="error"
		/>
		<SchedulesBoardMobile
			v-else
			:data="states.fullWeek[states.day] ?? null"
			:day="states.day"
			:handleDay="handleDay"
			:pending="pending"
			:errorService="errorService"
			:error="error"
		/>
		<div class="lg:pt-5 text-sm">
			<div class="flex">
				<p class="mr-[13px] before:bg-[#FDBA30] disclaimer">Curso Presencial</p>
				<p class="mb-4 before:bg-[#00B9FF] disclaimer">Curso Remoto</p>
			</div>
			<p class="leading-[1]">
				*Para dudas con los horarios, consúltalo en
				<a
					class="text-blue_link underline"
					href="https://contacto.upn.edu.pe/"
					target="_blank"
					@click="eventClick"
				>
					Contacto UPN</a
				>, con nuestros “accesos rápidos”, o comunícate con nosotros en los
				medios de contacto ubicados en el botón del menú “¿Necesitas ayuda?”.
			</p>
		</div>
	</div>
</template>

<style lang="postcss" scoped>
.controls-container {
	@apply bg-[#5598FF] rounded-t-[14px] gap-x-3 gap-y-4 flex flex-col xl:flex-row justify-between px-3 py-4 lg:px-6 lg:py-5 -mx-[12px] lg:mx-0;
}

.disclaimer {
	@apply before:inline-block before:w-[10px] before:h-[10px] before:rounded-full;
}
</style>
