<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  lists: Array,
});

const eventClickBarraSuperior = (text) => {
    if(dataLayer){
        dataLayer.push({
            event: 'Clics_Barra_Superior',
            'name': 'Evento_clics_barra-superior',
            'Click_text': text
        })
    }
};
</script>

<template>
  <header
    class="bg-white fixed z-50 top-0 w-full h-[80px] flex items-center shadow-[0_1px_24px_0_rgba(203,213,220,0.40)] font-solano"
  >
    <div class="container mx-auto flex justify-between items-center px-10 md:px-10">
      <div class="lg:flex items-center gap-[28px] hidden">
      <nav>
        <ul class="flex items-center gap-[49px]">
          <li v-for="(list, index) in lists" :key="index">
            <a @click="eventClickBarraSuperior(list.title)" class="text-xl uppercase font-bold text-[#191919]"
              :href="list.id"
            >
              {{ list.title }}
            </a>
          </li>
        </ul>
      </nav>
    </div>
    <a class="ml-[36px]" href="">
      <img class="h-[36px]" src="@/assets/images/logo.svg" alt="" />
    </a>
    </div>
  </header>
</template>