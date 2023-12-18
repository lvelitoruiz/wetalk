<script setup>
import { ref } from "vue";

const props = defineProps({
  label: String,
  icon: String,
  link: String,
  url: String,
  etiqueta: String,
  hasSubMenu: Boolean,
  subMenu: Array,
});

let isActive = ref(false);

const handleActivation = (label) => {
  isActive.value = !isActive.value;
  if(dataLayer){
    dataLayer.push({
      event: 'Click-BarraLateral',
      'name': 'Click-BarraLateral',
      'Click_Text': label
    })
  }
};

const eventClickSubMenu = (url, name) => {
    if(dataLayer){
        dataLayer.push({
           event: 'Click-SubBarraLateral',
           'name': 'Click-SubBarraLateral',
           'url': url,
           'Click_Text': name
        })
    }
};

const getIconClass = () => {
  return {
    'icon-home': props.etiqueta === "inicio",
    'icon-book-open': props.etiqueta === "curso",
    'icon-creditcard': props.etiqueta === "pagos",
    'icon-user-chat': props.etiqueta === "networking",
    'icon-puzzle': props.etiqueta === "beyond_wetalk",
  };
};
</script>
<template>
  <div class="relative">
    <a class="sidebarMenu-link" :class="{ 'text-[#0043AA]' : isActive }" @click="handleActivation(label)" :href="url" style="padding-left: 1.75em;">
      <div class="sidebarMenu-label">
        <i class="sidebarMenu-label__icon" :class="getIconClass()"></i>
        <!-- <img class="mr-3" :src="props.icon" /> -->
        <span style="margin-left: 0em;" class="sidebarMenu-label__text ml-7">{{ label }}</span>
      </div>
      <i
        v-if="hasSubMenu"
        class="icon-arrow-down transition-all duration-300"
        :class="{ 'transition-all duration-300 rotate-180': isActive }"
      ></i>
    </a>
    <div
      v-if="hasSubMenu"
      class="sidebarMenu-subMenu"
      :class="{ active: isActive }"
    >
      <a
        v-for="link in subMenu" :key="link" @click="eventClickSubMenu(link.direction, link.text)"
        class="sidebarMenu-subMenu__link"
        :href="link.direction"
        >{{ link.text }}</a
      >
    </div>
  </div>
</template>
