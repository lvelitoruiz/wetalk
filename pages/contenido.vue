<script setup ts>
definePageMeta({
    middleware: 'auth'
});
</script>
<template>
  <NuxtLayout>
    <div class="flex min-h-[calc(100vh-80px)] bg-[#FFF4F6]">
      <SidebarContainer />
      <MainContainer>
        <ContentContainer/>
      </MainContainer>
    </div>
  </NuxtLayout>
</template>