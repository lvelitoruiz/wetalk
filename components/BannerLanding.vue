<template>
  <section class="h-[388px] lg:h-[533px] relative">
    <img class="h-[388px] lg:h-[533px] w-full object-cover" src="@/assets/images/banner.svg" alt="">
    <div
      class="container mx-auto flex absolute top-0 left-0 right-0 bottom-0 items-center justify-center lg:justify-between">
      <img class="h-[500px] hidden lg:block" src="@/assets/images/illustration.svg" alt="">
      <div
        class="bg-[#025] px-[24px] py-[38px] flex flex-col gap-[27px] mx-6 md:mx-0 w-full md:w-[438px] items-center lg:mt-12">
        <div class="flex flex-col gap-[7px]">
          <p class="text-[#FFF] text-xl font-bold font-solano leading-none">Exclusivo para alumnos matriculados</p>
          <h3 class="text-[#FFF] text-[41px] font-bold uppercase font-solano leading-none">Portal wetalk</h3>
          <p class="font-publicSans text-[#FFF]">Encuentra toda la información necesaria para tu experiencia de
            aprendizaje de inglés.</p>
        </div>
        <Button @click="triggerModal" label="Ingresar a portal Wetalk" primary />
      </div>
    </div>
  </section>
</template>

<script setup>

import { defineProps, defineEmits } from 'vue';

const emit = defineEmits();

const triggerModal = () => {
  emit('modal-open');
};

</script>

<style></style>