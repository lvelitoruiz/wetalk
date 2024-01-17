<!-- eslint-disable no-undef -->
<!-- eslint-disable vue/require-default-prop -->
<script setup>
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
import { defineProps } from 'vue'

const $toast = useToast()
const props = defineProps({
  label: String,
  value: String,
  showIcon: {
    type: Boolean,
    default: false,
  },
})

const copyToClipboard = (label, value) => {
  if (!navigator.clipboard) {
    $toast.open({
      message: 'No se puede copiar en tu navegador.',
      typeof: 'error',
    })
    return
  }
  navigator.clipboard
    .writeText(props.value)
    .then(() => {
      $toast.open({
        message: 'Texto Copiado!!!',
        typeof: 'success',
      })
    })
    .catch((_err) => {
      $toast.open({
        message: 'Error al copiar texto',
        typeof: 'error',
      })
    })
  if (dataLayer) {
    dataLayer.push({
      event: 'Mis_Datos',
      name: 'Evento_Mis_Datos',
      text: label,
      Click_Text: value,
    })
  }
}
</script>

<template>
  <div>
    <p class="text-sm font-sans font-bold text-[#404040]">{{ label }}</p>
    <div class="flex items-center gap-2">
      <p class="text-sm text-[#404040]">{{ value }}</p>
      <span
        class="cursor-pointer"
        v-if="showIcon"
        @click="copyToClipboard(label, value)"
      ><i class="icon-file-copy text-[#699A8F]" /></span>
    </div>
  </div>
</template>

<style></style>
