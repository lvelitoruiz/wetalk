<!-- eslint-disable no-undef -->
<!-- eslint-disable @typescript-eslint/no-unsafe-argument -->
<!-- eslint-disable vue/require-default-prop -->
<script setup>
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
import { defineProps } from 'vue'

const props = defineProps({
  dataCompanions: {
    type: Array
  }
})

const $toast = useToast()
const copyToClipboard = (email, student) => {
  if (!navigator.clipboard) {
    $toast.open({
      message: 'No se puede copiar en tu navegador.',
      typeof: 'error'
    })
    return
  }
  navigator.clipboard
    .writeText(email)
    .then(() => {
      $toast.open({
        message: 'Texto Copiado!!!',
        typeof: 'success'
      })
    })
    .catch((_err) => {
      $toast.open({
        message: 'Error al copiar texto',
        typeof: 'error'
      })
    })
  if (dataLayer) {
    dataLayer.push({
      event: 'Click_Copiar',
      name: 'Evento_Click_Copiar',
      titulo_caja: 'Compañeros',
      Click_Text: email,
      titulo: student
    })
  }
}

const capitalizeString = (str) => {
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
</script>
<template>
  <div class="mb-[20px]">
    <BoxContainer color="cyan">
      <h3 class="text-[#404040] text-2xl mb-[12px]">
        <span class="uppercase font-bold font-solano">Compañeros</span>
      </h3>

      <div class="conatiner_students">
        <ul class="scroll-h">
          <li
            v-for="student in dataCompanions"
            :key="student"
            class="flex justify-between mb-[2.5px]"
          >
            <div class="pr-[5px]">
              <span class="font-bold text-[16px] text-[#404040]">{{
                capitalizeString(student.nombreCompleto)
              }}</span>
              <br>
              <span class="text-[#808080] text-[14px]">{{
                student.email
              }}</span>
            </div>
            <i
              class="icon-file-copy text-xl text-[#699A8F cursor-pointer text-[#699A8F]"
              v-if="student.email"
              @click="copyToClipboard(student.email, student.nombreCompleto)"
            />
          </li>
        </ul>
      </div>
    </BoxContainer>
  </div>
</template>
<style scoped>
/* @media screen and (min-width:968px){ */
.scroll-h {
  height: 280px;
  overflow: hidden;
  overflow-y: scroll;
  scrollbar-color: rgba(0, 0, 0, 0.5) rgba(0, 0, 0, 0);
  scrollbar-width: thin;
  padding-right: 8px;
}
.scroll-h::-webkit-scrollbar {
  -webkit-appearance: none;
}

.scroll-h::-webkit-scrollbar:vertical {
  width: 10px;
}

.scroll-h::-webkit-scrollbar-button:increment,
.scroll-h::-webkit-scrollbar-button {
  display: none;
}

.scroll-h::-webkit-scrollbar-thumb {
  background-color: #699a8f;
  border-radius: 20px;
  border: 2px solid #f1f2f3;
}

.scroll-h::-webkit-scrollbar-track {
  border-radius: 10px;
}

/* } */
</style>
