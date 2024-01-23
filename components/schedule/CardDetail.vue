<!-- eslint-disable no-undef -->
<script setup>
import sedes from '~/utils/locales.json';
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';
import { defineProps, ref } from 'vue';
import { getFullname } from '~/utils/setFormatName';

const props = defineProps({
  course: {
    type: Object,
    required: true,
  },
});

const store = scheduleState();
const listP = store.sessions;
const breakpoints = useBreakpoints(breakpointsTailwind);
const smallerThanLg = breakpoints.smaller('lg');
const courseDuration = (init, fin) => {
  return getHour(fin) - getHour(init);
};

const getTopStyle = (inicioTime) => {
  const date = getHour(inicioTime);
  return `${(Number(date) - 7) * 60 + 1}px`;
};

const popupIsVisible = ref(false);
const showPopup = () => {
  popupIsVisible.value = true;
};
const hidePopup = () => {
  popupIsVisible.value = false;
};

const isRepeated = (session, name, lastname) => {
  const professors = listP[session].docentes;
  if (professors.length === 0) return true;
  const fullname = getFullname(name, lastname);
  return professors.indexOf(fullname) === 0;
};
</script>
<template>
  <div
    v-if="isRepeated(course.IdSesion, course.NombresImag, course.ApePatImag)"
    @click="showPopup"
    :role="smallerThanLg ? 'div' : 'button'"
    :tabindex="smallerThanLg ? 1 : ''"
    class="card-sc-course-detail"
    :class="{
      'lg:h-[58px] lg:flex lg:items-center':
        courseDuration(course.HoraInicioSesion, course.HoraTerminoSesion) === 1,
      'lg:h-[118px]':
        courseDuration(course.HoraInicioSesion, course.HoraTerminoSesion) === 2,
      'lg:h-[178px]':
        courseDuration(course.HoraInicioSesion, course.HoraTerminoSesion) === 3,
      'lg:h-[238px]':
        courseDuration(course.HoraInicioSesion, course.HoraTerminoSesion) === 4,
    }"
    :style="{
      top: getTopStyle(course.HoraInicioSesion),
    }"
  >
    <h3
      class="title-curso"
      :title="course.DescEspecialCurso"
    >
      {{ course.DescEspecialCurso }}
    </h3>
    <div
      :class="{
        'one-hour-course':
          courseDuration(course.HoraInicioSesion, course.HoraTerminoSesion) ===
          1 && !smallerThanLg,
        'two-hours-course':
          courseDuration(course.HoraInicioSesion, course.HoraTerminoSesion) ===
          2 && !smallerThanLg,
        'more-hours-course':
          courseDuration(course.HoraInicioSesion, course.HoraTerminoSesion) >=
          3 || smallerThanLg,
      }"
      class="card-content"
    >
      <p>
        <span class="text-secondary-400">Sección:</span> {{ course.Seccion }}
      </p>
      <p>
        <span class="text-secondary-400">Horario:</span>
        {{ getHourMinutes(course.HoraInicioSesion) }} -
        {{ getHourMinutes(course.HoraTerminoSesion) }}
      </p>
      <p><span class="text-secondary-400">Aula:</span> {{ course.CodAula }}</p>
      <p>
        <span class="text-secondary-400">Campus:</span>
        {{ sedes[course.CodLocal] }}
      </p>
      <p>
        <span class="text-secondary-400">Profesor: </span>
        <span v-if="Boolean(listP[course.IdSesion].docentes.length)">
          <template
            v-for="(docente, k) in listP[course.IdSesion].docentes"
            :key="k"
          >
            {{ docente
            }}{{
              k === listP[course.IdSesion].docentes.length - 1 ? '' : ','
            }}&nbsp;
          </template>
        </span>
        <span v-else>-</span>
      </p>
    </div>
    <div
      class="hidden lg:block absolute text-primary mt-auto ml-auto mr-[2px] lg:mr-1 bottom-2 right-1 rounded-[4px] hover:bg-[#E50A17] hover:text-[#FFFFFF]"
      :class="{ 'bg-[#E50A17] !text-[#FFFFFF]': popupIsVisible }"
    >
      <NuxtIcon
        class="text-[20px]"
        name="defaultDia"
      />
    </div>
    <SchedulePopUp
      v-if="popupIsVisible && !smallerThanLg"
      :close-popup="hidePopup"
      :course="course"
      class="lg:right-[-10%]"
      daily
    />
  </div>
</template>

<style lang="postcss" scoped>
.card-sc-course-detail {
  @apply px-3 py-4 lg:w-[90%] ml-[2px] border-l-[4px] border-secondary-400 lg:absolute bg-neutral-1 mb-3 lg:mb-0 rounded;
}

.card-content {
  font-size: 12px !important;
}

.card-sc-course-detail .title-curso {
  @apply font-solano text-sm uppercase leading-[1] text-primary lg:whitespace-nowrap mb-4 lg:mb-0 lg:mr-6;
}

.card-sc-course-detail .content {
  @apply grid grid-cols-3 lg:block gap-4 text-xs;
}

.one-hour-course {
  @apply truncate mr-4;
}

.one-hour-course p {
  @apply mr-5 inline;
}

.two-hours-course {
  @apply truncate mr-4 xl:grid xl:grid-cols-4 xl:mt-4 xl:gap-y-1 xl:mr-0;
}

.two-hours-course p {
  @apply lg:mr-5 lg:inline xl:block xl:mr-0 xl:last:col-span-4;
}

.more-hours-course {
  @apply grid grid-cols-2 lg:grid-cols-4 mt-4 gap-y-1 gap-x-2;
}

.more-hours-course p {
  @apply last:col-span-2 lg:last:col-span-4;
}
</style>
