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
const news = ref(null);
const filteredNewsData = ref(null);
const dynamicData = ref(null);
const interestedData = ref({
  data: [],
  total: 0,
});
const itemTitle = ref(null);
const itemSubtitle = ref(null);
const itemImage = ref(null);
const itemButton = ref(null);
const page = 'page1';
const nameToFind = 'beyond';
const menuStore = useMenuStore();
const tabMapping = {};
const selectedIntereses = ref([]);
const nextTabIndex = 0;
const externalCategory = ref('');
const externalCareer = ref('');

const props = defineProps({});

const course = menuStore.getProfileItems.data[0].desProducto;
const career = menuStore.getProfileItems.data[0].descCurso;

const fetchData = async () => {
  await menuStore.fetchInterestData(apiUrl, 'beyond');
  await menuStore.fetchNewsRecomended(
    apiUrl,
    '1',
    '',
    '15',
    course,
    career,
    true,
    externalCategory.value,
    externalCareer.value
  );
  await menuStore.fetchManageableData(apiUrl, 'beyond');
};

watchEffect(async () => {
  const dynamic = menuStore.getManageableItems;
  filteredNewsData.value = newsData.value;
  news.value = menuStore.getNewsRecomended;
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
        answer: item.answer.split(',').map(Number),
      };
    });

    interestedData.value = {
      data: interestedDataValue,
      total: interestedDataValue?.length ?? 0,
    };

    selectedIntereses.value = interestedDataValue.map((item) => item.answer);
    externalCategory.value = selectedIntereses.value[0];
    externalCareer.value = selectedIntereses.value[1];
  }

  if (dynamic) {
    dynamicData.value = dynamic;

    itemTitle.value = dynamicData.value.find(
      (item) =>
        item.nombre === nameToFind &&
        item.pagina === page &&
        item.codigo_item === 'title' &&
        item.es_vista_interna === false
    );

    itemSubtitle.value = dynamicData.value.find(
      (item) =>
        item.nombre === nameToFind &&
        item.pagina === page &&
        item.codigo_item === 'more' &&
        item.es_vista_interna === false
    );

    itemImage.value = dynamicData.value.find(
      (item) =>
        item.nombre === nameToFind &&
        item.pagina === page &&
        item.codigo_item === 'image' &&
        item.es_vista_interna === false
    );

    itemButton.value = dynamicData.value.find(
      (item) =>
        item.nombre === nameToFind &&
        item.pagina === page &&
        item.codigo_item === 'main_button' &&
        item.es_vista_interna === false
    );
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
        <span class="uppercase font-bold font-solano">
          {{ itemTitle?.texto ?? '' }}
        </span>
      </h3>
      <router-link
        v-if="interestedData.total !== 0"
        class="flex items-center gap-2"
        to="/beyond"
      >
        <span class="text-[#E50A17] font-bold font-zizou-bold text-sm">
          {{ itemSubtitle?.texto ?? '' }}
        </span>
        <i class="icon-arrow-right text-[#E50A17]" />
      </router-link>
    </div>
    <p class="text-[14px] font-publicSans">{{ dynamicData[1]?.texto ?? '' }}</p>
    <BeyondCard v-if="interestedData.data.length" :data-post="news" />
    <div v-else class="mt-[35px] w-[220px] m-auto text-center">
      <img :src="itemImage?.imagen ?? ''" class="m-auto" />
      <p class="text-[14px] font-publicSans mt-[10px]">
        {{ itemImage?.texto ?? '' }}
      </p>
      <router-link to="/interested">
        <Button :label="itemButton?.texto ?? ''" primary class="mt-[35px]" />
      </router-link>
    </div>
  </BoxContainer>
</template>
