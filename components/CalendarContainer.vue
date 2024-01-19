<script setup ts></script>
<template>
  <div class="flex items-center w-[1023px] mx-auto pb-[18px] gap-[6px]">
    <router-link
      class="text-[#575759] text-[15px] underline"
      to="/calendar"
    >
      Inicio
    </router-link>
    <span class="text-[#575759] text-[15px]">></span>
    <span class="text-[#575759] text-[15px]">Calendario</span>
  </div>
  <div class="flex flex-col gap-6">
    <div class="w-[1023px] mx-auto">
      <div class="flex gap-[28px]">
        <CalendarBox />
        <HelpBox />
      </div>
    </div>
  </div>
</template>
