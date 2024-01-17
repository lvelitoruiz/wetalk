<!-- eslint-disable vue/require-default-prop -->
<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  title: String,
  text: String,
})
</script>
<template>
  <div
    class="rounded-[5px] mt-[24px] relative bg-[#D9D9D9] px-2 py-1 text-xs leading-4 font-publicSans inline-block before:block before:border-[10px] before:border-t-0 before:border-b-[15px] before:border-x-[transparent] before:border-b-[#D9D9D9] before:border-t-[transparent] before:absolute before:-mt-5 before:h-5 before:w-5 z-10"
  >
    <p>{{ title }}</p>
    <p>{{ text }}</p>
  </div>
</template>
