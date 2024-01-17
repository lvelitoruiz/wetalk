<!-- eslint-disable vue/require-default-prop -->
<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  items: Array,
});
</script>

<template>
  <div class="container mx-auto">
    <div class="flex items-start lg:items-center gap-4 mb-10">
      <img
        src="@/assets/images/pin.svg"
        alt=""
      >
      <h2 class="text-[32px] font-bold font-solano uppercase">
        Beneficios de estudiar en WeTALK
      </h2>
    </div>
    <div class="flex justify-between flex-col lg:flex-row">
      <div
        class="w-full mb-[25px] lg:mb-0 lg:w-[347px] p-6 shadow-[0_8px_24px_0_rgba(203,213,220,0.40)] rounded-2xl"
      >
        <div class="flex items-center gap-3">
          <img
            class="w-[52px] mb-4"
            src="@/assets/images/benef-1.png"
            alt=""
          >
          <h3 class="uppercase text-2xl font-solano font-bold mb-[11px]">
            Excelencia Cambridge
          </h3>
        </div>
        <p class="pb-4 font-publicSans font-normal">
          Somos el centro de idiomas de Perú con más estudiantes aprendiendo con
          Evolve Digital de Cambridge.
        </p>
      </div>
      <div
        class="w-full mb-[25px] lg:mb-0 lg:w-[347px] p-6 shadow-[0_8px_24px_0_rgba(203,213,220,0.40)] rounded-2xl"
      >
        <div class="flex items-center gap-3">
          <img
            class="w-[52px] mb-4"
            src="@/assets/images/benef-2.png"
            alt=""
          >
          <h3 class="uppercase text-2xl font-solano font-bold mb-[11px]">
            Aprende desde donde estés
          </h3>
        </div>
        <p class="pb-4 font-publicSans font-normal">
          Clases en vivo 100% online para que evites el tráfico y aproveches tu
          vida al máximo.
        </p>
      </div>
      <div
        class="w-full mb-[25px] lg:mb-0 lg:w-[347px] p-6 shadow-[0_8px_24px_0_rgba(203,213,220,0.40)] rounded-2xl"
      >
        <div class="flex items-center gap-3">
          <img
            class="w-[52px] mb-4"
            src="@/assets/images/benef-3.png"
            alt=""
          >
          <h3 class="uppercase text-2xl font-solano font-bold mb-[11px]">
            Comunicación oral constante
          </h3>
        </div>
        <p class="pb-4 font-publicSans font-normal">
          Contamos con un grupo reducido de alumnos por clase, enfocando su
          aprendizaje en desarrollar su habilidad de comunicarse oralmente en
          inglés.
        </p>
      </div>
    </div>
  </div>
</template>

<style></style>
