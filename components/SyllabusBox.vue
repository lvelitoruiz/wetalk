<script setup>
const tabs = [
  { texto: "Ciclo Actual", value: true },
  { texto: "Proximo Ciclo", value: false },
];

const actual = ref(true);

const cicloNow = [
  {
    id: 1,
    ciclo: 0,
    unidad: "1",
    texto: "I am …",
    detalles: [
      {
        id: 1,
        texto: "Decir de dónde eres ",
      },
      {
        id: 2,
        texto: "Pedir y dar información personal ",
      },
      {
        id: 3,
        texto: "Registrarte en un hotel ",
      },
      {
        id: 4,
        texto: "Conocer a una nueva persona ",
      },
    ],
  },
  {
    id: 2,
    ciclo: 0,
    unidad: "2",
    texto: "Great people",
    detalles: [
      {
        id: 5,
        texto: "Hablar sobre tu familia ",
      },
      {
        id: 6,
        texto: "Describir amigos y familiares ",
      },
      {
        id: 7,
        texto: "Hablar sobre edades y cumpleaños ",
      },
      {
        id: 8,
        texto: "Comparar información sobre amigos y familiares ",
      },
    ],
  },
  {
    id: 3,
    ciclo: 0,
    unidad: "3",
    texto: "Come in",
    detalles: [],
  },
  {
    id: 4,
    ciclo: 0,
    unidad: "4",
    texto: "I love it!",
    detalles: [],
  },
  {
    id: 5,
    ciclo: 0,
    unidad: "5",
    texto: "Mondays and fun days ",
    detalles: [],
  },
  {
    id: 6,
    ciclo: 0,
    unidad: "6",
    texto: "Zoom in, zoom out ",
    detalles: [],
  },
];

const cicloNext = [
  {
    id: 7,
    ciclo: 1,
    unidad: "1",
    texto: "test1",
    detalles: [
      {
        id: 24,
        texto: "testhijo1",
      },
    ],
  },
];

const handleTabChange = (value) => {
  actual.value = value;
};
</script>
<template>
  <div class="min-w-[65%]">
    <div class="pb-[28px]">
      <BoxContainer color="pink">
        <div class="flex items-center justify-between pb-[18px]">
          <h3 class="text-[#404040] text-2xl font-solano uppercase">
            Contenido
          </h3>
          <a class="flex items-center gap-2" href="">
            <span class="text-[#E50A17] font-bold text-sm">Ver más</span>
            <i class="icon-arrow-right text-[#E50A17]"></i>
          </a>
        </div>
        <div class="flex items-center gap-4 mb-[22px]">
          <TabContent :tabs="tabs" @tabChange="handleTabChange"></TabContent>
        </div>
        <div class="h-[222px] overflow-y-auto">
          <div v-if="actual">
            <div v-for="item in cicloNow">
              <div class="flex items-center gap-2">
                <span
                  class="w-5 h-5 border-2 border-[#A9616D] flex items-center justify-center text-xs text-[#A9616D] font-bold rounded-full"
                  >{{ item.id }}</span
                >
                <p class="text-sm text-[#A9616D] font-bold">{{ item.texto }}</p>
              </div>
              <div
                class="relative pt-[10px] pl-[30px] pb-[19px] before:content-[''] before:left-[9px] before:absolute before:top-0 before:w-[2px] before:bottom-0 before:bg-[#A9616D]"
              >
                <ul class="list-disc text-[#808080] ml-4 text-sm">
                  <li
                    :class="{ 'pb-2': index + 1 !== item.detalles.length }"
                    v-for="(detalle, index) in item.detalles"
                  >
                    {{ detalle.texto }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div v-else>
            <div v-for="item in cicloNext">
              <div class="flex items-center gap-2">
                <span
                  class="w-5 h-5 border-2 border-[#A9616D] flex items-center justify-center text-xs text-[#A9616D] font-bold rounded-full"
                  >{{ item.id }}</span
                >
                <p class="text-sm text-[#A9616D] font-bold">{{ item.texto }}</p>
              </div>
              <div
                class="relative pt-[10px] pl-[30px] pb-[19px] before:content-[''] before:left-[9px] before:absolute before:top-0 before:w-[2px] before:bottom-0 before:bg-[#A9616D]"
              >
                <ul class="list-disc text-[#808080] ml-4 text-sm">
                  <li
                    :class="{ 'pb-2': index + 1 !== item.detalles.length }"
                    v-for="(detalle, index) in item.detalles"
                  >
                    {{ detalle.texto }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </BoxContainer>
    </div>
  </div>
</template>
