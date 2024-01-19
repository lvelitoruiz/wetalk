<!-- eslint-disable @typescript-eslint/no-floating-promises -->
<!-- eslint-disable @typescript-eslint/no-unsafe-argument -->
<script setup>
import { useMenuStore } from '../stores/menu';
import { apiUrl } from '~/consts';
import { defineProps, ref, watchEffect, onMounted } from 'vue';

const newsData = ref(null);
const tabsNewsData = ref(null);
const filteredNewsData = ref(null);

const menuStore = useMenuStore();
const tabMapping = {};
let nextTabIndex = 0;

const props = defineProps({});

const handleTabChange = (selectedTab) => {
  if (selectedTab === 'tab-all') {
    filteredNewsData.value = newsData.value;
  } else {
    filteredNewsData.value = newsData.value.filter(
      (item) => item.tab === selectedTab,
    );
  }
};

const fetchData = async () => {
  await menuStore.fetchNewsData(apiUrl);
};

watchEffect(async () => {
  filteredNewsData.value = newsData.value;
  const news = menuStore.getNews;
  if (news) {
    const modifiedNews = news.map((item) => {
      const tab =
        tabMapping[item.categoria] !== undefined
          ? tabMapping[item.categoria]
          : `tab-${nextTabIndex++}`;
      tabMapping[item.categoria] = tab;
      return {
        ...item,
        texto: item.categoria,
        tab,
      };
    });

    const uniqueCategoriesSet = new Set(
      modifiedNews.map((item) => item.categoria),
    );
    const uniqueNews = Array.from(uniqueCategoriesSet)
      .map((category) => {
        const tab = tabMapping[category];
        const correspondingItem = modifiedNews.find(
          (item) => item.categoria === category && item.tab === tab,
        );
        return correspondingItem;
      })
      .filter(Boolean);

    newsData.value = modifiedNews;
    tabsNewsData.value = uniqueNews;
  }
});

onMounted(() => {
  fetchData();
});
</script>
<template>
  <BoxContainer color="black">
    <div class="flex items-center justify-between">
      <h3 class="text-[#404040] text-2xl">
        <span class="uppercase font-bold font-solano">BEYOND WeTALK</span>
      </h3>
      <router-link
        class="flex items-center gap-2"
        to="/beyond"
      >
        <span class="text-[#E50A17] font-bold font-zizou-bold text-sm">Ver más</span>
        <i class="icon-arrow-right text-[#E50A17]" />
      </router-link>
    </div>
    <p class="text-[14px] font-publicSans">Recomendaciones para ti</p>
    <BeyondCard :data-post="newsData" />
  </BoxContainer>
</template>
