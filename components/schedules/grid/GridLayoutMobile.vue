<script setup lang="ts">
import { useNow } from '@vueuse/core';
const props = defineProps<{
  hours: Record<string, number>
  isToday: boolean
}>();

const nowMark = useNow();
const getTopStyle = (currentHour: string) => {
  const hourH = Number(props.hours[currentHour]);
  const fromTop = (hourH / 60) * nowMark.value.getMinutes() - 10;
  return fromTop;
};
</script>

<template>
  <div>
    <!-- Marca de hora de 00 a 07 am -->
    <div v-if="nowMark.getHours() < 7 && isToday">
      <div class="hour-mark" :style="{ top: `-10px` }">
        {{ getHourMinutes(nowMark) }}
      </div>
      <div class="line" :style="{ top: `0px` }"></div>
    </div>
    <div v-for="hour in Object.keys(hours).sort()" :key="hour">
      <div
        class="relative flex leading-[1] lg:pr-3 text-[14px]"
        :style="{ height: `${hours[hour]}px` }"
      >
        <p class="w-[40px] absolute -top-[8px] bg-white text-xs">
          {{ hour === '24' ? '00' : hour }}:00
        </p>
        <div
          class="w-full h-[1px] border-b-disable border-b-[1px] border-dashed"
        >
          <div
            v-if="
              Number(hour) === nowMark.getHours() &&
                nowMark.getHours() >= 7 &&
                isToday
            "
            class="hour-mark"
            :style="{ top: `${getTopStyle(hour) + 1}px` }"
          >
            {{ getHourMinutes(nowMark) }}
          </div>
          <div
            v-if="
              Number(hour) === nowMark.getHours() &&
                nowMark.getHours() >= 7 &&
                isToday
            "
            class="line"
            :style="{ top: `${getTopStyle(hour) + 10}px` }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.hour-mark {
	@apply absolute left-[-5px] z-[15] bg-[#FEB6C2] text-[#A9616D] font-bold rounded-sm px-1 py-[1px] text-xs;
}

.line {
	@apply absolute left-0 h-[1px] w-full bg-[#FEB6C2] z-[10];
}
</style>
