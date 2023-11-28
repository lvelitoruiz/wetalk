<template>
  <div>
    <p class="text-sm font-sans font-bold text-[#404040]">{{ label }}</p>
    <div class="flex items-center gap-2">
      <p class="text-sm text-[#404040]">{{ value }}</p>
      <span class="cursor-pointer" v-if="showIcon" @click="copyToClipboard"><i class="icon-file-copy text-[#699A8F]"></i></span>
    </div>
  </div>
</template>

<script setup>

import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

const $toast = useToast();

const props = defineProps({
  label: String,
  value: String,
  showIcon: {
    type: Boolean,
    default: false
  }
});

const copyToClipboard = () => {
  if (!navigator.clipboard) {
    $toast.open({
      message: "No se puede copiar en tu navegador.",
      typeof: "error",
    });
    return;
  }
  navigator.clipboard.writeText(props.value)
    .then(() => {
      $toast.open({
        message: "Texto Copiado!!!",
        typeof: "success",
      });
    })
    .catch(err => {
      $toast.open({
        message: "Error al copiar texto",
        typeof: "error",
      });
    });
};

</script>

<style></style>