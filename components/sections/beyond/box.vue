<script setup >
import { bg_triangles_gray } from '@/assets/index.ts';
import { useMenuStore } from '../stores/menu';
import { apiUrl } from '~/consts';
import { ref, watchEffect, onMounted } from 'vue';

const newsData = ref(null);
const tabsNewsData = ref(null);
const filteredNewsData = ref(null);
const totalCount = ref(15);
const pageSize = ref(15);
const actualPage = ref(1);
const term = ref("");
const userStore = useUserStore();
const menuStore = useMenuStore();
const tabMapping = {};
let nextTabIndex = 0;


const nameUser = userStore.getUserData?.name?.split(' ')[0];
console.log(nameUser?.split(' ')[0])

const course = menuStore.getProfileItems.data[0].desProducto;
const career = menuStore.getProfileItems.data[0].descCurso;


const props = defineProps({
})

const handleTabChange = (selectedTab) => {
  if (selectedTab === 'tab-all') {
    filteredNewsData.value = newsData.value;
  } else {
    filteredNewsData.value = newsData.value.filter(
      (item) => item.tab === selectedTab
    );
  }
};

const fetchData = async () => {
  console.log('adding the data where is needed');
  let termAlter = "";
  if (term.value.length >= 3) {
    await menuStore
      .fetchNewsData(apiUrl, actualPage.value.toString(), term.value, "15", course, career, false)
  } else {
    await menuStore
      .fetchNewsData(apiUrl, actualPage.value.toString(), termAlter, "15", course, career, false)
  }

}

const onClickHandler = async (page) => {
  console.log('here!!');
  actualPage.value = page;
  await fetchData();
  handleTabChange('tab-all');
}

const searchTab = async () => {
  console.log('the search: ', term.value)
  actualPage.value = 1;
  await fetchData();
  handleTabChange('tab-all');
}

watchEffect(async () => {
  filteredNewsData.value = newsData.value;
  const news = menuStore.getNews;
  const meta = menuStore.getNewsMeta;
  totalCount.value = meta.count;
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
  <div>
    <div class="pb-7">
      <BoxContainer color="black">
        <img :src="bg_triangles_gray" alt="Background Image" class="absolute top-[0px] left-[0px] z-[-1]" />
        <div class="flex items-baseline justify-between pb-2">
          <h3 class="text-[#404040] text-2xl">
            <span class="uppercase font-bold font-solano">Beyond WeTALK</span>
          </h3>
          <!-- <router-link @click="event()" class="flex items-center gap-2" to="/notas">
            <span class="text-[#E50A17] font-bold font-zizou-bold text-sm">Editar intereses</span>
            <i class="icon-arrow-right text-[#E50A17]"></i>
          </router-link> -->

        </div>
        <div class="flex justify-center">
          <p class="text-xl font-solano"> <span class="font-bold text-2xl"> {{ nameUser }}, </span> tenemos todo esto para
            ti </p>
        </div>
        <div class="flex justify-center my-[20px]">
          <div class="w-[423px] border border-[#A6A6A6] rounded px-3 py-2 flex items-center">
            <input type="text" placeholder="Buscar" v-model="term" class="w-[95%] focus:outline-none placeholder:text-sm">
            <i class="icon-search" :onclick="searchTab"></i>
          </div>
        </div>
        <div class="relative flex mb-[20px] justify-center">
          <TabContent :tabs="tabsNewsData" @tabChange="handleTabChange" :optionAll="true" :colorActive="'black'">
          </TabContent>
        </div>
        <div class="relative black-scroll min-h-[300px] overflow-y-auto max-h-[550px]">
          <Card :data="filteredNewsData" :section="'beyond'" />
        </div>
      </BoxContainer>
      <div class="mt-5 flex justify-center items-center">
        <Pagination :totalItems="totalCount" :itemsPerPage="pageSize" :onClickHandler="onClickHandler"
          :current-page="actualPage" />
      </div>
    </div>
  </div>
</template>

