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

</script>
<template>
    <div class="relative">
        <div class="sidebarMenu-link">
            <div class="sidebarMenu-label">
                <i class="sidebarMenu-label__icon" :class="icon"></i>
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