<!-- eslint-disable no-undef -->
<script setup ts>
import { watchEffect } from 'vue'
import { apiUrl } from '~/consts'
import { useMenuStore } from '../stores/menu'

definePageMeta({
  middleware: 'auth'
})

const menuStore = useMenuStore()

const fetchMetaInfo = async () => {
  await menuStore.fetchCalendarData(apiUrl)
}

watchEffect(async () => {
  const data = menuStore.getCalendarItems
  if (data && data?.length > 0) {
    console.log(data)
  } else {
    await fetchMetaInfo()
  }
})
</script>
<template>
  <div>
    <NuxtLayout>
      <div class="lg:flex lg:min-h-[calc(100vh-80px)] min-h-[calc(100vh-68px)]">
        <div class="hidden lg:block">
          <SidebarContainer />
        </div>
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
  </div>
</template>
