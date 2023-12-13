<script setup ts>
import { computed, watchEffect } from "vue";
import { apiUrl } from "~/consts";
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
const referenceData = ref(false);

const keyMeta = ref(false);
const keyImages = ref(false);
const keyMenu = ref(false);
const keyAcceso = ref(false);
const keyAyuda = ref(false);
const keyContenido = ref(false);
const keyNotification = ref(false);
const keyProfile = ref(false);

const selectedImage = ref(
  ""
);

const anotherImage = ref(
  ""
);

const fetchMetaInfo = async () => {
  await metaStore
    .fetchMetaData(apiUrl)
    .then((response) => (keyMeta.value = true));
  await metaStore
    .obtainImages(apiUrl)
    .then((response) => (keyImages.value = true));
  await menuStore
    .fetchMenuData(apiUrl)
    .then((response) => (keyMenu.value = true));
  await menuStore
    .fetchAccesoDirectoData(apiUrl)
    .then((response) => (keyAcceso.value = true));
  await menuStore
    .fetchAyudaData(apiUrl)
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
  console.log('checking if I am on certification!');
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
  if (data && data.length > 0) {
    referenceData.value = true;
    console.log('metadata values: ', data.length);
    metaData.value = data;
    if(data[0].imagen !== '') {
      selectedImage.value = data[0].imagen;
    };
  } else {
    console.log('no metadata values: ', data?.length);
    referenceData.value = false;
    metaData.value = data;
  }
  const images = metaStore.getImages;
  if (images) {
    anotherImage.value = images[0].imagen;
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
  if (profile.data !== undefined) {
    console.log('the profile data: ', profile.data);
    localStorage.setItem('periodo', profile.data[0].periodo);
    localStorage.setItem('curso', profile.data[0].salon);
    localStorage.setItem('seccion', profile.data[0].seccion);
    localStorage.setItem('foto', profile.data[0].fotoUrl);
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
          <div v-if="selectedImage !== null && selectedImage !== ''">
            <Vue3Lottie :animationLink="selectedImage" :height="200" :width="255" class="min-w-[255px] h-auto" />
            <!-- <img :src="selectedImage" class="min-w-[255px] h-auto" /> -->
          </div>
          <div v-else>
            <Vue3Lottie :animationLink="anotherImage" :height="200" :width="255" class="min-w-[255px] h-auto" />
          </div>
        </client-only>
      </div>
      <div class="relative min-w-[20px] text-center py-10 min-h-[78px] box-content">
        <Transition>
          <div v-if="metaData !== null">
            <div v-if="metaData.length > 0 && metaData[0]?.meta !== ''">
            <!-- <div v-if="metaData !== null && metaData[0]?.meta !== ''"> -->
              <p class="text-[#344D47] lg:text-[24px] text-base">Tu meta:</p>
              <p class="text-[#344D47] lg:text-[28px] text-[18px] uppercase font-bold font-solano">
                {{ metaData[0]?.meta }}
              </p>
            </div>
          </div>
        </Transition>
        <div v-if="metaData === null || metaData.length <= 0 || metaData[0]?.meta === ''">
          <p class="text-[#344D47] text-[28px] uppercase font-bold font-solano">
            Iniciando sesión...
          </p>
        </div>
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
