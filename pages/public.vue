<template>
    <HeaderLanding :lists="lists" />

    <BannerLanding />
  
    <section
      class="bg-[#FAFAFA] py-8 md:pt-[112px] md:pb-[70px] px-6 md:px-10"
      id="matricula"
    >
      <MatriculaLanding @modal-open="changeModal" />
    </section>
  
    <section
      class="py-8 md:pt-[122px] md:pb-[70px] px-6 md:px-10"
      id="beneficio"
    >
      <BeneficioLanding :items="beneficios" />
    </section>
  
    <section
      class="bg-[#E6F0FF] py-8 md:pt-[112px] md:pb-[70px] px-6 md:px-10"
      id="nivel"
    >
      <NivelLanding />
    </section>
  
    <section class="bg-[#191919] hidden lg:block">
      <div class="container mx-auto md:px-10 flex items-center justify-between h-[72px]">
        <p class="text-white font-solano font-bold text-2xl">
          Síguenos en nuestras redes sociales
        </p>
        <ul class="flex items-end gap-[32px]">
          <li>
            <a href="https://instagram.com/wetalk_upc?igshid=YTQwZjQ0NmI0OA==" target="_blank" rel="noopener noreferrer">
              <NuxtIcon name="instagram" class="text-[30px] text-white"></NuxtIcon>
            </a>
          </li>
          <li>
            <a href="https://www.facebook.com/WeTALKUPC?mibextid=LQQJ4d" target="_blank" rel="noopener noreferrer">
              <NuxtIcon name="facebook" class="text-[30px] text-white"></NuxtIcon>
            </a>
          </li>
          <li>
            <a href="https://www.tiktok.com/@wetalk_upc?_t=8iA1Y8SQYdR&_r=1" target="_blank" rel="noopener noreferrer">
              <NuxtIcon name="tiktok" class="text-[30px] text-white"></NuxtIcon>
            </a>
          </li>
        </ul>
      </div>
    </section>

    <ModalLanding v-if="showLanding" @modal-close="changeModal" />
  
    <FooterLanding />
</template>

<script setup>
const lists = [
  {
    title: "Matrícula",
    id: "#matricula",
  },
  {
    title: "BENEFICIOS",
    id: "#beneficio",
  },
  {
    title: "Niveles",
    id: "#nivel",
  },
];

const showLanding = ref(false);

const changeModal = () => {
  showLanding.value = !showLanding.value;
}

</script>
