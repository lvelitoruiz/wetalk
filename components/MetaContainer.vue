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
    <AlumnInfo />
    <MetaConfigurator />
  </div>
</template>
