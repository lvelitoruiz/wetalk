<script setup ts>
  import animation from '@/assets/images/Ilustracion1.json'

  // definePageMeta({
  //   middleware: 'auth'
  // }); 
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
