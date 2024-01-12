<template>
  <div
    class="hidden lg:flex items-center w-full lg:w-[1023px] mx-auto pb-[18px] gap-[6px]"
  >
  <router-link class="text-[#575759] text-[15px] underline" to="/dashboard"
  >Inicio</router-link
>
    <div class="relative" v-if="subPage" @click="goBack()">
      <span class="text-[#575759] text-[15px]">> </span>
      <span class="text-[#575759] text-[15px] underline cursor-pointer"> {{ subPage }} </span>
    </div>
    <span class="text-[#575759] text-[15px]">></span>
    <span class="text-[#575759] text-[15px]"> {{ page }} </span>
  </div>
  <div class="lg:hidden flex items-center w-full mx-auto pb-[18px] gap-[6px]">
    <i class="icon-arrow-right rotate-180"></i>
    <router-link class="text-[#575759] text-[15px] underline" to="/dashboard"
      >Atrás</router-link
    >
  </div>
</template>

<script setup>
  const router = useRouter();
  const props = defineProps({
    page: String,
    subPage: {
      type: String,
      default: undefined,
    }
  });

  const goBack = () => {
    router.go(-1);
  };
</script>



<style>
</style>