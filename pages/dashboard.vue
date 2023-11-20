<script setup ts>
import animation from '@/assets/images/Ilustracion1.json'

import { watchEffect } from "vue";
import { apiKey, apiUrl } from "~/consts";
import { useMenuStore } from "../stores/menu";
definePageMeta({
    middleware: 'auth'
});

const menuStore = useMenuStore();

const fetchMetaInfo = async () => {
  await menuStore.fetchCalendarData(apiUrl, apiKey);
};

watchEffect(async () => {
  const data = menuStore.getCalendarItems;
  if (data.length > 0) {
  } else {
    await fetchMetaInfo();
  }
});



</script>
<template>
  <NuxtLayout>
    <div class="flex min-h-[calc(100vh-80px)] bg-[#FFF4F6]">
      <SidebarContainer />
      <MainContainer>
        <DashboardContainer />
      </MainContainer>
      <!-- <client-only>
        <Vue3Lottie
          :animationData="animation"
          :height="800"
          :width="800"
        />
      </client-only> -->
    </div>
  </NuxtLayout>
</template>
