<!-- eslint-disable vue/require-default-prop -->
<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  links: Array
})
</script>
<template>
  <div class="sidebarMenu-wrapper">
    <SidebarMenuLink
      v-for="link in links"
      :key="link.id"
      :label="link.label"
      :icon="link.icon"
      :has-sub-menu="link.hasSubMenu"
      :etiqueta="link.etiqueta"
      :url="link.url"
      :sub-menu="link.subMenu"
    />
  </div>
</template>
