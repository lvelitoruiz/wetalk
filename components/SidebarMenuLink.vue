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
      event: 'Click-MenuLateral',
      'content_name': label
    })
  }
};

const eventClickSubMenu = (url, name) => {
    if(dataLayer){
        dataLayer.push({
            event: 'Click-SubMenu',
            'url': url,
            'content_name': name
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
    <a class="sidebarMenu-link" :class="{ 'text-[#0043AA]' : isActive }" @click="handleActivation(label)" :href="url">
      <div class="sidebarMenu-label">
        <i class="sidebarMenu-label__icon ml-7" :class="getIconClass()"></i>
        <!-- <img class="mr-3" :src="props.icon" /> -->
        <span class="sidebarMenu-label__text">{{ label }}</span>
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
