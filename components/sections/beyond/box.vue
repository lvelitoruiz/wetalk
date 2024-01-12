<template>
  <div>
    <div class="pb-7">
      <BoxContainer color="black">
        <img :src="bg_triangles_gray" alt="Background Image" class="absolute top-[0px] left-[0px] z-[-1]" />
        <div class="flex items-baseline justify-between pb-2">
          <h3 class="text-[#404040] text-2xl">
            <span class="uppercase font-bold font-solano">Beyond WeTALK</span>
            <p class="text-[14px] font-publicSans">Recomendaciones para ti</p>
          </h3>
          <!-- <router-link @click="event()" class="flex items-center gap-2" to="/notas">
            <span class="text-[#E50A17] font-bold font-zizou-bold text-sm">Editar intereses</span>
            <i class="icon-arrow-right text-[#E50A17]"></i>
          </router-link> -->
        </div>
        <div class="relative flex mb-[20px] justify-center">
          <TabContent :tabs="tabsNewsData" @tabChange="handleTabChange" :colorActive="'black'"></TabContent>
        </div>
        <div class="relative black-scroll min-h-[300px] overflow-y-auto max-h-[500px]">
          <Card :data="filteredNewsData" />
        </div>
      </BoxContainer>
    </div>
  </div>
</template>

<script setup >
import { bg_triangles_gray } from '@/assets/index.ts';
import { useMenuStore } from "../stores/menu";
import { apiUrl } from "~/consts";

const newsData = ref(null);
const tabsNewsData = ref(null);
const filteredNewsData = ref(null);
const menuStore = useMenuStore();
const tabMapping = {};
let nextTabIndex = 0;

const props = defineProps({
})

const handleTabChange = (selectedTab) => {
  if (selectedTab === 'tab-all') {
    filteredNewsData.value = newsData.value;
  } else {
    filteredNewsData.value = newsData.value.filter(item => item.tab === selectedTab);
  }
};

const fetchData = async () => {
  await menuStore
    .fetchNewsData(apiUrl)
}

watchEffect(async () => {
  const news = menuStore.getNews
  if (news) {
    const modifiedNews = news.map((item) => {
      const tab = tabMapping[item.categoria] !== undefined ? tabMapping[item.categoria] : `tab-${nextTabIndex++}`;
      tabMapping[item.categoria] = tab;
      return {
        ...item,
        texto: item.categoria,
        tab: tab
      };
    });

    const uniqueCategoriesSet = new Set(modifiedNews.map(item => item.categoria));
    const uniqueNews = Array.from(uniqueCategoriesSet).map((category) => {
      const tab = tabMapping[category];
      const correspondingItem = modifiedNews.find(item => item.categoria === category && item.tab === tab);
      return correspondingItem;
    }).filter(Boolean);
    
    newsData.value = modifiedNews;
    tabsNewsData.value = uniqueNews;
  }
});

watchEffect(() => {
  filteredNewsData.value = newsData.value;
});

onMounted( () => {
  fetchData();
});

</script>