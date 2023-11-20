<script setup ts>
import { computed, watchEffect } from "vue";
import { apiKey, apiUrl } from "~/consts";
import { useMetaStore } from "../stores/meta";
import { useMenuStore } from "../stores/menu";

definePageMeta({
  middleware: 'auth'
});

const metaStore = useMetaStore();
const menuStore = useMenuStore();
const metaData = ref(null);
const imagesData = ref(null);
const accesoData = ref(null);
const menuData = ref(null);
const ayudaData = ref(null);
const syllabusData = ref(null);
const notasData = ref(null);
const faltasData = ref(null);
const notificationData = ref(null);

const keyMeta = ref(false);
const keyImages = ref(false);
const keyMenu = ref(false);
const keyAcceso = ref(false);
const keyAyuda = ref(false);
const keyContenido = ref(false);
const keyNotification = ref(false);
const keyProfile = ref(false);

const selectedImage = ref(
  "https://adminmi-dev-wetalk.stage01.link/assets/539598d5-1540-45ae-8d36-d1d5e7634430"
);

const fetchMetaInfo = async () => {
  await metaStore
    .fetchMetaData(apiUrl, apiKey)
    .then((response) => (keyMeta.value = true));
  await metaStore
    .obtainImages(apiUrl)
    .then((response) => (keyImages.value = true));
  await menuStore
    .fetchMenuData(apiUrl, apiKey)
    .then((response) => (keyMenu.value = true));
  await menuStore
    .fetchAccesoDirectoData(apiUrl, apiKey)
    .then((response) => (keyAcceso.value = true));
  await menuStore
    .fetchAyudaData(apiUrl, apiKey)
    .then((response) => (keyAyuda.value = true));
  await menuStore
    .fetchContenidoData(apiUrl, "0")
    .then((response) => (keyContenido.value = true));
  await menuStore
    .fetchNotificationData(apiUrl, "0")
    .then((response) => (keyNotification.value = true));
  const profiler = await menuStore
    .fetchProfileData(apiUrl)
    .then((response) => (keyProfile.value = true));
  
};

onBeforeMount(() => {
  localStorage.removeItem('menu');
  localStorage.removeItem('meta');
  localStorage.removeItem('scheduleState');
});

onMounted(async () => {
  await fetchMetaInfo();
});

const handleOpen = () => {
  // console.log('managing redirection!!');
  navigateTo("/dashboard");
};

const handleOpenLogin = () => {
  // console.log('yeah all is there!');
  navigateTo("/login");
};

const allDataLoaded = computed(() => {
  // return (
  //   metaData.value !== null &&
  //   imagesData.value !== null &&
  //   menuData.value !== null &&
  //   ayudaData.value !== null &&
  //   syllabusData.value !== null &&
  //   accesoData.value !== null
  // );
  // console.log(
  //   "loaded: ",
  //   keyMeta.value &&
  //     keyImages.value &&
  //     keyMenu.value &&
  //     keyAcceso.value &&
  //     keyAyuda.value &&
  //     keyContenido.value
  // );
  // console.log(keyMeta.value,keyImages.value,keyMenu.value,keyAcceso.value,keyContenido.value,keyNotification.value);
  return (
    keyMeta.value &&
    keyImages.value &&
    keyMenu.value &&
    keyAcceso.value &&
    keyAyuda.value &&
    keyContenido.value &&
    keyProfile.value &&
    keyNotification.value 
  );
});

watchEffect(async () => {
  const data = metaStore.getMetaData;
  if (data) {
    metaData.value = data;
    selectedImage.value = data[0].imagen;
  }
  const images = metaStore.getImages;
  if (images) {
    imagesData.value = images;
  }
  const menu = menuStore.getMenuItems;
  if (menu) {
    menuData.value = menu;
  }
  const acceso = menuStore.getAccesoItems;
  if (acceso) {
    accesoData.value = acceso;
  }
  const ayuda = menuStore.getAyudaItems;
  if (ayuda) {
    ayudaData.value = ayuda;
  }
  const syllabus = menuStore.getContenidoItems;
  if (syllabus) {
    syllabusData.value = syllabus;
  }

  const profile = menuStore.getProfileItems;
  if (profile) {
    console.log('the profile data: ',profile.data[0]);
    localStorage.setItem('periodo',profile.data[0].periodo);
    localStorage.setItem('curso',profile.data[0].salon);
    localStorage.setItem('seccion',profile.data[0].seccion);
    localStorage.setItem('foto',profile.data[0].fotoUrl);
  }

  // console.log('with value: ',allDataLoaded.value);

  if (allDataLoaded.value === true) {
    handleOpen();
  }
});
</script>
<template>
  <section class="container mx-auto relative px-4">
    <div class="w-full h-screen flex items-center justify-center flex-col">
      <a class="absolute top-[40px] left-4" @click="handleOpenLogin">
        <img class="h-[39px]" src="@/assets/images/logo.svg" alt="" />
      </a>
      <div class="block min-h-[260px]">
        <!-- <img class="h-auto w-80" :src="selectedImage" alt="" /> -->
        <client-only>
          <Vue3Lottie :animationLink="selectedImage" :height="200" :width="255" class="min-w-[255px] h-auto" />
        </client-only>
      </div>
      <div class="relative min-w-[20px] text-center py-10 min-h-[78px] box-content">
        <Transition>
          <div v-if="metaData !== null">
            <p class="text-[#344D47] text-[24px]">Tu meta:</p>
            <p class="text-[#344D47] text-[28px] uppercase font-bold font-solano">
              {{ metaData[0].meta }}
            </p>
          </div>
        </Transition>
      </div>
      <div class="bg-[#F2F2F2] relative rounded-full h-[10px] w-full max-w-[615px]">
        <div
          class="bg-[#E50A17] absolute rounded-full top-0 left-0 h-[10px] bottom-0 transition-all duration-300 ease-in-out"
          :class="{
            'w-[0%] transition-all duration-500 ease-in-out': metaData === null,
            'w-[15%] transition-all duration-500 ease-in-out':
              metaData !== null,
            'w-[35%] transition-all duration-500 ease-in-out':
              metaData !== null && imagesData !== null,
            'w-[50%] transition-all duration-500 ease-in-out':
              metaData !== null && imagesData !== null && menuData !== null,
            'w-[70%] transition-all duration-500 ease-in-out':
              metaData !== null &&
              imagesData !== null &&
              menuData !== null &&
              accesoData !== null,
            'w-[85%] transition-all duration-500 ease-in-out':
              metaData !== null &&
              imagesData !== null &&
              menuData !== null &&
              ayudaData !== null &&
              accesoData !== null,
            'w-full transition-all duration-500 ease-in-out':
              metaData !== null &&
              imagesData !== null &&
              ayudaData !== null &&
              syllabusData !== null &&
              menuData !== null &&
              accesoData !== null,
          }" @click="handleOpen"></div>
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
