<!-- eslint-disable @typescript-eslint/comma-dangle -->
<!-- eslint-disable @typescript-eslint/no-floating-promises -->
<!-- eslint-disable @typescript-eslint/no-unsafe-argument -->
<script setup>
import { bg_triangles_gray } from '@/assets/index.ts';
import { useMenuStore } from '../stores/menu';
import { apiUrl } from '~/consts';
import { ref, watchEffect, onMounted, defineProps } from 'vue';
import { useUserStore } from '../../../stores/auth';

const newsData = ref(null);
const tabsNewsData = ref(null);
const filteredNewsData = ref(null);
const categories = ref(null);
const totalCount = ref(15);
const pageSize = ref(15);
const actualPage = ref(1);
const term = ref('');
const userStore = useUserStore();
const menuStore = useMenuStore();
const interestedData = ref({
  value: [],
});
const selectedIntereses = ref([]);
const tabMapping = {};
let nextTabIndex = 0;
let externalCategory = ref("");
let externalCareer = ref("");

const categorySelected = ref("");

const nameUser = userStore.getUserData?.name?.split(' ')[0];

const course = menuStore.getProfileItems.data[0].desProducto;
const career = menuStore.getProfileItems.data[0].descCurso;

const props = defineProps({});

const handleTabChange = (selectedTab) => {
  console.log('this is the event: ', selectedTab);

  const numericPart = selectedTab.match(/\d+/);

  if (numericPart) {

    const numericValue = parseInt(numericPart[0], 10);

    categorySelected.value = categories.value[numericValue].id;
    fetchData();
  } else {
    categorySelected.value = "";
    fetchData();
  }

};

const fetchData = async () => {
  await menuStore.fetchInterestData(apiUrl, 'beyond');
  const termAlter = '';
  if (term.value.length >= 3) {
    await menuStore.fetchNewsData(
      apiUrl,
      actualPage.value.toString(),
      term.value,
      '15',
      course,
      career,
      categorySelected.value,
      externalCategory.value,
      externalCareer.value
    );
  } else {
    await menuStore.fetchNewsData(
      apiUrl,
      actualPage.value.toString(),
      termAlter,
      '15',
      course,
      career,
      categorySelected.value,
      externalCategory.value,
      externalCareer.value
    );
  }
};
const onClickHandler = async (page) => {
  actualPage.value = page;
  await fetchData();
  handleTabChange('tab-all');
};

const searchTab = async () => {
  actualPage.value = 1;
  await fetchData();
  handleTabChange('tab-all');
};

watchEffect(async () => {
  newsData.value = menuStore.getNews;
  const meta = menuStore.getNewsMeta;
  categories.value = menuStore.getCategoryItems;
  totalCount.value = meta.count;
  const interested = menuStore.getInterestedItems;
  console.log('the value!! ', totalCount.value);
  console.log('the values!! ', categories);
  categories.value.map((item) => {
    item.texto = item.nombre;
  })

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
  menuStore.fetchCategories(apiUrl);
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
          <p class="text-xl font-solano">
            <span class="font-bold text-2xl"> {{ nameUser }}, </span> tenemos
            todo esto para ti
          </p>
        </div>
        <div class="flex justify-center my-[20px]">
          <div class="w-[423px] border border-[#A6A6A6] rounded px-3 py-2 flex items-center">
            <input type="text" placeholder="Buscar" v-model="term"
              class="w-[95%] focus:outline-none placeholder:text-sm" />
            <i class="icon-search" :onclick="searchTab"></i>
          </div>
        </div>
        <div class="relative flex mb-[20px] justify-center">
          <TabContent :tabs="categories" @tab-change="handleTabChange" :option-all="true" :color-active="'black'">
          </TabContent>
        </div>
        <div v-if="newsData.length" class="relative black-scroll min-h-[300px] overflow-y-auto max-h-[550px]">
          <Card :data="newsData" :section="'beyond'" />
        </div>
        <div v-else class="relative black-scroll min-h-[300px] overflow-y-auto max-h-[550px] pt-20">
          <ErrorMensaje />
        </div>
      </BoxContainer>
      <div v-if="newsData.length" class="mt-5 flex justify-center items-center">
        <Pagination :total-items="totalCount" :items-per-page="pageSize" :on-click-handler="onClickHandler"
          :current-page="actualPage" />
      </div>
    </div>
  </div>
</template>
