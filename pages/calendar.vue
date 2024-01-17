<!-- eslint-disable no-undef -->

<script setup ts>
definePageMeta({
  middleware: 'auth',
});
</script>
<template>
  <div>
    <NuxtLayout>
      <div class="flex min-h-[calc(100vh-80px)] bg-[#FFF4F6]">
        <SidebarContainer />
        <MainContainer>
          <CalendarContainer />
        </MainContainer>
      </div>
    </NuxtLayout>
  </div>
</template>
