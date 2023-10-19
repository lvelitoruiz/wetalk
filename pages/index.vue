<script setup ts>
import { computed, watchEffect } from "vue";
import { apiKey, apiUrl, apiUrlAlter } from "~/consts";
import { useMetaStore } from "../stores/meta";
import { useMenuStore } from '../stores/menu'

const metaStore = useMetaStore();
const menuStore = useMenuStore()
const metaData = ref(null);
const imagesData = ref(null);
const accesoData = ref(null);
const menuData = ref(null);
const ayudaData = ref(null);
const syllabusData = ref(null);

const selectedImage = ref(
  "https://wetalk-directus-dev-upc.stage01.link/assets/b2155346-5f91-4749-91cb-77c50355c1e0"
);

const fetchMetaInfo = async () => {
  await metaStore.fetchMetaData(apiUrl, apiKey, "U2020201234178");
  await metaStore.obtainImages(apiUrl);
  await menuStore.fetchMenuData(apiUrl,apiKey)
  await menuStore.fetchAccesoDirectoData(apiUrlAlter, apiKey)
  await menuStore.fetchAyudaData(apiUrlAlter, apiKey)
  await menuStore.fetchContenidoData(apiUrlAlter, apiKey)
};

onMounted(async () => {
  await fetchMetaInfo();
});

const handleOpen = () => {
    navigateTo('/dashboard');
}

const handleOpenLogin = () => {
    navigateTo('/login');
}

const allDataLoaded = computed(() => {
  return (
    metaData.value !== null &&
    imagesData.value !== null &&
    menuData.value !== null &&
    ayudaData.value !== null &&
    syllabusData.value !== null &&
    accesoData.value !== null
  );
});

watchEffect(() => {
  const data = metaStore.getMetaData;
  if (data) {
    metaData.value = data[0];
  }
  const images = metaStore.getImages;
  if(images) {
    imagesData.value = images;
  }
  const menu = menuStore.getMenuItems;
  if(menu) {
    menuData.value = menu;
  }
  const acceso = menuStore.getAccesoItems;
  if(acceso) {
    accesoData.value = acceso;
  }
  const ayuda = menuStore.getAyudaItems;
  if(ayuda) {
    ayudaData.value = acceso;
  }
  const syllabus = menuStore.getContenidoItems;
  if(syllabus) {
    syllabusData.value = acceso;
  }

  if (allDataLoaded.value) {
    handleOpen();
  }
});

</script>
<template>
  <section class="container mx-auto relative px-4">
    <div class="w-full h-screen flex items-center justify-center flex-col">
      <a class="absolute top-[40px] left-4"  @click="handleOpenLogin">
        <img class="h-[39px]" src="@/assets/images/logo.svg" alt="" />
      </a>
      <div class="block min-h-[260px]">
        <img class="h-auto w-80" :src="selectedImage" alt="" />
      </div>
      <div
        class="relative min-w-[20px] text-center py-10 min-h-[78px] box-content"
      >
        <Transition>
          <div v-if="metaData !== null">
            <p class="text-[#344D47] text-[24px]">Tu meta:</p>
            <p
              class="text-[#344D47] text-[28px] uppercase font-bold font-solano"
            >
              {{ metaData.meta }}
            </p>
          </div>
        </Transition>
      </div>
      <div
        class="bg-[#F2F2F2] relative rounded-full h-[10px] w-full max-w-[615px]"
      >
        <div
          class="bg-[#E50A17] absolute rounded-full top-0 left-0 h-[10px] bottom-0 transition-all duration-300 ease-in-out"
          :class="{
            'w-[0%] transition-all duration-500 ease-in-out':  metaData === null,
            'w-[20%] transition-all duration-500 ease-in-out':  metaData !== null,
            'w-[50%] transition-all duration-500 ease-in-out':  metaData !== null &&  imagesData !== null,
            'w-[75%] transition-all duration-500 ease-in-out':  metaData !== null &&  imagesData !== null && menuData !== null,
            'w-full transition-all duration-500 ease-in-out':  metaData !== null &&  imagesData !== null && menuData !== null && accesoData !== null,
          }"
        @click="handleOpen"
        ></div>
      </div>
    </div>
  </section>
</template>
<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.7s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
