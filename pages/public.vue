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

const beneficios = [
  {
    img: "@/assets/images/benef-1.png",
    title: "Excelencia Cambridge",
    description:
      "Somos los primeros en ofrecer en Perú la plataforma Evolve Digital de Cambridge.",
    description2:
      "Tenemos 6 cursos de aprendizajes, desde el nivel básico al avanzado con material disponible 24/7.",
  },
  {
    img: "../assets/images/benef-2.png",
    title: "Aprende desde donde estés",
    description:
      "Clases en vivo 100%  online para que evites el tráfico y aproveches tu vida al máximo. ¡Puedes conectarte hasta de tu celular!",
  },
  {
    img: "@/assets/images/benef-3.png",
    title: "Seguimiento personalizado",
    description:
      "Aceptamos máximo 10 alumnos en cada clase para darte la atención que mereces.",
  },
];
</script>

<style>
</style>