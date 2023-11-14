<template>
  <div class="pb-6 flex flex-col items-start">
    <p class="text-2xl font-bold font-solano text-[#404040] uppercase">{{ name }}</p>
    <div
      class="bg-[#699A8F] px-2 py-[3px] flex items-center gap-1 rounded cursor-pointer"
    >
      <span class="text-white font-zizou-bold font-bold text-sm leaning-none"
        >Cód: {{ code }}</span
      >
      <i class="text-white text-xs icon-file-copy" @click="copyToClipboard"></i>
    </div>
  </div>
</template>

<script setup>

import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

const $toast = useToast();

const props = defineProps({
  name: String,
  code: String
})

const copyToClipboard = () => {
    if (!navigator.clipboard) {
        $toast.open({
            message: "No se puede copiar en tu navegador.",
            typeof: "error",
        });
        return;
    }
    navigator.clipboard.writeText(props.name)
        .then(() => {
            $toast.open({
                message: "Código Copiado!!!",
                typeof: "success",
            });
        })
        .catch(err => {
            $toast.open({
                message: "Error al copiar código",
                typeof: "error",
            });
        });
};

</script>