<template>
  <header
    class="bg-white fixed z-50 top-0 w-full flex justify-between items-center h-[80px] px-10 md:px-10 xl:px-20 shadow-[0_1px_24px_0_rgba(203,213,220,0.40)] font-solano"
  >
    <div class="lg:flex items-center gap-[28px] hidden">
      <nav>
        <ul class="flex items-center gap-[49px]">
          <li v-for="(list, index) in lists" :key="index">
            <a
              class="text-xl uppercase font-bold text-[#191919]"
              :href="list.id"
            >
              {{ list.title }}
            </a>
          </li>
        </ul>
      </nav>
      

      <!-- <div class="flex items-center gap-2 mr-[36px]">
        <button class="text-[#737373] font-bold border-b border-[#E50A17]">
          ES
        </button>
        <span class="w-[1px] bg-[#737373] h-[12px]"></span>
        <button class="text-[#737373] font-bold">EN</button>
      </div> -->
    </div>
    <a class="ml-[36px]" href="">
      <img class="h-[36px]" src="@/assets/images/logo.svg" alt="" />
    </a>
  </header>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const emit = defineEmits();

const props = defineProps({
  lists: Array,
});

const triggerModal = () => {
  emit("modal-open");
};
</script>

<style>
</style>