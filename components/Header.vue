<script setup>
import { useUserStore } from "~/stores/auth";
const userStore = useUserStore();

const nameUser = userStore.getUserData?.name
const pres = ref(false);
const nots = ref(false);

const foto = ref(null);

onMounted(() => {
    openPres();
});

const openClose = () => {
    pres.value = false;
    nots.value = !nots.value;
}

const showOption = ref(false)
const openList = () => {
    showOption.value = !showOption.value
}

const openPres = () => {
    const showIn = localStorage.getItem('presOpened');
    if (showIn == null) {
        localStorage.setItem('presOpened', 'true');
        pres.value = true;
        setTimeout(() => {
            pres.value = false;
        }, 5000);
    }
}

onMounted( () => {
    foto.value = localStorage.getItem('foto');
});

</script>

<template>
    <div class="bg-white shadow-md w-screen h-20 fixed flex top-0 left-0 z-20 px-7 justify-between">
        <RouterLink to="/" class="h-full flex justify-center items-center">
            <img class="h-[39px]" src="@/assets/images/logo.svg" alt="">
        </RouterLink>
        <div class="flex items-center">
            <div class="pr-[63px]">
                <div class="flex items-center gap-[28px]">
                    <button>
                        <i class="text-3xl text-[#191919] icon-email"></i>
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
            <div class="pr-[28px]">
                <div class="flex items-center cursor-pointer gap-2">
                    <p class="text-[#191919] text-sm font-zizou-bold">{{ nameUser }}</p>
                    <div class="w-10 h-10 overflow-hidden rounded-full border border-gray-300">
                        <img class="h-auto w-auto object-cover" :src="foto" alt="">
                    </div>
                    <button @click="openList">
                        <i class="icon-arrow-down text-[#191919]"></i>
                    </button>
                    <div v-show="showOption">
                        <Logout></Logout>
                    </div>

                </div>
            </div>
            <div class="flex items-center gap-2">
                <button class="text-[#737373] font-semibold font-solano border-b border-[#E50A17]">ES</button>
                <span class="w-[1px] bg-[#737373] h-[12px]"></span>
                <button class="text-[#737373] font-semibold font-solano">EN</button>
            </div>
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