<!-- eslint-disable vue/require-default-prop -->
<script setup>
import { defineProps, ref } from 'vue'

const props = defineProps({
  course: Object,
  isRepeated: Function,
  getTopAndHeight: Function,
  allCourses: Object,
  selectedCourse: String,
  positionX: Number,
})

const popupIsVisible = ref(false)
const showPopup = () => {
  popupIsVisible.value = true
}
const hidePopup = () => {
  popupIsVisible.value = false
}
</script>
<template>
  <div
    class="absolute w-[95%] ml-[1px]"
    v-if="
      isRepeated(course.IdSesion, course.NombresImag, course.ApePatImag) &&
        (allCourses[course.CodCurso].state || selectedCourse === 'Todos')
    "
    :style="getTopAndHeight(course.HoraInicioSesion, course.HoraTerminoSesion)"
  >
    <ScheduleCardCourseWeek
      v-if="showPopup"
      @click="showPopup"
      :course="course"
      :popup-is-visible="popupIsVisible"
    />
    <SchedulePopUp
      v-if="popupIsVisible"
      :close-popup="hidePopup"
      :course="course"
      :position-x="positionX"
    />
  </div>
</template>
