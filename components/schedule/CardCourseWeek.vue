<!-- eslint-disable no-undef -->
<!-- eslint-disable vue/require-default-prop -->
<script setup>
import sedes from '~/utils/locales.json'
import { defineProps } from 'vue'

defineProps({
  course: Object,
  popupIsVisible: Boolean,
})

const store = scheduleState()
const listP = store.sessions
</script>

<template>
  <div
    class="card-container"
    role="button"
    tabindex="1"
  >
    <div class="overflow-hidden px-2">
      <h4
        class="card-title-week"
        :title="course.DescEspecialCurso"
      >
        {{ course.DescEspecialCurso }}
      </h4>
      <div class="text-[0.7rem] mb-1">
        <p class="text-secondary-400 leading-[1]">Sección:</p>
        <p class="leading-[1]">
          {{ course.Seccion }}
        </p>
      </div>
      <div class="text-[0.7rem] mb-1">
        <p class="text-secondary-400 leading-[1]">Horario:</p>
        <p class="leading-[1]">
          {{ getHourMinutes(course.HoraInicioSesion) }} a
          {{ getHourMinutes(course.HoraTerminoSesion) }}
        </p>
      </div>
      <div class="text-[0.7rem] mb-1">
        <p
          class="text-secondary-400 leading-[1]"
          :class="{
            'inline-block': !Boolean(listP[course.IdSesion].docentes.length),
          }"
        >
          Profesor:
        </p>
        <span v-if="!Boolean(listP[course.IdSesion].docentes.length)"> -</span>
        <p v-else-if="listP[course.IdSesion].docentes.length === 1">
          {{ listP[course.IdSesion].docentes[0] }}
        </p>
        <div
          v-else
          class="leading-[1.1]"
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
      </div>
      <div class="text-[0.7rem] mb-1">
        <p class="text-secondary-400 leading-[1]">Campus:</p>
        <p class="leading-[1]">{{ sedes[course.CodLocal] }}</p>
      </div>
      <div class="text-[0.7rem] mb-1">
        <p class="text-secondary-400 leading-[1]">Aula:</p>
        <p class="leading-[1]">{{ course.CodAula }}</p>
      </div>
    </div>
    <div
      class="mt-auto ml-auto mr-[2px] lg:mr-1 text-primary rounded-[4px] hover:bg-[#E50A17] hover:text-[#FFFFFF]"
      :class="{ 'bg-[#E50A17] !text-[#FFFFFF]': popupIsVisible }"
    >
      <NuxtIcon
        class="text-[20px]"
        name="defaultDia"
      />
    </div>
  </div>
</template>
<style lang="postcss" scoped>
.card-container {
  @apply relative flex flex-col bg-neutral-1 pt-2 pb-1 before:content-[''] w-full h-full before:absolute rounded-[4px]
    before:left-0 before:top-0 before:h-full before:w-[2px] before:bg-secondary-400 before:rounded-l-sm;
}

.card-title-week {
  @apply font-solano text-primary text-xs mb-2 leading-[1] break-words;
}

.separador {
  @apply relative after:absolute after:w-[90%] after:h-[0.5px] after:left-1
    after:-top-[1px] after:bg-neutral-1;
}
</style>

<style lang="postcss">
.arrow-prof-icon svg {
  @apply max-w-[8px] w-full h-full;
}
</style>
