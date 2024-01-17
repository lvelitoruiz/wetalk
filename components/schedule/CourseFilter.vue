<!-- eslint-disable vue/require-default-prop -->
<script setup>
import { defineProps, ref } from 'vue'

const props = defineProps({
  selectedCourse: {
    type: String,
    default: 'Todos',
  },
  selectedCourseWeek: {
    type: String,
    default: 'Todos',
  },
  handleCourse: {
    type: Function,
    required: true,
  },
  allCourses: Object,
})
</script>
<template>
  <div class="xl:flex items-center text-center xl:order-3">
    <span class="text-sm text-white">Curso:</span>
    <select
      class="base-select-purple text-[#191919] pl-3 pr-5 py-3 font-solano rounded-full bg-white w-full xl:w-[145px] xl:order-3 xl:ml-4 mt-2 xl:mt-0"
      :value="selectedCourseWeek"
      @change="handleCourse"
    >
      <option
        class="text-[#191919]"
        value="Todos"
        selected
      >
        Todos
      </option>
      <option
        class="text-black"
        v-for="(item, i) in allCourses"
        :value="item.CodCurso"
        :key="i"
      >
        {{ item.DescEspecialCurso }}
      </option>
    </select>
  </div>
</template>
