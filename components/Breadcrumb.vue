<!-- eslint-disable @typescript-eslint/comma-dangle -->
<!-- eslint-disable vue/require-default-prop -->
<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  page: String,
})
</script>

<template>
  <div
    class="hidden lg:flex items-center w-full lg:w-[1023px] mx-auto pb-[18px] gap-[6px]"
  >
    <router-link
      class="text-[#575759] text-[15px] underline"
      to="/dashboard"
    >
      Inicio
    </router-link>
    <span class="text-[#575759] text-[15px]">></span>
    <span class="text-[#575759] text-[15px]"> {{ page }} </span>
  </div>
  <div class="lg:hidden flex items-center w-full mx-auto pb-[18px] gap-[6px]">
    <i class="icon-arrow-right rotate-180" />
    <router-link
      class="text-[#575759] text-[15px] underline"
      to="/dashboard"
    >
      Atrás
    </router-link>
  </div>
</template>

<style></style>
