<!-- eslint-disable @typescript-eslint/no-confusing-void-expression -->
<!-- eslint-disable no-undef -->
<!-- eslint-disable @typescript-eslint/no-unsafe-argument -->
<!-- eslint-disable @typescript-eslint/no-floating-promises -->
<script setup ts>
import { computed, ref, watchEffect, onBeforeMount, onMounted } from 'vue';
import { apiUrl } from '~/consts';
import { useMetaStore } from '../stores/meta';
import { useMenuStore } from '../stores/menu';

definePageMeta({
  middleware: 'auth',
});

const metaStore = useMetaStore();
const menuStore = useMenuStore();
const metaData = ref(null);
const imagesData = ref(null);
const accesoData = ref(null);
const menuData = ref(null);
const referenceData = ref(false);

const keyMeta = ref(false);
const keyImages = ref(false);
const keyMenu = ref(false);
const keyAcceso = ref(false);
const keyContenido = ref(false);
const keyProfile = ref(false);

const selectedImage = ref('');

const anotherImage = ref('');

const fetchMetaInfo = async () => {
  metaStore.fetchMetaData(apiUrl).then((response) => (keyMeta.value = true));
  metaStore.obtainImages(apiUrl).then((response) => (keyImages.value = true));
  menuStore.fetchMenuData(apiUrl).then((response) => (keyMenu.value = true));
  menuStore
    .fetchAccesoDirectoData(apiUrl)
    .then((response) => (keyAcceso.value = true));

  const profiler = await menuStore.fetchProfileData(apiUrl).then((response) => {
    keyProfile.value = true;
    const profileData = menuStore.getProfileItems?.data[0];
    if (menuStore.getProfileItems?.data?.length > 0 && dataLayer) {
      dataLayer.push({
        event: 'login',
        name: 'Login_Wetalk',
        modalidad: profileData?.codModalidadEstActual,
        carrera: profileData?.desProducto,
        ciclo: profileData?.descCurso,
        codigoAlumno: profileData?.codAlumno,
        institucion: profileData?.institucion,
      });
    }
  });
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
  navigateTo('/dashboard');
};

const handleOpenLogin = () => {
  // console.log('yeah all is there!');
  navigateTo('/login');
};

const allDataLoaded = computed(() => {
  return (
    keyMeta.value &&
    keyImages.value &&
    keyMenu.value &&
    keyAcceso.value &&
    keyProfile.value
  );
});

watchEffect(async () => {
  const data = metaStore.getMetaData;
  if (data && data.length > 0) {
    referenceData.value = true;
    metaData.value = data;
    if (data[0].imagen !== '') {
      selectedImage.value = data[0].imagen;
    }
  } else {
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

  const profile = menuStore.getProfileItems;
  if (profile.data !== undefined) {
    localStorage.setItem('periodo', profile.data[0].periodo);
    localStorage.setItem('curso', profile.data[0].salon);
    localStorage.setItem('seccion', profile.data[0].seccion);
    localStorage.setItem('foto', profile.data[0].fotoUrl);
    localStorage.setItem('carrera', profile.data[0].desProducto);
  }

  if (allDataLoaded.value) {
    handleOpen();
  }
});
</script>
<template>
  <section class="container mx-auto relative px-4">
    <div class="w-full h-screen flex items-center justify-center flex-col">
      <div class="block min-h-[260px]">
        <!-- <img class="h-auto w-80" :src="selectedImage" alt="" /> -->
        <client-only>
          <div v-if="selectedImage !== null && selectedImage !== ''">
            <Vue3Lottie
              :animation-link="selectedImage"
              :height="200"
              :width="255"
              class="min-w-[255px] h-auto"
            />
            <!-- <img :src="selectedImage" class="min-w-[255px] h-auto" /> -->
          </div>
          <div v-else>
            <Vue3Lottie
              :animation-link="anotherImage"
              :height="200"
              :width="255"
              class="min-w-[255px] h-auto"
            />
          </div>
        </client-only>
      </div>
      <div
        class="relative min-w-[20px] text-center py-10 min-h-[78px] box-content"
      >
        <Transition>
          <div v-if="metaData !== null">
            <div v-if="metaData.length > 0 && metaData[0]?.meta !== ''">
              <!-- <div v-if="metaData !== null && metaData[0]?.meta !== ''"> -->
              <p class="text-[#344D47] lg:text-[24px] text-base">Tu meta:</p>
              <p
                class="text-[#344D47] lg:text-[28px] text-[18px] uppercase font-bold font-solano"
              >
                {{ metaData[0]?.meta }}
              </p>
            </div>
          </div>
        </Transition>
        <div
          v-if="
            metaData === null ||
              metaData.length <= 0 ||
              metaData[0]?.meta === ''
          "
        >
          <p class="text-[#344D47] text-[28px] uppercase font-bold font-solano">
            Iniciando sesión...
          </p>
        </div>
      </div>
      <div
        class="bg-[#F2F2F2] relative rounded-full h-[10px] w-full max-w-[615px]"
      >
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
              accesoData !== null,
            'w-full transition-all duration-500 ease-in-out':
              metaData !== null &&
              imagesData !== null &&
              menuData !== null &&
              accesoData !== null,
          }"
          @click="handleOpen"
        />
      </div>
      <a class="absolute top-[40px] right-4" @click="handleOpenLogin">
        <img
          class="h-[39px]"
          src="@/assets/images/wetalk_logo_upn.svg"
          alt=""
        />
      </a>
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
