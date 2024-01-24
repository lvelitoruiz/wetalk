<script setup>
import { bg_triangles_gray } from "@/assets/index.ts";
import { useMenuStore } from "../stores/menu";
import { apiUrl } from "~/consts";

const newsData = ref(null);
const tabsNewsData = ref(null);
const filteredNewsData = ref(null);

const menuStore = useMenuStore();
const tabMapping = {};
let nextTabIndex = 0;

const course = menuStore.getProfileItems.data[0].desProducto;
const career = menuStore.getProfileItems.data[0].descCurso;

const props = defineProps({});

const handleTabChange = (selectedTab) => {
  if (selectedTab === "tab-all") {
    filteredNewsData.value = newsData.value;
  } else {
    filteredNewsData.value = newsData.value.filter(
      (item) => item.tab === selectedTab
    );
  }
};

const fetchData = async () => {
  // await menuStore.fetchNewsData(apiUrl, "1", "", "15", course, career, true);
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
        tab: tab,
      };
    });

    const uniqueCategoriesSet = new Set(
      modifiedNews.map((item) => item.categoria)
    );
    const uniqueNews = Array.from(uniqueCategoriesSet)
      .map((category) => {
        const tab = tabMapping[category];
        const correspondingItem = modifiedNews.find(
          (item) => item.categoria === category && item.tab === tab
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
        <span class="uppercase font-bold font-solano">recomendadas</span>
      </h3>

    </div>
    <BeyondCard :dataPost="newsData" />
    <router-link class="flex items-center justify-center mt-4 gap-2" to="#">
      <span class="text-[#E50A17] font-bold font-zizou-bold text-sm">Editar intereses</span>
      <i class="icon-arrow-right text-[#E50A17]"></i>
    </router-link>
  </BoxContainer>
</template>