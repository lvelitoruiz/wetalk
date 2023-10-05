<script setup>

import { ref } from 'vue';

const props = defineProps({
    label: String,
    icon: String,
    link: String,
    hasSubMenu: Boolean,
    subMenu: Array,
})

let isActive = ref(false);

const handleActivation = () => {
    isActive.value = !isActive.value;
}

const getIconClass = () => {
  return {
    'icon-home': props.icon === "https://wetalk-directus-dev-upc.stage01.link/assets/153af0fb-8c06-46bc-a705-c0613c46b0a5",
    'icon-book-open': props.icon === "https://wetalk-directus-dev-upc.stage01.link/assets/5cfd33d3-6a02-4ac1-bb5e-58425948ecaf",
    'icon-creditcard': props.icon === "https://wetalk-directus-dev-upc.stage01.link/assets/f82d3513-aa81-48e6-af65-7df80aa7ec93",
    'icon-user-chat': props.icon === "https://wetalk-directus-dev-upc.stage01.link/assets/76da15c9-aa8b-48e9-93e4-0774343829f5",
    'icon-puzzle': props.icon === "https://wetalk-directus-dev-upc.stage01.link/assets/59e10d85-03a3-44e9-b3f3-a4a5153e39b3",
  };
};

</script>
<template>
    <div class="relative">
        <div class="sidebarMenu-link">
            <div class="sidebarMenu-label">
                <i class="sidebarMenu-label__icon" :class="getIconClass()"></i>
                <span class="sidebarMenu-label__text">{{ label }}</span>
            </div>
            <i v-if="hasSubMenu" class="icon-arrow-down transition-all duration-300" :class="{ 'transition-all duration-300 rotate-180': isActive }"
                @click="handleActivation"></i>
        </div>
        <div v-if="hasSubMenu" class="sidebarMenu-subMenu" :class="{ 'active': isActive }">
            <a v-for="link in subMenu" class="sidebarMenu-subMenu__link" :href="link.direction">{{ link.text }}</a>
        </div>
    </div>
</template>