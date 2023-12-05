<script setup>
import { useMetaStore } from "../stores/meta";
import { useUserStore } from "~/stores/auth";
const userStore = useUserStore();

const nameUser = userStore.getUserData?.name;
const selectedImage = ref(
  "https://adminmi-dev-wetalk.stage01.link/assets/e0ff1dd0-0ec1-4d66-9c19-a2eb1006d9b0"
);
const metaText = ref("Cuéntanos tu meta al estudiar inglés, y alcancémosla juntos 🏁🏆");

const metaStore = useMetaStore();

watchEffect(() => {
  const data = metaStore.getMetaData;
  if (data?.length > 0) {
    // console.log('this is the data: ',data,data.length);
    selectedImage.value = data[0].imagen;
    metaText.value = data[0].meta;
  }
});

const isOpen = true;
const haveLink = true;
</script>
<template>
  <div class="lg:flex hidden items-center lg:w-[1023px] mx-auto pb-[18px] gap-[6px]">
    <router-link class="text-[#575759] text-[15px] underline" to="/calendar"
      >Inicio</router-link
    >
    <span class="text-[#575759] text-[15px]">></span>
    <span class="text-[#575759] text-[15px]">Dashboard</span>
  </div>
  <div class="lg:flex flex-col gap-6">
    <div class="lg:flex items-center lg:w-[1023px] mx-auto gap-5 pb-[28px]">
      <div>
        <h1
          class="text-[#191919] text-[28px] lg:text-[32px] font-bold font-solano uppercase leading-8 lg:leading-none lg:whitespace-nowrap mb-1 w-full"
        >
          Welcome, {{ nameUser }}
        </h1>
        <p class="text-[#191919] text-[18px] leading-6 lg:pb-[18px] pb-9 whitespace-nowrap">
         <span class="bg-[#553037] text-white px-1.5 py-1 rounded-[4px] mr-2"> Inglés 1 </span>  Lun y Mar 19:00h - 22:00h
        </p>
      </div>

      <div
      class="bg-white shadow-[0_0_20px_0_rgba(77,39,37,0.25)] h-[203px] lg:h-[71px] px-6 lg:px-5 py-5 lg:py-2 w-full lg:flex lg:flex-row flex-col justify-center items-center rounded-lg triangle relative"
      >
        <div class="lg:w-[70px] mb-4 lg:mb-0">
          <client-only>
            <Vue3Lottie
              v-if="selectedImage !== ''"
              :animationLink="selectedImage"
              :height="55"
              :width="auto"
              class="lg:min-h-[55px] min-h-[87px]  w-auto"
            />
          </client-only>
        </div>
        <div class="lg:w-[calc(100%-100px)] w-full flex items-center">
          <div class=" px-3">
            <p class="text-[#404040] text-sm font-bold">Meta:</p>
            <p v-if="metaText !== ''" class="text-sm text-[#404040] font-light">
              {{ metaText }}
            </p>
            <p v-if="metaText === ''" class="text-sm text-[#A6A6A6] font-light">
              Cuéntanos tu meta al estudiar inglés, y alcancémosla juntos 🏁🏆
            </p>
          </div>
          <router-link to="/meta" class="inline-block w-[30px]">
            <i class="icon-edit text-xl text-[#595959]"></i>
          </router-link>
        </div>
      </div>
    </div>
    <div class="lg:w-[1023px] mx-auto">
      <div class="lg:flex gap-[28px]">
        <div class="min-w-[36%]">
          <NoteBox inasistencia="2" dashboard="true" />
        </div>
        <div  class="min-w-[calc(32%-28px)] mb-6 lg:mb-0">
          <TeacherBox />
        </div>
        <div  class="min-w-[calc(32%-28px)]">
          
        </div>
      </div>
      <div class="lg:flex gap-[28px]">
        <SyllabusBox :open="isOpen" :link="haveLink" />
        <HelpBox />
      </div>
    </div>
  </div>
</template>
