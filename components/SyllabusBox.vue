<script setup>
const tabs = [
  { texto: "Ciclo Actual", value: true },
  { texto: "Proximo Ciclo", value: false },
];

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  link: {
    type: Boolean,
    default: false,
  },
});

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
    detalles: [
      {
        id: 9,
        texto: "Habla de tu hogar",
      },
      {
        id: 10,
        texto: "Hablar de muebles",
      },
      {
        id: 11,
        texto: "Ofrecer y aceptar una bebida y un aperitivo",
      },
      {
        id: 12,
        texto: "Elegir cosas para un hogar ",
      },
    ],
  },
  {
    id: 4,
    ciclo: 0,
    unidad: "4",
    texto: "I love it!",
    detalles: [
      {
        id: 13,
        texto: "Habla de tus cosas favoritas",
      },
      {
        id: 14,
        texto: "Decir cómo usas la tecnología",
      },
      {
        id: 15,
        texto: "Hablar sobre cómo te comunicas",
      },
      {
        id: 16,
        texto: "Hablar sobre tu música favorita ",
      },
    ],
  },
  {
    id: 5,
    ciclo: 0,
    unidad: "5",
    texto: "Mondays and fun days ",
    detalles: [
      {
        id: 17,
        texto:
          "Hablar sobre el día de la semana y actividades del fin de semana dar la hora y hablar sobre tus rutinas",
      },
      {
        id: 18,
        texto: "Demostrar que estás de acuerdo y tienes cosas en común ",
      },
      {
        id: 19,
        texto: "Comparar diferentes semanas de trabajo ",
      },
    ],
  },
  {
    id: 6,
    ciclo: 0,
    unidad: "6",
    texto: "Zoom in, zoom out ",
    detalles: [
      {
        id: 20,
        texto: "Hablar de lugares en la ciudad ",
      },
      {
        id: 21,
        texto: "Hablar sobre la naturaleza en tu área ",
      },
      {
        id: 22,
        texto: "Pedir y dar instrucciones ",
      },
      {
        id: 23,
        texto: "Planificar un nuevo vecindario para una ciudad ",
      },
    ],
  },
];

const cicloNext = [
  {
    id: 7,
    ciclo: 1,
    unidad: "7",
    texto: "Now is good ",
    detalles: [
      {
        id: 24,
        texto: "Hablar sobre actividades alrededor de la casa ",
      },
      {
        id: 25,
        texto: "Hacer y responder preguntas acerca de los viajes",
      },
      {
        id: 26,
        texto: "Compartir noticias por teléfono",
      },
      {
        id: 27,
        texto: "Preguntar qué está haciendo la gente estos días",
      },
    ],
  },
  {
    id: 8,
    ciclo: 1,
    unidad: "8",
    texto: "You’re good!",
    detalles: [
      {
        id: 28,
        texto: "Hablar sobre tus habilidades y destrezas ",
      },
      {
        id: 29,
        texto:
          "Decir lo que puedes y no puedes hacer en el trabajo o en la escuela",
      },
      {
        id: 30,
        texto: "Decir por qué eres la persona adecuada para un trabajo",
      },
      {
        id: 31,
        texto: "Hablar acerca de en qué son buenas las personas en tu país",
      },
    ],
  },
  {
    id: 9,
    ciclo: 1,
    unidad: "9",
    texto: "Places to go",
    detalles: [
      {
        id: 32,
        texto: "Hablar sobre viajes y vacaciones ",
      },
      {
        id: 33,
        texto: "Hacer planes de viaje",
      },
      {
        id: 34,
        texto: "Pedir información en una tienda",
      },
      {
        id: 35,
        texto: "Planificar unas vacaciones para alguien",
      },
    ],
  },
  {
    id: 10,
    ciclo: 1,
    unidad: "10",
    texto: "Get ready",
    detalles: [
      {
        id: 36,
        texto: "Hacer planes al aire libre para el fin de semana",
      },
      {
        id: 37,
        texto: "Discutir qué ropa usar para diferentes viajes ",
      },
      {
        id: 38,
        texto: "Sugerir planes para actividades nocturnas ",
      },
      {
        id: 39,
        texto: "Planificar y presentar un fin de semana divertido en tu ciudad",
      },
    ],
  },
  {
    id: 11,
    ciclo: 1,
    unidad: "11",
    texto: "Colorful memories",
    detalles: [
      {
        id: 40,
        texto: "Describir personas, lugares y cosas en el pasado",
      },
      {
        id: 41,
        texto: "Hablar sobre colores y recuerdos",
      },
      {
        id: 42,
        texto: "Hablar de películas y actores",
      },
      {
        id: 43,
        texto: "Hablar sobre programas de televisión de tu niñez ",
      },
    ],
  },
  {
    id: 12,
    ciclo: 1,
    unidad: "12",
    texto: "Stop, eat, go",
    detalles: [
      {
        id: 44,
        texto: "Hablar sobre bocadillos y comidas pequeñas ",
      },
      {
        id: 45,
        texto: "Hablar sobre comidas en restaurantes ",
      },
      {
        id: 46,
        texto: "Ofrecer y aceptar comida y bebida",
      },
      {
        id: 47,
        texto: "Crear un menú para un restaurante",
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
          <router-link v-if="props.link" class="flex items-center gap-2" to="/contenido">
            <span class="text-[#E50A17] font-bold text-sm">Ver más</span>
            <i class="icon-arrow-right text-[#E50A17]"></i>
          </router-link>
        </div>
        <div class="flex items-center gap-4 mb-[22px]">
          <TabContent :tabs="tabs" @tabChange="handleTabChange"></TabContent>
        </div>
        <div class="min-h-[222px]" :class="{ 'overflow-y-auto max-h-[222px]': props.open }">
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
