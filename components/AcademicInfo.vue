<template>
  <div class="w-full mb-[31px]">
    <div class="pb-2">
      <h3 class="text-xl text-[#404040] font-solano font-bold">Información académica</h3>
    </div>
    <div class="grid lg:grid-cols-3 lg:gap-4 gap-[10px] w-full">
        <AcademicItem label="Institución" :value="inst" />
        <AcademicItem label="Nivel" :value="level" />
        <AcademicItem label="Modalidad" :value="mod" />
        <AcademicItem label="Carrera" :value="carr" />
        <AcademicItem label="Correo" showIcon :value="mail" />
        <AcademicItem label="DNI/CE" :value="dni" />
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  inst: String,
  level: String,
  mod: String,
  carr: String,
  mail: String,
  dni: String,
})

</script>