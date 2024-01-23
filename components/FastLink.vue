<!-- eslint-disable no-undef -->
<!-- eslint-disable vue/require-default-prop -->
<script setup>
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import { defineProps } from 'vue';

const $toast = useToast();

const props = defineProps({
  label: String,
  labelCode: String,
  code: String,
  link: String,
  hasCode: {
    type: [Boolean, String],
    default: false,
  },
});

const copyToClipboard = (code) => {
  if (!navigator.clipboard) {
    $toast.open({
      message: 'No se puede copiar en tu navegador.',
      typeof: 'error',
    });
    return;
  }
  navigator.clipboard
    .writeText(props.code)
    .then(() => {
      $toast.open({
        message: 'Código Copiado!!!',
        typeof: 'success',
      });
    })
    .catch((_err) => {
      $toast.open({
        message: 'Error al copiar código',
        typeof: 'error',
      });
    });
  if (dataLayer) {
    dataLayer.push({
      event: 'Click-CodActivacion',
      name: 'Click-CodActivacion',
      Click_Text: code,
    });
  }
};

const eventClickFastLinks = (text, url) => {
  if (dataLayer) {
    dataLayer.push({
      event: 'Click-LinksRapidos',
      name: 'Click-LinksRapidos',
      Click_Text: text,
      url,
    });
  }
};
</script>
<template>
  <div class="relative w-full h-auto">
    <NuxtLink
      @click="eventClickFastLinks(label, link)"
      class="fastLink"
      :class="{ 'rounded-bl-none': hasCode }"
      :to="link"
      target="_blank"
    >
      <span class="fastLink-label">{{ label }}</span>
      <i class="icon-arrow-right text-white" />
    </NuxtLink>
    <div v-if="code !== ''" class="fastLink-code">
      <span class="block fastLink-code__label">Cód. de activación:</span>
      <div @click="copyToClipboard(code)" class="fastLink-code__activeZone">
        <span class="fastLink-code__activeZone--label">{{ code }}</span>
        <i class="text-[#404040] text-xs icon-file-copy" />
      </div>
    </div>
  </div>
</template>
