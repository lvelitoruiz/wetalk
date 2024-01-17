<template>
  <HeaderLanding :lists="lists" />

  <BannerLanding />

  <section
    class="bg-[#FAFAFA] pt-[112px] pb-8 md:pt-[112px] md:pb-[70px] px-6 md:px-10"
    id="matricula"
  >
    <MatriculaLanding @modal-open="changeModal" />
  </section>

  <section
    class="pt-[112px] pb-8 md:pt-[122px] md:pb-[70px] px-6 md:px-10"
    id="beneficio"
  >
    <BeneficioLanding :items="beneficios" />
  </section>

  <section
    class="bg-[#E6F0FF] pt-[112px] pb-8 md:pt-[112px] md:pb-[70px] px-6 md:px-10"
    id="nivel"
  >
    <NivelLanding />
  </section>

  <section class="bg-[#191919]">
    <div
      class="container mx-auto md:px-10 px-6 py-8 lg:flex items-center lg:justify-between"
    >
      <p
        class="text-white font-solano font-bold text-center text-2xl lg:mb-0 mb-6"
      >
        Síguenos en nuestras redes sociales
      </p>
      <ul class="flex lg:items-end justify-center gap-[32px]">
        <li>
          <a
            href="https://instagram.com/wetalk_upc?igshid=YTQwZjQ0NmI0OA=="
            target="_blank"
            rel="noopener noreferrer"
          >
            <NuxtIcon
              name="instagram"
              class="text-[30px] text-white"
            />
          </a>
        </li>
        <li>
          <a
            href="https://www.facebook.com/WeTALKUPC?mibextid=LQQJ4d"
            target="_blank"
            rel="noopener noreferrer"
          >
            <NuxtIcon
              name="facebook"
              class="text-[30px] text-white"
            />
          </a>
        </li>
        <li>
          <a
            href="https://www.tiktok.com/@wetalk_upc?_t=8iA1Y8SQYdR&_r=1"
            target="_blank"
            rel="noopener noreferrer"
          >
            <NuxtIcon
              name="tiktok"
              class="text-[30px] text-white"
            />
          </a>
        </li>
      </ul>
    </div>
  </section>

  <ModalLanding
    v-if="showLanding"
    @modal-close="changeModal"
  />

  <FooterLanding />
</template>

<script setup>
import { ref } from 'vue';

const lists = [
  {
    title: 'Matrícula',
    id: '#matricula',
  },
  {
    title: 'BENEFICIOS',
    id: '#beneficio',
  },
  {
    title: 'Niveles',
    id: '#nivel',
  },
];

const showLanding = ref(false);

const changeModal = () => {
  showLanding.value = !showLanding.value;
};
</script>
