<template>
  <div class="w-full lg:min-w-[65%]">
    <div class="pb-[28px]">
      <BoxContainer color="pink">
        <div class="">
          <p class="uppercase font-solano font-bold text-2xl leading-7 mb-3">
            registro de desempeño en clases
          </p>
          <TabJournal :tabs="tabs" />
          <div class="flex justify-center w-full">
            <div
              class="grid grid-cols-1 justify-items-center mt-9 max-w-[287px]"
            >
              <img
                src="/assets/images/group-1595596.png"
                alt=""
                class="w-[199px] mb-[22px]"
              />
              <p class="font-publicSans text-sm mb-[32px]">
                Reflexionar sobre tu aprendizaje de inglés te permitirá lograr
                un mejor avance.
              </p>
              <Button class="min-w-[200px]" primary label="Comenzar" />
            </div>
          </div>
          <div class="flex justify-center items-center w-full">
            <div
              class="grid grid-cols-1 justify-items-center mt-9 max-w-[523px]"
            >
              <p class="font-bold font-publicSans mb-5">
                ¿Cómo te fue con el inglés esta semana?
              </p>
              <div class="flex justify-between items-center mb-8">
                <figure class="max-h-[117px] max-w-[95px]">
                  <img
                    src="/assets/images/muy-mal.svg"
                    alt=""
                    class="p-[6.5px] hover:opacity-70"
                  />
                  <figcaption class="text-sm text-center">Muy mal</figcaption>
                </figure>
                <figure class="max-h-[117px] max-w-[95px]">
                  <img
                    src="/assets/images/mal.svg"
                    alt=""
                    class="p-[6.5px] hover:opacity-70"
                  />
                  <figcaption class="text-sm text-center">Mal</figcaption>
                </figure>
                <figure class="max-h-[117px] max-w-[95px]">
                  <img
                    src="/assets/images/regular.svg"
                    alt=""
                    class="p-[6.5px] hover:opacity-70"
                  />
                  <figcaption class="text-sm text-center">Regular</figcaption>
                </figure>
                <figure class="max-h-[117px] max-w-[95px]">
                  <img
                    src="/assets/images/bien.svg"
                    alt=""
                    class="p-[6.5px] hover:opacity-70"
                  />
                  <figcaption class="text-sm text-center">Bien</figcaption>
                </figure>
                <figure class="max-h-[117px] max-w-[95px]">
                  <img
                    src="/assets/images/excelente.svg"
                    alt=""
                    class="p-[6.5px] hover:opacity-70"
                  />
                  <figcaption class="text-sm text-center">Excelente</figcaption>
                </figure>
              </div>
              <Button class="w-[117px]" primary disabled label="Siguiente" />
            </div>
          </div>
          <div class="flex justify-center items-center w-full">
            <div
              class="grid grid-cols-1 justify-items-center mt-9 max-w-[523px]"
            >
              <p class="font-bold font-publicSans mb-5">
                Califica tu experiencia según cada skill
              </p>
              <div class="w-full">
                <p class="text-sm font-normal font-publicSans">Listening</p>
                <div class="flex justify-between mt-1 mb-4">
                  <i class="icon-vector text-3xl"></i>
                  <i class="icon-vector text-3xl"></i>
                  <i class="icon-vector text-3xl"></i>
                  <i class="icon-vector text-3xl"></i>
                  <i class="icon-vector text-3xl"></i>
                </div>
              </div>
              <div class="w-full">
                <p class="text-sm font-normal font-publicSans">Speaking</p>
                <div class="flex justify-between mt-1 mb-4">
                  <i class="icon-vector text-3xl"></i>
                  <i class="icon-vector text-3xl"></i>
                  <i class="icon-vector text-3xl"></i>
                  <i class="icon-vector text-3xl"></i>
                  <i class="icon-vector text-3xl"></i>
                </div>
              </div>
              <div class="w-full">
                <p class="text-sm font-normal font-publicSans">Reading</p>
                <div class="flex justify-between mt-1 mb-4">
                  <i class="icon-vector text-3xl"></i>
                  <i class="icon-vector text-3xl"></i>
                  <i class="icon-vector text-3xl"></i>
                  <i class="icon-vector text-3xl"></i>
                  <i class="icon-vector text-3xl"></i>
                </div>
              </div>

              <div class="flex gap-4 mt-8">
                <Button class="min-w-[117px]" secundary label="Atrás" />
                <Button class="min-w-[117px]" primary disabled label="Siguiente" />
              </div>
            </div>
          </div>
          <div class="flex justify-center items-center w-full">
            <div
              class="grid grid-cols-1 justify-items-center mt-9 max-w-[523px]"
            >
              <p class="font-bold font-publicSans mb-5">
                Reflexiona sobre las siguientes preguntas
              </p>
              <form>
                <div class="mb-7">
                  <label for="" class="text-sm">¿Qué sientes que podrías mejorar en tu aprendizaje?</label>
                <textarea name="mejorar" id="" cols="30" rows="3" class="border w-full px-3 py-[10px] rounded mt-2"></textarea>
                </div>
                <div class="mb-7">
                  <label for="" class="text-sm">¿Cómo crees poder mejorarlo?</label>
                <textarea name="mejorar" id="" cols="30" rows="3" class="border w-full px-3 py-[10px] rounded mt-2"></textarea>
                </div>
                <div class="">
                  <label for="" class="text-sm">¿Cuál es tu objetivo para la siguiente semana?</label>
                <textarea name="mejorar" id="" cols="30" rows="3" class="border w-full px-3 py-[10px] rounded mt-2"></textarea>
                </div>
                
              </form>
              

              <div class="flex gap-4 mt-8">
                <Button class="min-w-[117px]" secundary label="Atrás" />
                <Button class="min-w-[117px]" primary disabled label="Guardar" />
              </div>
            </div>
          </div>
          <div class="flex justify-center w-full">
            <div
              class="grid grid-cols-1 justify-items-center mt-9 max-w-[454px]"
            >
              <img
                src="/assets/images/group-1595596.png"
                alt=""
                class="w-[199px] mb-[22px]"
              />
              <p class="font-publicSans text-center text-sm mb-[32px]">
                Revisa las recomendaciones personalizadas para mejorar en el curso. ¡Tu journal te espera de nuevo la próxima semana!
              </p>
              <RouterLink class="flex items-center justify-center" to="#"><span class="text-primary font-bold text-sm">Ver recomendaciones</span><i class="icon-arrow-right ml-2 text-sm text-primary font-bold"></i></RouterLink>
            </div>
          </div>
        </div>
        <div class="bg-[#FFEA55] flex gap-1 p-1 items-start mt-6">
          <i class="icon-flag text-sm"></i>
          <p class="font-publicSans text-sm text-[#404040]">
            El registro de esta semana tendrá la edición habilitada del
            <span class="font-bold">12/01</span> al
            <span class="font-bold">14/01</span>. Luego de esa fecha, no se
            podrán modificar las respuestas.
          </p>
        </div>
      </BoxContainer>
    </div>
  </div>
</template>

<script setup lang="ts">


const tabs = [
  { texto: "Semana 16/10 - 21/10", value: false },
  { texto: "esta semana", value: true },
];

</script>
