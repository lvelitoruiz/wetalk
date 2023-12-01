<script setup>
import { useMenuStore } from "../stores/menu";
import { apiUrl } from "~/consts";

const menuStore = useMenuStore();

const dataSyllabus = ref(null);

const cicloNow = ref(null);

const cicloNext = ref(null);

const syllabusFile = ref(null);

const tabs = [
  { texto: "Ciclo Actual", value: true },
  { texto: "Proximo Ciclo", value: false },
];

watchEffect(() => {
  const contenido = menuStore.getContenidoItems;
  if (contenido) {
    dataSyllabus.value = contenido;
  }

  cicloNow.value = dataSyllabus.value[0];
  cicloNext.value = dataSyllabus.value[1];
  syllabusFile.value = dataSyllabus.value[2];
});

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  link: {
    type: Boolean,
    default: false,
  },
  tabShow: {
    type: Boolean,
    default: true,
  },
});

const actual = ref(true);

const handleTabChange = (value) => {
  actual.value = value;
};

const downloadFile = () => {
  const fileUrl = syllabusFile.value;

  const newWindow = window.open(fileUrl, "_blank");
  if (newWindow) {
    newWindow.focus();
  } else {
    alert("Popup blocked. Please allow popups for this website.");
  }
};

const triggerCycle = () => {
  menuStore.fetchContenidoData(apiUrl, event.target.value.toString());
};
</script>
<template>
  <div class="w-full lg:min-w-[65%]">
    <div class="pb-[28px]">
      <BoxContainer color="pink">
        <div class="flex items-center justify-between pb-[18px]">
          <h3 class="text-[#404040] text-2xl font-solano uppercase">
            Contenido
          </h3>
          <router-link
            v-if="props.link"
            class="flex items-center gap-2"
            to="/contenido"
          >
            <span class="text-[#E50A17] font-bold text-sm">Ver más</span>
            <i class="icon-arrow-right text-[#E50A17]"></i>
          </router-link>
          <div class="hidden lg:block">
            <Button
              v-if="!props.link"
              label="Descargar Syllabus"
              primary
              @click="downloadFile()"
            />
          </div>
        </div>
        <div class="flex items-center gap-4 mb-[22px]">
          <TabContent
            v-if="props.tabShow"
            :tabs="tabs"
            @tabChange="handleTabChange"
          ></TabContent>
          <div v-if="!props.tabShow" class="flex items-center my-1.5">
            <select
              
              class="h-10 leading-10 w-[240px] flex items-center justify-between px-2.5 rounded border border-gray-900 text-sm cursor-pointer outline-none"
              @change="triggerCycle()"
            >
              <option value="0">Inglés 0</option>
              <option value="1">Inglés 1</option>
              <option value="2">Inglés 2</option>
              <option value="3">Inglés 3</option>
              <option value="4">Inglés 4</option>
              <option value="5">Inglés 5</option>
            </select>
            <button class="bg-[#E50A17] rounded-full ml-6 h-[26px] w-[26px] flex items-center justify-center lg:hidden">
             <i class="icon-globe text-white"></i> 
            </button>
          </div>
        </div>
        <div
          class="min-h-[222px]"
          :class="{ 'overflow-y-auto max-h-[222px]': props.open }"
        >
          <div v-if="actual">
            <div v-for="item in cicloNow" :key="item">
              <div class="flex items-center gap-2">
                <span
                  class="w-5 h-5 border-2 border-[#A9616D] flex items-center justify-center text-xs text-[#A9616D] font-bold rounded-full"
                  >{{ item.unidad }}</span
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
                    :key="index"
                  >
                    {{ detalle.texto }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div v-else>
            <div v-for="item in cicloNext" :key="item">
              <div class="flex items-center gap-2">
                <span
                  class="w-5 h-5 border-2 border-[#A9616D] flex items-center justify-center text-xs text-[#A9616D] font-bold rounded-full"
                  >{{ item.unidad }}</span
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
                    :key="index"
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
