<template>
  <Breadcrumb page="Notas" />

  <div class="block lg:flex lg:flex-col gap-6">
    <div class="w-full lg:w-[1023px] mx-auto">
      <div class="block lg:flex gap-[28px]">
        <div class="min-w-[100%] lg:min-w-[65%]">
          <NoteBox :show-promedio="true" />
        </div>
        <div class="flex-col flex gap-7">
          <!-- <InasistenciasInfo inasistencia="2" :dates="datesInasistencia" /> -->
          <TeacherBox />
          <HelpBox />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const datesInasistencia = ['03/10/2023', '05/10/2023']
</script>

<style></style>
