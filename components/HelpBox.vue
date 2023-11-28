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

</script>
<template>
  <div class="min-w-[calc(32%-28px)]">
    <BoxContainer color="greenLigth">
      <div class="flex flex-col justify-between pb-[18px]">
        <h3 class="text-[#404040] text-2xl uppercase font-solano">Ayuda</h3>
        <p class="text-[#404040] text-sm">Consultas generales:</p>
      </div>
      <div class="flex flex-col gap-2">
        <a v-for="item in ayudaData" :href="item.numero" class="flex items-center gap-[6px] h-10 rounded-[10px] hover:bg-[#E6F5F0] p-2" target="_blank">
          <!-- <i class="icon-phone text-4xl text-[#57BD9E]"></i> -->
          <div class="w-[33px] flex justify-center">
            <img :src="item.icono" />
          </div>
          <span class="text-[#404040] font-medium text-sm">{{ item.id === 5 ? "Chatea con nosotros" : item.numero }}</span>
        </a>
      </div>
    </BoxContainer>
  </div>
</template>
