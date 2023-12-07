<script setup>

const props = defineProps({
    links: Array,
})

</script>
<template>
    <div class="sidebarMenu-wrapper">
        <SidebarMenuLink v-for="link in links" :label="link.label" :icon="link.icon" :has-sub-menu="link.hasSubMenu" :etiqueta="link.etiqueta"
            :sub-menu="link.subMenu" />
    </div>
</template>