<script setup>
import { ref } from "vue";

const props = defineProps({
  label: String,
  icon: String,
  link: String,
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
    'icon-home': props.icon === "https://adminmi-cert-wetalk.stage01.link//assets/3fddb87a-23f9-46ae-ba49-f1744345cad3",
    'icon-book-open': props.icon === "https://adminmi-cert-wetalk.stage01.link//assets/bcf58841-dbb8-45ac-8fce-fc972de69358",
    'icon-creditcard': props.icon === "https://wetalk-directus-dev-upc.stage01.link/assets/a11c6b25-c875-4752-8952-eb2011f00f23",
    'icon-user-chat': props.icon === "https://wetalk-directus-dev-upc.stage01.link/assets/87a94f5a-1dad-4aeb-a820-a5ee78287690",
    'icon-puzzle': props.icon === "https://wetalk-directus-dev-upc.stage01.link/assets/75050466-6742-4ddc-97c7-e101040b40f1",
  };
};
</script>
<template>
  <div class="relative">
    <div class="sidebarMenu-link" :class="{ 'text-[#0043AA]' : isActive }" @click="handleActivation(label)">
      <div class="sidebarMenu-label">
        <i class="sidebarMenu-label__icon" :class="getIconClass()"></i>
        <!-- <img class="mr-3" :src="props.icon" /> -->
        <span class="sidebarMenu-label__text">{{ label }}</span>
      </div>
      <i
        v-if="hasSubMenu"
        class="icon-arrow-down transition-all duration-300"
        :class="{ 'transition-all duration-300 rotate-180': isActive }"
      ></i>
    </div>
    <div
      v-if="hasSubMenu"
      class="sidebarMenu-subMenu"
      :class="{ active: isActive }"
    >
      <a
        v-for="link in subMenu" :key="link" @click="eventClickSubMenu(link.direction, link.text)"
        class="sidebarMenu-subMenu__link"
        :href="link.direction" target="_blank"
        >{{ link.text }}</a
      >
    </div>
  </div>
</template>
