<script setup>
import { useMenuStore } from '~/stores/menu'
import { ref, onMounted, watchEffect } from 'vue'

const sidebarMenuList = ref([])

const linkList = ref([])

onMounted(async () => {
  const store = useMenuStore()

  watchEffect(() => {
    const accesoValues = store.getAccesoItems

    if (accesoValues) {
      linkList.value = accesoValues.map((item) => ({
        label: item.titulo,
        link: item.url ?? '#',
        code: item.status
      }))
    }

    const menuValues = store.getMenuItems

    if (menuValues) {
      sidebarMenuList.value = menuValues.map((item) => ({
        label: item.nombre,
        etiqueta: item.etiqueta,
        icon: item.icono,
        url: item.url ?? '#',
        hasSubMenu: !!item.submenu.length,
        subMenu: item.submenu.map((subItem) => ({
          text: subItem.nombre,
          direction: subItem.url ?? '#'
        }))
      }))
    }
  })
})
</script>

<template>
  <div
    class="w-[275px] max-w-[275px] min-w-[275px] bg-[#E6F0FF] pr-7 py-9 h-full"
  >
    <FastLinks :links="linkList" />
    <SidebarMenu :links="sidebarMenuList" />
  </div>
</template>
