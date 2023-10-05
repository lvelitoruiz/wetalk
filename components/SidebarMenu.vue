<script setup>

const props = defineProps({
    links: Array,
})

console.log('consola here: ',props.links)

</script>
<template>
    <div class="sidebarMenu-wrapper">
        <SidebarMenuLink v-for="link in links" :label="link.label" :icon="link.icon" :has-sub-menu="link.hasSubMenu"
            :sub-menu="link.subMenu" />
    </div>
</template>