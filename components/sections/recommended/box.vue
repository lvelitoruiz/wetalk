<!-- eslint-disable @typescript-eslint/comma-dangle -->
<!-- eslint-disable @typescript-eslint/no-floating-promises -->
<!-- eslint-disable @typescript-eslint/no-unsafe-argument -->
<script setup>
import { useUserStore } from '../../../stores/auth';
import { useMenuStore } from '../stores/menu';
import { apiUrl } from '~/consts';
import { ref, watchEffect, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const menuStore = useMenuStore();
const userStore = useUserStore();
const dataU = userStore.getUserData;
const recommendedData = ref();
const itemTitle = ref(null);
const manageableData = ref(null);
const idTitle = 5;
const page = 'page2';
const nameToFind = 'beyond';

const fetchData = async () => {
  await menuStore.fetchManageableData(apiUrl, 'beyond');
  await menuStore.fetchRecommendedData(
    apiUrl,
    '1',
    'High beginner',
    '5,6',
    'Psicología'
  );
};

const goBack = () => {
  router.go(-1);
};

const getFirstName = (fullName) => {
  const words = fullName.split(' ');
  return words.length > 0 ? words[0] : '';
};

watchEffect(() => {
  const manageable = menuStore.getManageableItems;
  const recommended = menuStore.getRecommendedItems;

  if (manageable) {
    manageableData.value = manageable;

    itemTitle.value = manageableData.value.find(
      (item) =>
        item.nombre === nameToFind &&
        item.pagina === page &&
        item.codigo_item === 'title' &&
        item.es_vista_interna === true
    );
  }

  if (recommended) {
    recommendedData.value = recommended;
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
        <div class="flex items-baseline justify-between pb-2">
          <div class="flex items-baseline justify-between pb-[15px]">
            <div
              @click="goBack()"
              class="md:flex hidden items-center gap-2 cursor-pointer"
            >
              <i class="icon-arrow-right text-[#404040] rotate-180" />
              <span class="text-[#404040] font-bold font-zizou-bold text-sm">
                Atrás
              </span>
            </div>
          </div>
        </div>
        <div class="md:mx-[60px] mx-0">
          <h3 class="text-[#404040] text-center mb-[20px]">
            <span
              class="uppercase font-bold font-solano text-2xl text-[#000000]"
            >
              {{ getFirstName(dataU.name) }},
            </span>
            <span class="uppercase font-bold font-solano text-[1.3rem]">
              {{ itemTitle?.texto }}
            </span>
          </h3>
          <div
            class="relative black-scroll min-h-[300px] overflow-y-auto max-h-[550px]"
          >
            <Card :data="recommendedData" :section="'beyond'" />
          </div>
          <div class="mx-auto mb-[20px] text-center">
            <router-link to="/interested">
              <Button
                label="Ver otras opciones"
                primary
                class="mt-[35px] !w-[200px]"
              />
            </router-link>
          </div>
        </div>
      </BoxContainer>
    </div>
  </div>
</template>

<style></style>
