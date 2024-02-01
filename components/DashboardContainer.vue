<!-- eslint-disable no-undef -->
<script setup>
import { useMetaStore } from '../stores/meta';
import { useMenuStore } from '../stores/menu';
import { useUserStore } from '~/stores/auth';
import { ref, watchEffect } from 'vue';
import { apiUrl } from '~/consts';
const userStore = useUserStore();
const menuStore = useMenuStore();

const nameUser = userStore.getUserData?.name;
const courseName = menuStore.getProfileItems?.data?.at(0)?.descCurso ?? '';

const selectedImage = ref('');
const anotherImage = ref('');
const metaText = ref(
  'Cuéntanos tu meta al estudiar inglés, y alcancémosla juntos 🏁🏆',
);
const metaStore = useMetaStore();
const dataMeta = ref(null);

watchEffect(() => {
  const data = metaStore.getMetaData;
  if (data?.length > 0) {
    // console.log('this is the data: ',data,data.length);
    selectedImage.value = data[0].imagen;
    metaText.value = data[0].meta;
    dataMeta.value = data[0];
  }
  const images = metaStore.getImages;
  if (images) {
    anotherImage.value = images[0].imagen;
  }
});
const dataCompanios = ref([]);

const dataListStudents = menuStore.fetchListCompanions(apiUrl);

watchEffect(async () => {
  // await menuStore.fetchListCompanions(apiUrl);
  const data = menuStore.getListStudents;
  if (data?.length > 0) {
    dataCompanios.value = menuStore.getListStudents;
  }
});

const eventClickMeta = (text, url) => {
  if (dataLayer) {
    dataLayer.push({
      event: 'Ver_Mi_Meta',
      name: 'Evento_Ver_Mi_Meta',
      Click_Text: text,
      url,
    });
  }
};

const isOpen = true;
const haveLink = true;
</script>
<template>
  <div class="lg:flex flex-col gap-6">
    <BannerJournal />
    <div class="lg:flex items-center justify-between lg:w-[1023px] mx-auto gap-5 pb-[28px]">
      <div>
        <h1
          class="text-[#191919] text-[28px] lg:text-[32px] font-bold font-solano uppercase leading-8 lg:leading-none lg:whitespace-nowrap mb-1 w-full"
        >
          Welcome, {{ nameUser }}
        </h1>
        <p class="text-[#191919] text-[18px] leading-6 lg:pb-[18px] pb-9 mt-2 whitespace-nowrap">
          <span class="bg-[#553037] text-white px-1.5 py-1 rounded-[4px] mr-2">
            {{ courseName }}
          </span>
        </p>
      </div>
      <div
        class="bg-white shadow-[0_0_20px_0_rgba(77,39,37,0.25)] h-[220px] lg:h-[71px] px-6 lg:px-5 py-5 lg:py-2 w-full lg:flex lg:flex-row flex-col justify-center items-center rounded-lg triangle relative"
      >
        <div class="lg:w-[70px] mb-4 lg:mb-0">
          <client-only>
            <Vue3Lottie
              v-if="selectedImage !== ''" :animation-link="selectedImage"
              :height="55" width="auto"
              class="lg:min-h-[55px] min-h-[87px] w-auto"
            />
            <!-- <img v-if="selectedImage !== ''" :src="selectedImage" class="lg:min-h-[55px] min-h-[87px] max-h-[100px] w-auto" /> -->
          </client-only>
          <client-only>
            <Vue3Lottie
              v-if="selectedImage === ''" :animation-link="anotherImage"
              :height="55" width="auto"
              class="lg:min-h-[55px] min-h-[87px] w-auto"
            />
            <!-- <img v-if="selectedImage === ''" :src="anotherImage" class="lg:min-h-[55px] min-h-[87px] max-h-[100px] w-auto" /> -->
          </client-only>
        </div>
        <div class="lg:w-[calc(100%-100px)] w-full flex items-center justify-between">
          <div class="px-3">
            <p class="text-[#404040] text-sm font-bold">Meta:</p>
            <p v-if="metaText !== ''" class="text-sm text-[#404040] font-light">
              {{ metaText }}
            </p>
            <p v-if="dataMeta !== null && metaText === ''" class="text-sm text-[#A6A6A6] font-light">
              Cuéntanos tu meta al estudiar inglés, y alcancémosla juntos 🏁🏆
            </p>
          </div>
          <router-link @click="eventClickMeta('Ver meta', '/meta')" to="/meta" class="inline-block w-[30px]">
            <i class="icon-edit text-xl text-[#595959]" />
          </router-link>
        </div>
      </div>
    </div>
    <div class="lg:w-[1023px] mx-auto">
      <div class="lg:flex gap-[28px]">
        <div class="min-w-[calc(70%-28px)] mb-6 lg:mb-0">
          <div class="lg:flex gap-[28px]">
            <div class="lg:w-[50%] mb-5">
              <Beyond />
            </div>
            <div class="lg:w-[50%]">
              <NoteBox inasistencia="2" :dashboard="true" />
            </div>
          </div>
          <div>
            <SyllabusBox :open="isOpen" :link="haveLink" :fetch-courses-data="false" />
          </div>
        </div>
        <!-- <div  class="min-w-[calc(28%-24px)]">
          <HelpBox />
        </div> -->
        <div class="min-w-[calc(30%-28px)] mb-6 lg:mb-0">
          <TeacherBox />
          <ListCompanions :data-companions="dataCompanios" />
          <HelpBox />
        </div>
      </div>
    </div>
  </div>
</template>
