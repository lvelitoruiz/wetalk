<script setup lang="ts">
import type { DetalleHorario } from '~/types/cursos.types';
defineProps<{
  course: DetalleHorario
  popupIsVisible: boolean
}>();

const getDiff = (init: string, fin: string) => {
  const timeArrFin = fin.split(':');
  const timeArrInit = init.split(':');
  return (
    Number(timeArrFin[0]) * 60 +
		Number(timeArrFin[1]) -
		(Number(timeArrInit[0]) * 60 + Number(timeArrInit[1]))
  );
};
</script>

<template>
  <div
    class="card-container before:bg-primary"
    role="button"
    tabindex="1"
  >
    <span class="text-[0.625rem]">
      {{ course.horaInicio.slice(0, 5) }} - {{ course.horaFin.slice(0, 5) }}
    </span>
    <p
      class="font-bold text-xs leading-[1] break-words capitalize"
      :class="{ truncate: getDiff(course.horaInicio, course.horaFin) <= 60 }"
    >
      {{ course.descripMateria }}
    </p>
    <p
      v-if="getDiff(course.horaInicio, course.horaFin) > 60"
      class="text-neutral text-[0.625rem] leading-[1] pt-2"
    >
      {{ course.codMateria }}
    </p>
    <div
      v-if="course.descripMetodoEducativo === 'Virtual' || course.codAula"
      class="mt-auto flex gap-1"
    >
      <div
        class="text-[0.725rem] text-black text-center font-telegraf font-extrabold pt-1"
      >
        {{
          course.descripMetodoEducativo === 'Virtual'
            ? 'Blackboard'
            : course.codAula
        }}
      </div>
    </div>
    <div
      class="absolute right-0 bottom-0"
      :class="{ 'bg-[#A9616D] rounded-[4px]': popupIsVisible }"
    >
      <nuxt-icon
        class="text-[#A9616D] text-xl"
        :class="{ 'text-white': popupIsVisible }"
        name="defaultDia"
      />
    </div>
  </div>
</template>
<style lang="postcss" scoped>
.card-container {
	@apply relative flex flex-col bg-white pl-[10px] pr-[8px] py-2 before:content-[''] w-full h-full before:absolute rounded-[4px] overflow-hidden
	shadow-[0px_2px_8px_0px_rgba(0,_0,_0,_0.15)] before:left-0 before:top-0 before:h-full before:w-[5px] before:rounded-l-sm;
}
</style>
