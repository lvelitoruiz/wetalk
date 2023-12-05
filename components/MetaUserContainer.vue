<script setup>
import { useMetaStore } from "../stores/meta";
const selectedImage = ref(
  "https://adminmi-dev-wetalk.stage01.link/assets/e0ff1dd0-0ec1-4d66-9c19-a2eb1006d9b0"
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
