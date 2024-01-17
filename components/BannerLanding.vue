<!-- eslint-disable no-undef -->
<!-- eslint-disable vue/valid-define-emits -->
<script setup>
import { defineEmits } from 'vue';

const emit = defineEmits();

const triggerModal = (text, url) => {
  emit('modal-open');
  if (dataLayer) {
    dataLayer.push({
      event: 'Clics_ir_wetalk',
      name: 'Evento_ir_wetalk',
      Click_text: text,
      url,
    });
  }
};
</script>
<template>
  <section class="bg-image flex items-center">
    <div
      class="container m-auto md:px-10 xl:px-10 flex items-center justify-center lg:justify-between"
    >
      <img
        class="lg:h-[300px] xl:h-[450px] hidden lg:block"
        src="@/assets/images/illustration.svg"
        alt=""
      >
      <div class="bg-white px-[46px] py-[33px] flex flex-col">
        <p class="font-zizou-bold font-bold px-2 text-xl mb-6">
          Ingresa a tu portal WeTALK
        </p>
        <a
          href="https://idiomas.upc.edu.pe/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button
            @click="triggerModal('Alumno UPC', 'https://idiomas.upc.edu.pe/')"
            class="bg-[#0065FF] flex justify-between px-3 py-2 items-center text-white font-solano mb-[17px] w-full rounded-[4px] lg:text-[20px]"
          >
            Alumno UPC
            <i class="icon-arrow-right" />
          </button>
        </a>
        <a
          href="https://portal.wetalk.pe/login"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button
            @click="
              triggerModal('Alumno UPN', 'https://portal.wetalk.pe/login')
            "
            class="bg-[#0065FF] flex justify-between px-3 py-2 items-center text-white font-solano w-full rounded-[4px] lg:text-[20px]"
          >
            Alumno UPN
            <i class="icon-arrow-right" />
          </button>
        </a>
      </div>
    </div>
  </section>
</template>

<style lang="postcss" scoped>
.bg-image {
  @apply bg-[url('@/assets/images/banner-home.svg')] bg-no-repeat bg-cover h-[388px] lg:h-[400px] xl:h-[533px] relative mt-[80px];
}
</style>
