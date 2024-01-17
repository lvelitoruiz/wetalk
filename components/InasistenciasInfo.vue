<template>
  <div class="flex flex-col gap-[28px] w-full min-w-[30%]">
    <BoxContainer color="green">
      <div class="flex items-center justify-center pb-[18px]">
        <h3 class="text-[#404040] font-solano text-2xl font-normal uppercase">
          Seguimiento de asistencias
        </h3>
      </div>
      <div class="flex items-end justify-center">
        <p class="font-solano text-[56px] leading-[74px] font-bold mr-2">
          {{ inasistencia || 0 }}
        </p>
        <p class="text-[#404040] text-sm font-publicSans font-normal pb-[13px]">
          inasistencias
        </p>
      </div>
      <div
        v-for="(date, index) in dates"
        :key="index"
        class="flex justify-center"
      >
        <p class="text-sm text-[#404040] font-normal font-publicSans block">
          {{ date }}
        </p>
      </div>
    </BoxContainer>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useMenuStore } from '../stores/menu'

const menuStore = useMenuStore()

const inasistencia = ref(0)
const dates = ref(null)

watchEffect(async () => {
  const faltaData = menuStore.getfaltasItems
  if (faltaData) {
    inasistencia.value = faltaData.cantidad
    dates.value = faltaData.fechas
  }
})

// const props = defineProps({
//   inasistencia: Number,
//   dates: Array,
// });
</script>
