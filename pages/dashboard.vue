<script setup ts>
import animation from '@/assets/images/Ilustracion1.json'

import { watchEffect } from "vue";
import { apiUrl } from "~/consts";
import { useMenuStore } from "../stores/menu";
definePageMeta({
    middleware: 'auth'
});

const menuStore = useMenuStore();

const fetchMetaInfo = async () => {
  await menuStore.fetchCalendarData(apiUrl);
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
    <div class="lg:flex lg:min-h-[calc(100vh-80px)] min-h-[calc(100vh-68px)] bg-[#FFF4F6]">
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
