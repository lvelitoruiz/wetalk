<script setup>
import { useMetaStore } from "../stores/meta";
const selectedImage = ref(
  "https://adminmi-cert-wetalk.stage01.link/assets/7b4478d8-fbed-4f6f-a000-6868f7b3f400"
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
