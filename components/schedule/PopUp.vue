<!-- eslint-disable no-undef -->
<!-- eslint-disable vue/require-default-prop -->
<script setup>
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';
import sedes from '~/utils/locales.json';
import { defineProps, ref, onMounted } from 'vue';

const props = defineProps({
  course: Object,
  closePopup: Function,
  positionX: Number,
  daily: {
    type: Boolean,
    default: false,
  },
});
const store = scheduleState();
const listP = store.sessions;
const breakpoints = useBreakpoints(breakpointsTailwind);
const smallerThanLg = breakpoints.smaller('lg');
const target = ref(null);
onClickOutside(target, () => props.closePopup());
</script>
<template>
  <div
    ref="target"
    class="popup-schedule"
    :class="{
      'mobile-popup': smallerThanLg,
      'lg:right-[-268px]': positionX < 4,
      'lg:left-[-268px]': positionX >= 4,
      'lg:top-0': getHour(course.HoraInicioSesion) < 19 && !daily,
      'lg:bottom-0': getHour(course.HoraInicioSesion) >= 19,
      'lg:top-3': getHour(course.HoraInicioSesion) < 19 && daily,
    }"
  >
    <button @click.stop="closePopup">
      <NuxtIcon
        class="close-schedule-popup"
        name="navClose"
      />
    </button>
    <div class="p-5 pt-0 grid grid-cols-2">
      <h4
        class="card-title-popup"
        :title="course.DescEspecialCurso"
      >
        {{ course.DescEspecialCurso }}
      </h4>
      <div class="text-content col-span-2">
        <p class="text-[#808080] leading-[1]">Sección:</p>
        <p class="leading-[1]">
          {{ course.Seccion }}
        </p>
      </div>
      <div class="text-content col-span-2">
        <p class="text-[#808080] leading-[1]">Horario:</p>
        <p class="leading-[1]">
          {{ getHourMinutes(course.HoraInicioSesion) }} a
          {{ getHourMinutes(course.HoraTerminoSesion) }}
        </p>
      </div>
      <div class="text-content col-span-2">
        <p class="text-[#808080] leading-[1]">Campus:</p>
        <p class="leading-[1]">{{ sedes[course.CodLocal] }}</p>
      </div>
      <div class="text-content col-span-2">
        <p class="text-[#808080] leading-[1]">Aula:</p>
        <p class="leading-[1]">{{ course.CodAula }}</p>
      </div>
      <div class="text-content col-span-2">
        <p class="text-[#808080] leading-[1] col-span-2">Profesor:</p>
        <div
          v-if="Boolean(listP[course.IdSesion].docentes.length)"
          class="leading-[1]"
        >
          <template
            v-for="(docente, k) in listP[course.IdSesion].docentes"
            :key="k"
          >
            {{ docente
            }}{{
              k === listP[course.IdSesion].docentes.length - 1 ? '' : ','
            }}&nbsp;
          </template>
        </div>
        <p
          v-else
          class="leading-[1]"
        >
          -
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.popup-schedule {
  @apply bg-white lg:absolute shadow-[0px_1px_20px_0px_#BFBFBF] z-20 w-[266px] rounded lg:cursor-auto;
}
.close-schedule-popup {
  @apply text-primary text-[16px] absolute right-2 top-2 leading-[1] font-[600];
}
.popup-schedule.mobile-popup {
  @apply fixed bottom-0 left-0 right-0 w-full z-[110] rounded-t-[15px];
  animation-duration: 0.2s;
  animation-name: animate-entrance;
}
.mobile-popup .close-schedule-popup {
  @apply right-4 top-4 text-[16px];
}
.card-title-popup {
  @apply font-solano text-lg lg:text-[20px] text-primary mb-4 lg:mb-2 leading-[1] break-words col-span-2;
}

.text-content {
  @apply text-[14px] mb-2 flex gap-1 font-[400];
}

@keyframes animate-entrance {
  0% {
    opacity: 0;
    transform: translateY(100%);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
