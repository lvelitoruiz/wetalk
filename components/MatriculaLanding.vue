<!-- eslint-disable no-undef -->
<!-- eslint-disable vue/valid-define-emits -->
<script setup>
import { defineEmits } from 'vue'

const emit = defineEmits()

const triggerModal = (text) => {
  emit('modal-open')
  if (dataLayer) {
    dataLayer.push({
      event: 'Mas_Informacion',
      name: 'Evento_Mas_Informacion',
      Click_text: text
    })
  }
}
</script>

<template>
  <div
    class="container mx-auto flex items-center justify-between flex-col lg:flex-row"
  >
    <img
      class="hidden lg:block w-full md:w-fit md:h-[271px]"
      src="@/assets/images/frames.svg"
      alt=""
    >
    <div
      class="flex flex-col mt-6 lg:mt-0 gap-4 text-center items-center lg:text-end lg:items-end"
    >
      <h3 class="uppercase text-[32px] font-solano font-bold">
        ¿Aún no estás matriculado?
      </h3>
      <p class="max-w-[492px] font-publicSans">
        Únete a más de miles de egresados de WeTALK que abrieron las puertas a
        su próxima beca, maestría o trabajo en el extranjero.
      </p>
      <Button
        label="Más información"
        secundary
        @click="triggerModal('Más información')"
      />
    </div>
  </div>
</template>

<style></style>
