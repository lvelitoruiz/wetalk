<template>
    <HeaderLanding :lists="lists" />

    <BannerLanding />
  
    <section
      class="bg-[#FAFAFA] py-8 md:pt-[50px] md:pb-[70px] px-6 md:px-0"
      id="matricula"
    >
      <MatriculaLanding />
    </section>
  
    <section
      class="container mx-auto py-8 md:pt-[50px] md:pb-[70px] px-6 lg:px-0"
      id="beneficio"
    >
      <BeneficioLanding :items="beneficios" />
    </section>
  
    <section
      class="bg-[#E6F0FF] py-8 md:pt-[50px] md:pb-[70px] px-6 lg:px-0"
      id="nivel"
    >
      <NivelLanding />
    </section>
  
    <section class="bg-[#191919] hidden lg:block">
      <div class="container mx-auto flex items-center justify-between h-[72px]">
        <p class="text-white font-solano font-bold text-2xl">
          Síguenos en nuestras redes sociales
        </p>
        <ul class="flex items-end gap-[32px]">
          <li>
            <a href="">
              <i class="icon-home text-[30px] text-white"></i>
            </a>
          </li>
          <li>
            <a href="">
              <i class="icon-home text-[30px] text-white"></i>
            </a>
          </li>
          <li>
            <a href="">
              <i class="icon-home text-[30px] text-white"></i>
            </a>
          </li>
          <li>
            <a href="">
              <i class="icon-home text-[30px] text-white"></i>
            </a>
          </li>
          <li>
            <a href="">
              <i class="icon-home text-[30px] text-white"></i>
            </a>
          </li>
        </ul>
      </div>
    </section>
  
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


</script>

<style>
</style>