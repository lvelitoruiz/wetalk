<template>
    <HeaderLanding/>
  
    <BannerLanding />
  
      <section class="bg-[#FAFAFA] py-8 md:pt-[50px] md:pb-[70px] px-6 md:px-0">
        <div class="container mx-auto flex items-center justify-between flex-col lg:flex-row">
          <img class="w-full md:w-fit md:h-[271px]" src="@/assets/images/matricula.png" alt="">
          <div class="flex flex-col mt-6 lg:mt-0 gap-4 text-center items-center lg:text-end lg:items-end">
            <h3 class="uppercase text-[32px] font-bold">¿Aún no estás matriculado?</h3>
            <p class="max-w-[492px]">Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum</p>
            <button class="bg-white px-[10px] border border-[#E50A17] h-[44px] flex items-center justify-center p-[10px] text-[#E50A17] font-bold mt-2 relative">
              <span class="w-full h-full absolute border border-[#E50A17] left-[5px] top-[5px]"></span>
              <span>Más información</span>
            </button>
          </div>
        </div>
      </section>
  
      <section class="container mx-auto py-8 md:pt-[50px] md:pb-[70px] px-6 lg:px-0">
        <div class="flex items-start lg:items-center gap-4 mb-10">
          <img src="@/assets/images/pin.svg" alt="">
          <h2 class="text-[32px] font-bold uppercase">Beneficios de estudiar en wetalk</h2>
        </div>
        <div class="flex justify-between flex-col lg:flex-row">
          <div class="w-full mb-[25px] lg:mb-0 lg:w-[347px] p-6 shadow-[0_8px_24px_0_rgba(203,213,220,0.40)] rounded-2xl">
            <img class="w-[52px] mb-4" src="@/assets/images/benef-1.png" alt="">
            <h3 class="uppercase text-2xl font-bold mb-[11px]">Excelencia Cambridge</h3>
            <p class="pb-4">Somos los primeros en ofrecer en Perú la plataforma Evolve Digital de Cambridge.</p>
            <p>Tenemos 6 cursos de aprendizajes, desde el nivel básico al avanzado con material disponible 24/7.</p>
          </div>
          <div class="w-full mb-[25px] lg:mb-0 lg:w-[347px] p-6 shadow-[0_8px_24px_0_rgba(203,213,220,0.40)] rounded-2xl">
            <img class="w-[52px] mb-4" src="@/assets/images/benef-2.png" alt="">
            <h3 class="uppercase text-2xl font-bold mb-[11px]">Aprende desde donde estés</h3>
            <p class="pb-4">Clases en vivo 100%  online para que evites el tráfico y aproveches tu vida al máximo. ¡Puedes conectarte hasta de tu celular!</p>
          </div>
          <div class="w-full lg:w-[347px] p-6 shadow-[0_8px_24px_0_rgba(203,213,220,0.40)] rounded-2xl">
            <img class="w-[52px] mb-4" src="@/assets/images/benef-3.png" alt="">
            <h3 class="uppercase text-2xl font-bold mb-[11px]">Seguimiento personalizado</h3>
            <p class="pb-4">Aceptamos máximo 10 alumnos en cada clase para darte la atención que mereces.</p>
          </div>
        </div>
      </section>
  
      <section class="bg-[#E6F0FF] py-8 md:pt-[50px] md:pb-[70px] px-6 lg:px-0">
        <div class="container mx-auto">
          <div class="flex items-start lg:items-center gap-4 mb-10">
            <img src="@/assets/images/pin.svg" alt="">
            <h2 class="text-[32px] font-bold uppercase">en wetalk aprenderás en cada nivel a:</h2>
          </div>
          <div class="flex justify-between items-center">
            <img class="w-[422px] hidden lg:block" src="@/assets/images/person.svg" alt="">
            <div class="flex flex-col gap-1 lg:gap-4">
              <div class="rounded-md flex lg:items-center">
                <div class="flex items-center justify-center flex-col bg-[#E50A17] min-w-[90px] min-h-[112px] lg:min-h-[90px] text-white rounded-l-md">
                  <p class="text-xl uppercase font-bold">Inglés</p>
                  <p class="text-[40px] lg:text-5xl uppercase font-bold leading-none">6</p>
                </div>
                <div class="flex justify-center flex-col bg-[#0043AA] lg:h-[90px] text-white rounded-r-md px-4 py-4 lg:py-0 w-full">
                  <p>Hablar en inglés con flexibilidad con fines sociales y académicos. Además, escribir sobre temas complejos.</p>
                </div>
              </div>
              <div class="rounded-md flex lg:items-center lg:ml-[20px]">
                <div class="flex items-center justify-center flex-col bg-[#E50A17] min-w-[90px] min-h-[112px] lg:min-h-[90px] text-white rounded-l-md">
                  <p class="text-xl uppercase font-bold">Inglés</p>
                  <p class="text-[40px] lg:text-5xl uppercase font-bold leading-none">5</p>
                </div>
                <div class="flex justify-center flex-col bg-[#0043AA] lg:h-[90px] text-white rounded-r-md px-4 py-4 lg:py-0 w-[98%]">
                  <p>Interactuar de manera espontánea con personas nativas y escribir con claridad y detalles.</p>
                </div>
              </div>
              <div class="rounded-md flex lg:items-center lg:ml-[40px]">
                <div class="flex items-center justify-center flex-col bg-[#E50A17] min-w-[90px] min-h-[112px] lg:min-h-[90px] text-white rounded-l-md">
                  <p class="text-xl uppercase font-bold">Inglés</p>
                  <p class="text-[40px] lg:text-5xl uppercase font-bold leading-none">3-4</p>
                </div>
                <div class="flex justify-center flex-col bg-[#0043AA] lg:h-[90px] text-white rounded-r-md px-4 py-4 lg:py-0 w-full">
                  <p>Manejarte durante un viaje y escribir textos sencillos de temas conocidos</p>
                </div>
              </div>
              <div class="rounded-md flex lg:items-center lg:ml-[60px]">
                <div class="flex items-center justify-center flex-col bg-[#E50A17] min-w-[90px] min-h-[112px] lg:min-h-[90px] text-white rounded-l-md">
                  <p class="text-xl uppercase font-bold">Inglés</p>
                  <p class="text-[40px] lg:text-5xl uppercase font-bold leading-none">2</p>
                </div>
                <div class="flex justify-center flex-col bg-[#0043AA] lg:h-[90px] text-white rounded-r-md px-4 py-4 lg:py-0 w-full">
                  <p>Comunicarte en tareas simples y rutinarias.</p>
                </div>
              </div>
              <div class="rounded-md flex lg:items-center lg:ml-[80px]">
                <div class="flex items-center justify-center flex-col bg-[#E50A17] min-w-[90px] min-h-[112px] lg:min-h-[90px] text-white rounded-l-md">
                  <p class="text-xl uppercase font-bold">Inglés</p>
                  <p class="text-[40px] lg:text-5xl uppercase font-bold leading-none">1</p>
                </div>
                <div class="flex justify-center flex-col bg-[#0043AA] lg:h-[90px] text-white rounded-r-md px-4 py-4 lg:py-0 w-full">
                  <p>Interactuar de manera sencilla con un interlocutor paciente.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <section class="bg-[#191919] hidden lg:block">
        <div class="container mx-auto flex items-center justify-between h-[72px]">
          <p class="text-white font-bold text-2xl">Síguenos en nuestras redes sociales</p>
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

</script>

<style>

</style>