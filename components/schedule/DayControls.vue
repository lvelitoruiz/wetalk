<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  day: {
    type: Number,
    default: 0
  },
  sessionDate: {
    type: String,
    required: true
  },
  courses: {
    type: Array,
    required: true
  },
  handleChange: {
    type: Function,
    required: true
  },
  active: {
    type: Boolean,
    default: false
  }
})
</script>
<template>
  <div class="col-span-2 flex items-center justify-center xl:order-1">
    <button
      aria-label="Icon left"
      class="xl:px-1 pr-1"
      @click="handleChange(-1)"
      :disabled="day <= 0 || active"
      :class="day <= 0 || active ? 'text-transparent' : 'text-neutral-1'"
    >
      <nuxt-icon
        class="text-[14px] no-fill"
        name="left"
      />
    </button>
    <span class="font-solano text-2xl xl:text-[20px] text-white text-center">
      {{ dayDescription(sessionDate) }}
    </span>
    <button
      aria-label="Icon right"
      class="xl:px-1 pl-1"
      @click="handleChange(1)"
      :disabled="day >= courses.length - 1 || active"
      :class="
        day >= courses.length - 1 || active
          ? 'text-transparent'
          : 'text-neutral-1'
      "
    >
      <nuxt-icon
        class="text-[14px] no-fill"
        name="right"
      />
    </button>
  </div>
</template>
