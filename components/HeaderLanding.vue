<!-- eslint-disable no-undef -->
<!-- eslint-disable vue/require-default-prop -->
<script setup>
import { defineProps, ref } from 'vue'

const props = defineProps({
  lists: Array
})

const showSidebar = ref(false)

const openMenu = () => {
  showSidebar.value = !showSidebar.value
}

const eventClickBarraSuperior = (text) => {
  if (dataLayer) {
    dataLayer.push({
      event: 'Clics_Barra_Superior',
      name: 'Evento_clics_barra-superior',
      Click_text: text
    })
  }
}
</script>

<template>
  <header
    class="bg-white fixed z-50 top-0 w-full h-[80px] flex items-center shadow-[0_1px_24px_0_rgba(203,213,220,0.40)] font-solano"
  >
    <div
      class="container mx-auto flex justify-between items-center px-10 md:px-10"
    >
      <div class="lg:flex items-center gap-[28px] hidden">
        <nav>
          <ul class="flex items-center gap-[49px]">
            <li
              v-for="(list, index) in lists"
              :key="index"
            >
              <a
                @click="eventClickBarraSuperior(list.title)"
                class="text-xl uppercase font-bold text-[#191919] text-hover-red"
                :href="list.id"
              >
                {{ list.title }}
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div class="flex">
        <button
          class="lg:hidden mr-2"
          @click="openMenu"
        >
          <i class="text-[28px] text-[#191919] icon-nav" />
        </button>
        <div
          class="fixed w-full h-screen left-0 top-0 bg-black bg-opacity-60 z-50"
          v-show="showSidebar"
        >
          <div
            class="bg-white pt-16 h-full flex items-start justify-between px-10"
          >
            <nav class="grid-cols-1 grid gap-16">
              <a
                class=""
                href=""
              >
                <img
                  class="h-[36px]"
                  src="@/assets/images/logo.svg"
                  alt=""
                >
              </a>
              <ul class="grid grid-cols-1 gap-10">
                <li
                  v-for="(list, index) in lists"
                  :key="index"
                  @click="openMenu"
                >
                  <a
                    @click="eventClickBarraSuperior(list.title)"
                    class="text-xl uppercase font-bold text-[#191919] text-hover-red"
                    :href="list.id"
                  >
                    {{ list.title }}
                  </a>
                </li>
              </ul>
            </nav>
            <button @click="openMenu">
              <i class="icon-close" />
            </button>
          </div>
        </div>
      </div>
      <a
        class="ml-[36px]"
        href=""
      >
        <img
          class="h-[36px]"
          src="@/assets/images/logo.svg"
          alt=""
        >
      </a>
    </div>
  </header>
</template>
