<script setup>
import { ref, watchEffect } from 'vue';
import { useMenuStore } from '../stores/menu';

const alumnInfo = ref(null);
const alumnPhoto = ref('');

const menuStore = useMenuStore();

watchEffect(async () => {
  const alumnData = menuStore.getProfileItems;
  if (alumnData) {
    alumnPhoto.value = alumnData.data[0].fotoUrl;
    alumnInfo.value = alumnData.data[0];
  }
});
</script>
<template>
  <ContainerBoxSimple>
    <div class="flex items-center justify-between pb-6">
      <h3 class="text-[#404040] text-[32px] font-solano font-bold uppercase">
        Mis Datos
      </h3>
      <Button
        class="hidden"
        label="Cambiar contraseña"
        primary
      />
    </div>
    <div
      class="lg:flex-row flex-col flex items-center justify-center lg:items-start gap-0 lg:gap-[38px]"
    >
      <UserImage :photo="alumnPhoto" />
      <div class="w-full flex flex-col justify-start lg:items-start">
        <UserInfo :user-info="alumnInfo" />
      </div>
      <!-- <Button class="lg:hidden" label="Cambiar contraseña" primary /> -->
    </div>
  </ContainerBoxSimple>
</template>
