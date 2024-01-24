<!-- eslint-disable @typescript-eslint/no-unsafe-argument -->
<!-- eslint-disable @typescript-eslint/no-floating-promises -->
<script setup>
import { useMenuStore } from '../../../stores/menu';
import { apiUrl } from '~/consts';
import { useRouter } from 'vue-router';
import { ref, onMounted, watchEffect } from 'vue';

const menuStore = useMenuStore();
const newsIdData = ref(null);
const router = useRouter();
const titleBreadCrumb = ref('');

const fetchData = async (id) => {
  await menuStore.fetchNewsDataId(apiUrl, id);
};

onMounted(() => {
  fetchData(router.currentRoute.value.params.id);
});

watchEffect(() => {
  const news = menuStore.getNewsId;

  if (news) {
    newsIdData.value = news;
  }

  if (newsIdData.value !== null && newsIdData.value !== undefined) {
    titleBreadCrumb.value = newsIdData.value[0]?.titulo ?? '';
  }
});
</script>

<template>
  <Breadcrumb sub-page="Beyond WeTALK" :page="titleBreadCrumb" />

  <div class="block lg:flex lg:flex-col gap-6">
    <div class="w-full lg:w-[1023px] mx-auto">
      <div class="block lg:flex gap-[28px]">
        <div class="min-w-[100%] lg:min-w-[65%]">
          <SectionsBeyondContentId :data="newsIdData" />
        </div>
        <div class="flex-col flex gap-7">
          <TeacherBox />
          <HelpBox />
        </div>
      </div>
    </div>
  </div>
</template>
