<template>
    <div class="w-[1023px] mx-auto">
        <div class="flex gap-[28px]">
          <div class="min-w-[65%]">
            <NoteBox />
          </div>
          <div class="flex-col flex gap-7"> 
            <InasistenciasInfo inasistencia="2" :dates="datesInasistencia" />
            <TeacherBox />
            <HelpBox />
          </div>
        </div>
      </div>
</template>

<script setup>

const datesInasistencia = [
    '03/10/2023',
    '05/10/2023'
]

</script>

<style>

</style>