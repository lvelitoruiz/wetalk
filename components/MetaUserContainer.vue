<script setup>
import { useMetaStore } from '../stores/meta';
import { watchEffect, ref } from 'vue';
const selectedImage = ref('');
const metaText = ref('');

const metaStore = useMetaStore();

watchEffect(() => {
  const data = metaStore.getMetaData;
  if (data.length > 0) {
    selectedImage.value = data[0].imagen;
    metaText.value = data[0].meta;
  }
  const images = metaStore.getImages;
  if (images) {
    selectedImage.value = images[0].imagen;
  }
});

const isOpen = true;
const haveLink = true;
</script>
<template>
  <Breadcrumb page="Mi perfil" />

  <div class="flex flex-col gap-6">
    <div class="w-full lg:w-[1023px] mx-auto">
      <div class="flex flex-col gap-[28px]">
        <AlumnInfo />
        <MetaConfigurator />
      </div>
    </div>
  </div>
</template>
