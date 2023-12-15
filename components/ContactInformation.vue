<template>
  <div class="w-full pb-6 lg:pb-0">
    <div class="pb-2">
      <h3 class="text-xl text-[#404040] font-solano font-bold">Datos de contacto</h3>
    </div>
    <div class="grid lg:grid-cols-3 gap-4 w-full">
        <AcademicItem label="Correo Personal" :value="pmail" showIcon />
        <AcademicItem label="Celular" :value="number" />
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  pmail: String,
  number: String,
})
</script>