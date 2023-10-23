<script setup>

import { useMenuStore } from "../stores/menu";

const menuStore = useMenuStore();

const ayudaData = ref(null);

watchEffect(() => {
  const ayuda = menuStore.getAyudaItems;
  if (ayuda) {
    ayudaData.value = ayuda;
  }
});


const data = [
  {
    id: 1,
    numero: "(01) 604 2400",
    icono:
      "https://wetalk-directus-dev-upc.stage01.link/assets/66bead94-8673-4426-97ef-50b78e76ca77",
  },
  {
    id: 2,
    numero: "962 222 408",
    icono:
      "https://wetalk-directus-dev-upc.stage01.link/assets/861a7a84-9b91-4f65-bc80-aad4cafadb67",
  },
];
</script>
<template>
  <div class="min-w-[calc(35%-28px)]">
    <BoxContainer color="greenLigth">
      <div class="flex flex-col justify-between pb-[18px]">
        <h3 class="text-[#404040] text-2xl uppercase font-solano">Ayuda</h3>
        <p class="text-[#404040] text-sm">Consultas generales:</p>
      </div>
      <div class="flex flex-col gap-2">
        <a v-for="item in ayudaData" href="" class="flex items-center gap-[6px]">
          <!-- <i class="icon-phone text-4xl text-[#57BD9E]"></i> -->
          <img :src="item.icono" />
          <span class="text-[#404040] font-medium">{{ item.numero }}</span>
        </a>
      </div>
    </BoxContainer>
  </div>
</template>
