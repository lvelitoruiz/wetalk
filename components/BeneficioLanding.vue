<template>
    <div class="flex items-start lg:items-center gap-4 mb-10">
        <img src="@/assets/images/pin.svg" alt="">
        <h2 class="text-[32px] font-bold font-solano uppercase">Beneficios de estudiar en wetalk</h2>
      </div>
      <div class="flex justify-between flex-col lg:flex-row">
        <div v-for="(item, index) in items" :key="index" class="w-full mb-[25px] lg:mb-0 lg:w-[347px] p-6 shadow-[0_8px_24px_0_rgba(203,213,220,0.40)] rounded-2xl">
          <img class="w-[52px] mb-4" :src="item.img" :alt="item.img">
          <h3 class="uppercase text-2xl font-solano font-bold mb-[11px]"> {{ item.title }} </h3>
          <p class="pb-4 font-publicSans"> {{ item.description }} </p>
          <p class="font-publicSans"> {{ item.description2 }} </p>
        </div>
      </div>
</template>

<script setup>

const props = defineProps ( {
  items : Array
})

</script>

<style>

</style>