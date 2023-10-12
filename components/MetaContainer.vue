<script setup>

import { useMetaStore } from "../stores/meta";
const selectedImage = ref(
  "https://wetalk-directus-dev-upc.stage01.link/assets/b2155346-5f91-4749-91cb-77c50355c1e0"
);
const metaText = ref("")

const metaStore = useMetaStore();

watchEffect(() => {
  const data = metaStore.getMetaData;
  if (data) {
    selectedImage.value = data[0].imagen;
    metaText.value = data[0].meta;
  }
});
</script>
<template>
  <div class="flex items-center w-[1023px] mx-auto pb-[18px] gap-[6px]">
    <a class="text-[#575759] text-[15px] underline" href="">Inicio</a>
    <span class="text-[#575759] text-[15px]">></span>
    <span class="text-[#575759] text-[15px]">Mi perfil</span>
  </div>
  <div class="flex flex-col gap-6">
    <div class="flex items-center w-[1023px] mx-auto gap-5 pb-[28px]">
      <div>
        <h1
          class="text-[#191919] text-[32px] font-bold font-solano uppercase whitespace-nowrap"
        >
          Welcome, Gianinna Roca
        </h1>
        <p class="text-[#191919] text-[18px] whitespace-nowrap">
          Inglés 1 | Lun y Mar 19:00h - 22:00h
        </p>
      </div>

      <div
        class="bg-white shadow-[0_0_20px_0_rgba(77,39,37,0.25)] h-[71px] px-5 py-2 w-full flex items-center rounded-lg triangle relative"
      >
        <div class="w-[70px]">
          <img v-if="selectedImage !== ''" class="w-auto h-[55px]" :src="selectedImage" alt="" />
          <img v-if="selectedImage === ''" class="w-auto h-[55px]" src="https://wetalk-directus-dev-upc.stage01.link/assets/b2155346-5f91-4749-91cb-77c50355c1e0" alt="" />
        </div>
        <div class="w-[calc(100%-100px)] px-3">
          <p class="text-[#404040] text-sm font-bold">Meta:</p>
          <p v-if="metaText !== ''" class="text-sm text-[#404040] font-light">
            {{ metaText }}
          </p>
          <p v-if="metaText === ''" class="text-sm text-[#A6A6A6] font-light">Cuéntanos tu meta al estudiar inglés, y alcancémosla juntos 🏁🏆</p>
        </div>
        <a href="" class="inline-block w-[30px]">
          <i class="icon-edit text-xl text-[#595959]"></i>
        </a>
      </div>
    </div>
    <AlumnInfo />
    <MetaConfigurator />
  </div>
</template>
