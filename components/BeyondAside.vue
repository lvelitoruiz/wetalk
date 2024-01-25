<!-- eslint-disable @typescript-eslint/no-floating-promises -->
<!-- eslint-disable @typescript-eslint/no-unsafe-argument -->
<script setup>
import { ref, onMounted, defineProps, watchEffect } from 'vue';
import { bg_triangles_gray } from '@/assets/index.ts';
import { useMenuStore } from '../stores/menu';
import { apiUrl } from '~/consts';

const newsData = ref(null);
const tabsNewsData = ref(null);
const filteredNewsData = ref(null);
const externalCategory = ref("");
const externalCareer = ref("");

const menuStore = useMenuStore();
const tabMapping = {};
let nextTabIndex = 0;

const course = menuStore.getProfileItems.data[0].desProducto;
const career = menuStore.getProfileItems.data[0].descCurso;

const interestedData = ref({
  value: [],
});

const selectedIntereses = ref([]);

const props = defineProps({});

const fetchData = async () => {
  await menuStore.fetchNewsRecomended(
    apiUrl,
    '1',
    '',
    '15',
    course,
    career,
    true,
    "",
    externalCategory.value,
    externalCareer.value
  );
};

watchEffect(async () => {
  filteredNewsData.value = newsData.value;
  newsData.value = menuStore.getNewsRecomended;
  const interested = menuStore.getInterestedItems;
  // if (news) {
  //   const modifiedNews = news.map((item) => {
  //     const tab =
  //       tabMapping[item.categoria] !== undefined
  //         ? tabMapping[item.categoria]
  //         : `tab-${nextTabIndex++}`;
  //     tabMapping[item.categoria] = tab;
  //     return {
  //       ...item,
  //       texto: item.categoria,
  //       tab,
  //     };
  //   });

  //   const uniqueCategoriesSet = new Set(
  //     modifiedNews.map((item) => item.categoria)
  //   );
  //   const uniqueNews = Array.from(uniqueCategoriesSet)
  //     .map((category) => {
  //       const tab = tabMapping[category];
  //       const correspondingItem = modifiedNews.find(
  //         (item) => item.categoria === category && item.tab === tab
  //       );
  //       return correspondingItem;
  //     })
  //     .filter(Boolean);

  //   newsData.value = modifiedNews;
  //   tabsNewsData.value = uniqueNews;
  // }

  if (interested) {
    const interestedDataValue = interested.map((item) => {
      return {
        contenido_dinamico_id: item.contenido_dinamico_id,
        answer: item.answer.split(',').join(', '),
      };
    });

    interestedData.value = {
      value: interestedDataValue,
    };
    selectedIntereses.value = interestedDataValue.map((item) => item.answer);
    externalCategory.value = selectedIntereses.value[0];
    externalCareer.value = selectedIntereses.value[1];
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
    <BeyondCard :data-post="newsData" />
    <router-link class="flex items-center justify-center mt-4 gap-2" to="/interested">
      <span class="text-[#E50A17] font-bold font-zizou-bold text-sm">
        Editar intereses
      </span>
      <i class="icon-arrow-right text-[#E50A17]"></i>
    </router-link>
  </BoxContainer>
</template>
