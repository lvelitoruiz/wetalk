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

const handleActivation = () => {
  isActive.value = !isActive.value;
};

const getIconClass = () => {
  return {
    'icon-home': props.icon === "https://wetalk-directus-dev-upc.stage01.link/assets/875b2e51-15a2-4f4a-88cc-bf80e727563e",
    'icon-book-open': props.icon === "https://wetalk-directus-dev-upc.stage01.link/assets/b02eb4c0-7400-42c6-a71d-7546aa533dde",
    'icon-creditcard': props.icon === "https://wetalk-directus-dev-upc.stage01.link/assets/a11c6b25-c875-4752-8952-eb2011f00f23",
    'icon-user-chat': props.icon === "https://wetalk-directus-dev-upc.stage01.link/assets/87a94f5a-1dad-4aeb-a820-a5ee78287690",
    'icon-puzzle': props.icon === "https://wetalk-directus-dev-upc.stage01.link/assets/75050466-6742-4ddc-97c7-e101040b40f1",
  };
};
</script>
<template>
  <div class="relative">
    <div class="sidebarMenu-link" :class="{ 'text-[#0043AA]' : isActive }" @click="handleActivation">
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
        v-for="link in subMenu"
        class="sidebarMenu-subMenu__link"
        :href="link.direction"
        >{{ link.text }}</a
      >
    </div>
  </div>
</template>
