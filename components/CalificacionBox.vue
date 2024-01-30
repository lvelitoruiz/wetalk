<script setup>
import { ref } from 'vue';

const tabs = [
  { texto: 'Semana 16/10 - 21/10', value: false },
  { texto: 'Semana actual', value: true },
];

const currentTabs = ref(true);

const navWidth = ref('initial');

const handleChangeTab = (value) => {
  currentTabs.value = value;
};

const currentIndex = ref(0);

const data = [
  {
    img: 'bg-[url(@/assets/images/muy-mal.svg)]',
    imgActive: 'bg-[url(@/assets/images/muy-mal-active.svg)] grayscale-0',
    title: 'Muy mal',
    isActive: false,
  },
  {
    img: 'bg-[url(@/assets/images/mal.svg)]',
    imgActive: 'bg-[url(@/assets/images/mal-active.svg)] grayscale-0',
    title: 'Mal',
    isActive: false,
  },
  {
    img: 'bg-[url(@/assets/images/regular.svg)]',
    imgActive: 'bg-[url(@/assets/images/regular-active.svg)] grayscale-0',
    title: 'Regular',
    isActive: false,
  },
  {
    img: 'bg-[url(@/assets/images/bien.svg)]',
    imgActive: 'bg-[url(@/assets/images/bien-active.svg)] grayscale-0',
    title: 'Bien',
    isActive: false,
  },
  {
    img: 'bg-[url(@/assets/images/excelente.svg)]',
    imgActive: 'bg-[url(@/assets/images/excelente-active.svg)] grayscale-0',
    title: 'Excelente',
    isActive: false,
  },
];

const toggleActiveState = (clickedIndex) => {
  data.forEach((item, index) => {
    item.isActive = index === clickedIndex;
  });
};

const continuar = () => {
  currentIndex.value++;
  if (currentIndex.value === 1) {
    navWidth.value = 'first';
  } else if (currentIndex.value === 2) {
    navWidth.value = 'second';
  } else if (currentIndex.value === 3) {
    navWidth.value = 'third';
  }
};

const retroceder = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  }
  if (currentIndex.value === 1) {
    navWidth.value = 'first';
  } else if (currentIndex.value === 2) {
    navWidth.value = 'second';
  } else if (currentIndex.value === 3) {
    navWidth.value = 'third';
  } else if (currentIndex.value === 4) {
    navWidth.value = 'fourth';
  }
};
</script>

