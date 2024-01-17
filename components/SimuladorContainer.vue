<template>
  <div class="flex items-center w-[1023px] mx-auto pb-[18px] gap-[6px]">
    <router-link
      class="text-[#575759] text-[15px] underline"
      to="/dashboard"
    >
      Inicio
    </router-link>
    <span class="text-[#575759] text-[15px]">></span>
    <span class="text-[#575759] text-[15px]">Notas</span>
  </div>
  <div class="flex flex-col gap-6">
    <div class="w-[1023px] mx-auto">
      <div class="flex gap-[28px]">
        <div class="min-w-[65%]">
          <SimuladorBox />
        </div>
        <div class="flex-col flex gap-7">
          <InasistenciasInfo
            inasistencia="2"
            :dates="datesInasistencia"
          />
          <TeacherBox />
          <HelpBox />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const datesInasistencia = ['03/10/2023', '05/10/2023'];
</script>

<style></style>
