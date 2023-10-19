<script setup>
import { useMenuStore } from "~/stores/menu";

const sidebarMenuList = ref([]);

const linkList = ref([]);

onMounted(async () => {
  const store = useMenuStore();

  watchEffect(() => {

    const accesoValues = store.getAccesoItems;

    if (accesoValues) {
      linkList.value = accesoValues.map((item) => ({
        label: item.titulo,
        link: item.url || "#",
        code: item.status,
      }));
    }
    
    const menuValues = store.getMenuItems;

    if (menuValues) {
      sidebarMenuList.value = menuValues.map((item) => ({
        label: item.nombre,
        icon: item.icono, 
        hasSubMenu: !!item.submenu.length,
        subMenu: item.submenu.map((subItem) => ({
          text: subItem.nombre,
          direction: subItem.url || "#",
        })),
      }));
    }
  });
});
</script>

<template>
  <div class="w-[275px] bg-[#E6F0FF] px-7 py-9">
    <FastLinks :links="linkList" />
    <SidebarMenu :links="sidebarMenuList" />
  </div>
</template>
