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
  if (data.length > 0) {
    console.log('this is the data: ',data,data.length);
    selectedImage.value = data[0].imagen;
    metaText.value = data[0].meta;
  }
});

const isOpen = true;
const haveLink = true;
</script>
<template>
  <div class="flex items-center w-[1023px] mx-auto pb-[18px] gap-[6px]">
    <router-link class="text-[#575759] text-[15px] underline" to="/calendar"
      >Inicio</router-link
    >
    <span class="text-[#575759] text-[15px]">></span>
    <span class="text-[#575759] text-[15px]">Dashboard</span>
  </div>
  <div class="flex flex-col gap-6">
    <div class="flex items-center w-[1023px] mx-auto gap-5 pb-[28px]">
      <div>
        <h1
          class="text-[#191919] text-[32px] font-bold font-solano uppercase whitespace-nowrap"
        >
          Welcome, {{ nameUser }}
        </h1>
        <p class="text-[#191919] text-[18px] whitespace-nowrap">
          Inglés 1 | Lun y Mar 19:00h - 22:00h
        </p>
      </div>

      <div
        class="bg-white shadow-[0_0_20px_0_rgba(77,39,37,0.25)] h-[71px] px-5 py-2 w-full flex items-center rounded-lg triangle relative"
      >
        <div class="w-[70px]">
          <client-only>
            <Vue3Lottie
              v-if="selectedImage !== ''"
              :animationLink="selectedImage"
              :height="55"
              :width="auto"
              class="min-h-[55px] w-auto"
            />
          </client-only>
        </div>
        <div class="w-[calc(100%-100px)] px-3">
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
    <div class="w-[1023px] mx-auto">
      <div class="flex gap-[28px]">
        <div class="min-w-[36%]">
          <NoteBox inasistencia="2" dashboard="true" />
        </div>
        <div  class="min-w-[calc(32%-28px)]">
          <TeacherBox />
        </div>
        <div  class="min-w-[calc(32%-28px)]">
          
        </div>
      </div>
      <div class="flex gap-[28px]">
        <SyllabusBox :open="isOpen" :link="haveLink" />
        <HelpBox />
      </div>
    </div>
  </div>
</template>