<template>
  <div class="w-full lg:min-w-[75%]">
    <div class="pb-[28px]">
      <BoxContainer color="blueVariant" navigation :wide="navWidth">
        <div class="">
          <p class="uppercase font-solano font-bold text-2xl leading-7 mb-3">
            registro de desempeño en clases
          </p>
          <TabJournal :tabs="tabs" @tabChange="handleChangeTab" />
          <div v-if="currentTabs">
            <div class="mt-2">
              <p class="text-[#808080] text-sm">
                Los cambios se guardan automáticamente.
              </p>
            </div>
            <div class="flex justify-center w-full" v-show="currentIndex === 0">
              <div
                class="grid grid-cols-1 justify-items-center mt-9 max-w-[287px]"
              >
                <img
                  src="@/assets/images/group-1595596.png"
                  alt=""
                  class="w-[199px] mb-[22px]"
                />
                <p class="font-publicSans text-center text-sm mb-[32px]">
                  Reflexionar sobre tu aprendizaje de inglés te permitirá lograr
                  un mejor avance.
                </p>
                <Button
                  @click="continuar"
                  class="min-w-[200px]"
                  primary
                  label="Comenzar"
                />
              </div>
            </div>
            <div
              class="flex justify-center items-center w-full"
              v-show="currentIndex === 1"
            >
              <div
                class="grid grid-cols-1 justify-items-center mt-9 lg:max-w-[523px] max-w-[266px]"
              >
                <p class="font-bold font-publicSans mb-5">
                  ¿Cómo te fue con el inglés esta semana?
                </p>
                <div class="grid grid-cols-5 gap-5 mb-8">
                  <div
                    class="lg:max-h-[117px] max-h-[88px] max-w-[68px] lg:max-w-[95px]"
                    v-for="(item, index) in data"
                    :key="index"
                  >
                    <div
                      :class="[item.isActive ? item.imgActive : item.img]"
                      @click="() => toggleActiveState(index)"
                      class="w-20 h-20 bg-cover grayscale bg-no-repeat hover:grayscale-0 active:grayscale-0 active:scale-90"
                    />
                    <span
                      class="text-sm leading-[22px] flex justify-center mt-2"
                    >
                      {{ item.title }}
                    </span>
                  </div>
                </div>
                <div class="flex justify-between items-center mb-8 gap-3">
                  <figure
                    class="lg:hidden lg:max-h-[117px] max-h-[88px] max-w-[68px] lg:max-w-[95px]"
                  >
                    <img
                      src="@/assets/images/bien.svg"
                      alt=""
                      class="p-1 lg:p-[6.5px] w-20 grayscale hover:grayscale-0 active:scale-90 active:grayscale-0"
                    />
                    <figcaption class="text-sm text-center">Bien</figcaption>
                  </figure>
                  <figure
                    class="lg:hidden lg:max-h-[117px] max-h-[88px] max-w-[68px] lg:max-w-[95px]"
                  >
                    <img
                      src="@/assets/images/excelente.svg"
                      alt=""
                      class="p-1 lg:p-[6.5px] w-20 grayscale hover:grayscale-0 active:scale-90 active:grayscale-0"
                    />
                    <figcaption class="text-sm text-center">
                      Excelente
                    </figcaption>
                  </figure>
                </div>
                <Button
                  @click="continuar"
                  class="min-w-[196px]"
                  primary
                  label="Siguiente"
                />
              </div>
            </div>
            <div
              class="flex justify-center items-center w-full"
              v-show="currentIndex === 2"
            >
              <div
                class="grid grid-cols-1 justify-items-center mt-9 max-w-[523px]"
              >
                <p class="font-bold font-publicSans mb-5">
                  Reflexiona sobre las siguientes preguntas
                </p>
                <form>
                  <div class="mb-7">
                    <label for="" class="text-sm">
                      ¿Qué sientes que podrías mejorar en tu aprendizaje?
                    </label>
                    <textarea
                      name="mejorar"
                      id=""
                      cols="30"
                      rows="3"
                      class="border w-full px-3 py-[10px] rounded mt-2 text-[#404040] focus:outline-none"
                    ></textarea>
                  </div>
                  <div class="mb-7">
                    <label for="" class="text-sm"
                      >¿Cómo crees poder mejorarlo?</label
                    >
                    <textarea
                      name="mejorar"
                      id=""
                      cols="30"
                      rows="3"
                      class="border w-full px-3 py-[10px] rounded mt-2 text-[#404040] focus:outline-none"
                    ></textarea>
                  </div>
                  <div class="">
                    <label for="" class="text-sm"
                      >¿Cuál es tu objetivo para la siguiente semana?</label
                    >
                    <textarea
                      name="mejorar"
                      id=""
                      cols="30"
                      rows="3"
                      class="border w-full px-3 py-[10px] rounded mt-2 text-[#404040] focus:outline-none"
                    ></textarea>
                  </div>
                </form>

                <div class="lg:flex gap-4 mt-8">
                  <div>
                    <Button
                      class="min-w-[129px] lg:min-w-[196px] lg:mb-0 mb-3"
                      @click="retroceder"
                      secundary
                      label="Atrás"
                    />
                  </div>
                  <Button
                    class="min-w-[129px] lg:min-w-[196px]"
                    @click="continuar"
                    primary
                    label="Guardar"
                  />
                </div>
              </div>
            </div>
            <div class="flex justify-center w-full" v-show="currentIndex === 3">
              <div
                class="grid grid-cols-1 justify-items-center mt-9 max-w-[454px]"
              >
                <img
                  src="@/assets/images/group-1595596.png"
                  alt=""
                  class="w-[199px] mb-[22px]"
                />
                <p class="font-publicSans text-center text-sm mb-[32px]">
                  Revisa las recomendaciones personalizadas para mejorar en el
                  curso. ¡Tu journal te espera de nuevo la próxima semana!
                </p>
                <RouterLink class="flex items-center justify-center" to="#">
                  <span class="text-primary font-bold text-sm">
                    Ver recomendaciones
                  </span>
                  <i
                    class="icon-arrow-right ml-2 text-sm text-primary font-bold"
                  ></i>
                </RouterLink>
              </div>
            </div>
            <!-- <div class="bg-[#FFEA55] flex gap-1 p-1 items-start mt-6">
              <i class="icon-flag text-sm"></i>
              <p class="font-publicSans text-xs lg:text-sm text-[#404040]">
                El registro de esta semana tendrá la edición habilitada del
                <span class="font-bold">12/01</span> al
                <span class="font-bold">14/01</span>. Luego de esa fecha, no se
                podrán modificar las respuestas.
              </p>
            </div> -->
          </div>
          <div v-else>
            <div class="mt-2">
              <p class="text-[#808080] text-sm">
                Reporte de respuestas anteriores.
              </p>
            </div>
            <div
              class="grid grid-cols-9 justify-items-start w-full overflow-y-auto gap-x-4 gap-y-5 mt-5"
            >
              <div class="col-span-3 p-4 border border-[#D9D9D9] rounded-lg">
                <p class="font-bold text-sm font-publicSans mb-2">
                  La semana pasada te fue...
                </p>
                <div class="flex justify-center items-center">
                  <figure class="">
                    <img
                      src="@/assets/images/muy-mal-active.svg"
                      alt=""
                      class="h-[50px] w-[50px]"
                    />
                    <figcaption class="text-sm text-center mt-2">
                      Muy mal
                    </figcaption>
                  </figure>
                </div>
              </div>
              <div class="col-span-6 p-4 border border-[#D9D9D9] rounded-lg">
                <p class="font-bold text-sm text-center">
                  Sientes que podrías mejorar en...
                </p>
                <p class="text-sm font-publicSans mt-2">
                  Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
                  lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
                  lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
                  lorem ipsum lorem ipsum.
                </p>
              </div>
              <div class="col-span-5 p-4 border border-[#D9D9D9] rounded-lg">
                <p class="font-bold text-sm text-center">
                  Crees que podrías mejorarlo mediante...
                </p>
                <p class="text-sm font-publicSans mt-2">
                  Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
                  lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
                  lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
                  lorem ipsum lorem ipsum.
                </p>
              </div>
              <div class="col-span-4 p-4 border border-[#D9D9D9] rounded-lg">
                <p class="font-bold text-sm text-center">
                  Tu compromiso fue...
                </p>
                <p class="text-sm font-publicSans mt-2">
                  Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
                  lorem
                </p>
              </div>
            </div>
          </div>
        </div>
      </BoxContainer>
    </div>
  </div>
</template>
