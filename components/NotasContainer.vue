<template>
  <div class="flex items-center w-[1023px] mx-auto pb-[18px] gap-[6px]">
    <router-link class="text-[#575759] text-[15px] underline" to="/dashboard"
      >Inicio</router-link
    >
    <span class="text-[#575759] text-[15px]">></span>
    <span class="text-[#575759] text-[15px]">Notas</span>
  </div>
  <div class="block lg:flex lg:flex-col gap-6">
    <div class="w-full lg:w-[1023px] mx-auto">
      <div class="block lg:flex gap-[28px]">
        <div class="min-w-[100%] lg:min-w-[65%]">
          <NoteBox />
        </div>
        <div class="flex-col flex gap-7">
          <InasistenciasInfo inasistencia="2" :dates="datesInasistencia" />
          <TeacherBox />
          <HelpBox />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const datesInasistencia = ["03/10/2023", "05/10/2023"];
</script>

<style>
</style>