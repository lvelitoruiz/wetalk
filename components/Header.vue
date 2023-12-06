<script setup>
import { useUserStore } from "~/stores/auth";
const userStore = useUserStore();

const nameUser = userStore.getUserData?.name;
const pres = ref(false);
const nots = ref(false);

const foto = ref(null);

onMounted(() => {
  openPres();
});

const openClose = () => {
  pres.value = false;
  nots.value = !nots.value;
};

const showSidebar = ref(false);

const openMenu = () => {
  showSidebar.value = !showSidebar.value;
};

const showOption = ref(false);
const openList = () => {
  showOption.value = !showOption.value;
};

const openPres = () => {
  const showIn = localStorage.getItem("presOpened");
  if (showIn == null) {
    localStorage.setItem("presOpened", "true");
    pres.value = true;
    setTimeout(() => {
      pres.value = false;
    }, 5000);
  }
};

onMounted(() => {
  foto.value = localStorage.getItem("foto");
});
</script>

<template>
  <div
    class="bg-white shadow-md w-screen h-[68px] lg:h-20 fixed flex top-0 left-0 z-20 px-[23px] lg:px-7 justify-between">
    <div class="flex">
      <button class="lg:hidden mr-2" @click="openMenu">
        <i class="text-[28px] text-[#191919] icon-nav"></i>
      </button>
      <div class="absolute w-full h-[100vh] left-0 bg-black bg-opacity-60 z-50" v-show="showSidebar">
        <div class="bg-[#E6F0FF] w-[83%] pt-10 h-[100vh] flex items-start">
          <SidebarContainer />
          <button @click="openMenu">
            <i class="icon-close"> </i>
          </button>
        </div>
      </div>
      <RouterLink to="/" class="h-full flex justify-center items-center">
        <img class="lg:h-[39px] h-7" src="@/assets/images/logo.svg" alt="" />
      </RouterLink>
    </div>
    <div class="flex items-center">
      <div class="lg:pr-[63px] pr-[21px]">
        <div class="flex items-center gap-[28px]">
          <button class="hidden lg:block">
            <a href="https://outlook.live.com/" target="_blank">
              <i class="text-3xl text-[#191919] icon-email"></i></a>
          </button>
          <div class="relative">
            <Bell @show="openClose" />
            <Transition>
              <PreNotifications v-if="pres" @close="pres = false" />
            </Transition>
            <Transition>
              <Notifications v-if="nots" @close="nots = false" />
            </Transition>
          </div>
        </div>
      </div>
      <div class="lg:pr-[28px]">
        <div class="flex items-center cursor-pointer gap-2">
          <p class="text-[#191919] text-sm font-zizou-bold hidden lg:block">
            {{ nameUser }}
          </p>
          <div class="w-10 h-10 overflow-hidden rounded-full border border-gray-300">
            <RouterLink to="/meta" class="h-full flex justify-center items-center">
              <img class="h-full w-full object-cover" :src="foto" alt="" />
            </RouterLink>
          </div>
          <button class="hidden lg:block" @click="openList">
            <i class="icon-arrow-down text-[#191919]"></i>
          </button>
          <div class="absolute bg-white bottom-[-109px] lg:right-10 right-[23px] shadow-[0_0_20px_0_rgba(77,39,37,0.20)] min-w-[180px] " v-show="showOption">
            <div class="mx-6 divide-[#D9D9D9] divide-y">
                <router-link class="flex items-center pb-[15.5px] pt-1 leading-5 text-[#666666]" to="/meta.vue">
                  <i class="icon-user mr-2 text-[#026849] text-xl"></i>
                  Mi perfil
                </router-link>
              <div class=" py-[15.5px] text-[#E50A17]">
                <i class="hidden lg:inline icon-logOut mr-2 text-xl"></i>
                <i class="lg:hidden icon-logOut2 mr-2 text-xl"></i>
                <Logout></Logout>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="hidden lg:flex items-center gap-2">
        <button
          class="text-[#737373] font-semibold font-solano border-b border-[#E50A17]"
        >
          ES
        </button>
        <span class="w-[1px] bg-[#737373] h-[12px]"></span>
        <button class="text-[#737373] font-semibold font-solano">EN</button>
      </div> -->
    </div>
  </div>
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