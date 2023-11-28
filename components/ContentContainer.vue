<script setup>
import { useMetaStore } from "../stores/meta";
const selectedImage = ref(
  "https://wetalk-directus-dev-upc.stage01.link/assets/b2155346-5f91-4749-91cb-77c50355c1e0"
);
const metaText = ref("");

const metaStore = useMetaStore();

watchEffect(() => {
  const data = metaStore.getMetaData;
  if (data.length > 0) {
    selectedImage.value = data[0].imagen;
    metaText.value = data[0].meta;
  }
});

const isOpen = false;
const haveLink = false;
const haveTabs = false;
</script>
<template>
  <Breadcrumb page="Contenido" />
  <div class="flex flex-col gap-6">
    <div class="w-full lg:w-[1023px] mx-auto">
      <div class="block lg:flex gap-[28px]">
        <SyllabusBox :open="isOpen" :link="haveLink" :tab-show="haveTabs" />
        <HelpBox />
      </div>
    </div>
  </div>
</template>
