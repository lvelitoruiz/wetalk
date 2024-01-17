<!-- eslint-disable no-undef -->
<script setup ts>
definePageMeta({
  middleware: 'auth',
})
</script>
<template>
  <div>
    <NuxtLayout>
      <div class="flex min-h-[calc(100vh-80px)] bg-[#FFF4F6]">
        <div class="hidden lg:block">
          <SidebarContainer />
        </div>
        <MainContainer>
          <ContentContainer />
        </MainContainer>
      </div>
    </NuxtLayout>
  </div>
</template>
