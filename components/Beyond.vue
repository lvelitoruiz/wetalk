<!-- eslint-disable @typescript-eslint/comma-dangle -->
<!-- eslint-disable @typescript-eslint/no-floating-promises -->
<!-- eslint-disable @typescript-eslint/no-unsafe-argument -->
<script setup>
import { useMenuStore } from '../stores/menu';
import { apiUrl } from '~/consts';
import { defineProps, ref, watchEffect, onMounted } from 'vue';
import { image_person_laptop, bg_triangles_gray_card } from '../assets/index';

const newsData = ref(null);
const tabsNewsData = ref(null);
const filteredNewsData = ref(null);
const interestedData = ref({
  value: [],
});
const menuStore = useMenuStore();
const tabMapping = {};
let nextTabIndex = 0;

const props = defineProps({});

const fetchData = async () => {
  await menuStore.fetchNewsData(apiUrl);
  await menuStore.fetchInterestData(apiUrl, 'beyond');
};

watchEffect(async () => {
  filteredNewsData.value = newsData.value;
  const news = menuStore.getNews;
  const interested = menuStore.getInterestedItems;

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

  if (interested) {
    const interestedDataValue = interested.map((item) => {
      return {
        contenido_dinamico_id: item.contenido_dinamico_id,
        answer: item.answer.split(',').map(Number),
      };
    });

    interestedData.value = {
      value: interestedDataValue,
      total: interestedDataValue.length,
    };
  }
});

onMounted(() => {
  fetchData();
});
</script>

<template>
  <BoxContainer color="black">
    <div class="flex items-center justify-between">
      <img
        :src="bg_triangles_gray_card"
        alt="Background Image"
        class="absolute top-[0px] left-[0px] z-[-1]"
      />
      <h3 class="text-[#404040] text-2xl">
        <span class="uppercase font-bold font-solano">BEYOND WeTALK</span>
      </h3>
      <router-link
        v-if="interestedData.value.total > 0"
        class="flex items-center gap-2"
        to="/beyond"
      >
        <span class="text-[#E50A17] font-bold font-zizou-bold text-sm">
          Ver más
        </span>
        <i class="icon-arrow-right text-[#E50A17]" />
      </router-link>
    </div>
    <p class="text-[14px] font-publicSans">Recomendaciones para ti</p>
    <BeyondCard v-if="interestedData.value.total > 0" :data-post="newsData" />
    <div v-else class="mt-[35px] w-[220px] m-auto text-center">
      <img :src="image_person_laptop" class="m-auto" />
      <p class="text-[14px] font-publicSans mt-[10px]">
        Practicar inglés no siempre tiene que sentirse como una tarea
      </p>
      <router-link to="/interested">
        <Button label="Cuéntanos tus intereses" primary class="mt-[35px]" />
      </router-link>
    </div>
  </BoxContainer>
</template>
