<script setup lang="ts">
const props = withDefaults(
	defineProps<{
		selectedCourseWeek: string;
		handleCourse: (e: any) => void;
		filteredCourses: any;
	}>(),
	{
		selectedCourseWeek: 'Todos',
		handleCourse: () => {},
		filteredCourses: null,
	},
);
const handleSelect = (e: any) => {
	props.handleCourse(e.target.value);
	if (window.dataLayer) {
		window.dataLayer.push({
			event: 'Click/Select-Horario',
			section: 'Filtro curso',
			title: e.target.value,
		});
	}
};

const eventClick = () => {
	if (window.dataLayer) {
		window.dataLayer.push({
			event: 'Click/Select-Horario',
			title: 'Focus en filtro',
		});
	}
};
</script>
<template>
	<div class="flex items-center text-center justify-center">
		<label class="text-sm text-white" for="filter">Ver:</label>
		<select
			id="filter"
			class="base-select-purple text-[#404040] pl-3 pr-5 py-2 font-publicSans bg-white w-full lg:w-[200px] lg:ml-4 mt-2 lg:mt-0"
			:value="selectedCourseWeek"
			@focus="eventClick"
			@change="handleSelect"
		>
			<option value="Todos" selected>Todos los cursos</option>
			<option
				v-for="(item, i) in filteredCourses"
				:key="i"
				class="text-black"
				:value="item.CodCurso"
			>
				{{ item.DescEspecialCurso }}
			</option>
		</select>
	</div>
</template>
