<script setup>

import { useMenuStore } from "../stores/menu";

const menuStore = useMenuStore();

const ayudaData = ref(null);

const wsLink = ref("")

watchEffect(() => {
  const ayuda = menuStore.getAyudaItems;
  if (ayuda) {
    ayudaData.value = ayuda;
    wsLink.value = `https://api.whatsapp.com/send?phone=51${ayudaData.value[1].numero}&text=Hola!%20Quisiera%20m%C3%A1s%20informaci%C3%B3n!!`;
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
        <a :href="wsLink" class="flex items-center gap-[6px]">
          <!-- <i class="icon-phone text-4xl text-[#57BD9E]"></i> -->
          <img class="h-[32px]" src="@/assets/images/wsicon.svg" alt="">
          <span class="text-[#404040] font-medium">Chatea con nosotros</span>
        </a>
        <a href="https://contacto.upn.edu.pe/" target="_blank" class="flex items-center gap-[6px]">
          <!-- <i class="icon-phone text-4xl text-[#57BD9E]"></i> -->
          <img class="h-[32px]" src="@/assets/images/globe.svg" alt="">
          <span class="text-[#404040] font-medium">https://contacto.upn.edu.pe/</span>
        </a>
      </div>
    </BoxContainer>
  </div>
</template>
