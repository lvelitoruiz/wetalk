<!-- eslint-disable no-undef -->
<!-- eslint-disable vue/require-default-prop -->
<script setup>
import { useElementSize, useNow } from '@vueuse/core'
import { defineProps, ref, onMounted } from 'vue'

const props = defineProps({
  coursesCalendar: Object,
  filter: {
    type: String,
    default: 'Todos',
  },
})
const { y } = useScroll(props.coursesCalendar)
const now = ref(new Date())
const nowMark = useNow()
const el = ref(null)
const { width } = useElementSize(el)

const data = scheduleState()
const getTopStyle = (inicioTime) => {
  const date = getnowMarkour(inicioTime)
  return `${(Number(date) - 7) * 60 - 10}px`
}

onMounted(() => {
  const nowScroll = getnowMarkour(now.value)
  y.value = (nowScroll - 8) * 61.5
})
</script>

<template>
  <div>
    <div
      class="hour-mark"
      :style="{
        top: getTopStyle(nowMark),
      }"
    >
      {{ getHourMinutes(`${nowMark}`) }}
      <div
        class="line"
        :style="{ width: `${width + 10}px` }"
      />
    </div>
    <div
      class="absolute w-full hidden lg:block"
      ref="el"
    >
      <div
        v-for="(x, i) in new Array(17)"
        :key="i"
        class="w-full h-[60px] border-t-[1px] last:border-b-[1px] border-neutral-400 limit"
      />
    </div>
    <ScheduleCardDetail
      v-for="(course, i) in data.coursesSelectedDay(filter)"
      :key="i"
      :course="course"
    />
  </div>
</template>

<style lang="postcss" scoped>
.hour-mark {
  @apply hidden lg:block absolute left-[-55px] z-10 bg-primary-100 rounded-sm px-2 py-[1px] text-sm;
}

.line {
  @apply absolute h-[1.2px] left-full top-[50%] translate-y-[-50%] bg-primary-100;
}

.limit {
  @apply relative after:absolute after:left-[0px] after:content-[''] after:w-[1px] after:h-full after:bg-neutral-400;
}
</style>
