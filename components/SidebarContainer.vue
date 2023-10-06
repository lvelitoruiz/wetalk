<script setup>

import { useMenuStore } from '~/stores/menu'
import { apiUrl, apiKey } from '../consts'


const sidebarMenuList = ref([])

const linkList = ref([])

onMounted(async () => {
  const store = useMenuStore()
  await store.fetchMenuData(apiUrl,apiKey)

  await store.fetchAccesoDirectoData(apiUrl, apiKey)

  linkList.value = store.accesoDirectoData.map((item) => ({
    label: item.nombre,
    link: item.url || '#',
    hasCode: false,
  }))

  sidebarMenuList.value = store.getMenuItems.map((item) => ({
    label: item.nombre,
    icon: item.icono, // Use an appropriate icon here
    hasSubMenu: !!item.submenu.length,
    subMenu: item.submenu.map((subItem) => ({
      text: subItem.nombre,
      direction: subItem.url || '#',
    })),
  }))
})

</script>

<template>
    <div class="w-[275px] bg-[#E6F0FF] px-7 py-9">
        <FastLinks :links="linkList" />
        <SidebarMenu :links="sidebarMenuList" />
    </div>
</template>