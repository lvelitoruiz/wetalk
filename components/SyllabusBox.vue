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
  { texto: "Próximo Ciclo", value: false },
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

const eventClickVerMas = () => {
  if(dataLayer){
      dataLayer.push({
          event: 'Click-VerMasContenido',
      })
  }
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
          <router-link @click="eventClickVerMas()"
            v-if="props.link"
            class="flex items-center gap-2"
            to="/contenido"
          >
            <span class="text-[#E50A17] font-bold text-sm">Ver más</span>
            <i class="icon-arrow-right text-[#E50A17]"></i>
          </router-link>
          <div class="hidden lg:block" v-if="!props.link">
            <Button v-if="!props.link" label="Descargar Syllabus" primary downloadIcon @click="downloadFile()" />
          </div>
        </div>
        <div class="flex items-center gap-4 mb-[22px]">
          <TabContent v-if="props.tabShow" :tabs="tabs" @tabChange="handleTabChange"></TabContent>
          <div v-if="!props.tabShow" class="flex items-center my-1.5">
            <select
              class="h-10 leading-10 w-[240px] flex items-center justify-between px-2.5 rounded border border-gray-900 text-sm cursor-pointer outline-none"
              @change="triggerCycle()">
              <option value="0">Beginner</option>
              <option value="1">High Beginner</option>
              <option value="2">Basic</option>
              <option value="3">Low Intermediate</option>
              <option value="4">Intermediate</option>
            </select>
            <button class="bg-[#E50A17] rounded-full ml-6 h-[31px] w-[31px] flex items-center justify-center lg:hidden" @click="downloadFile()">
              <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none" class="mr">
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M7.22941 10.3014C7.11269 10.3014 7.00067 10.3474 6.91765 10.4294C6.8356 10.5124 6.78959 10.6245 6.78959 10.7412C6.78959 10.8579 6.8356 10.9699 6.91765 11.0529L10.1882 14.3235C10.229 14.3634 10.2769 14.3954 10.3294 14.4176C10.3834 14.4406 10.4414 14.4526 10.5 14.4529C10.5587 14.4532 10.6168 14.4412 10.6706 14.4176C10.7231 14.3954 10.771 14.3634 10.8118 14.3235L14.0824 11.0529C14.1603 10.9693 14.2027 10.8587 14.2007 10.7444C14.1987 10.6301 14.1524 10.5211 14.0715 10.4402C13.9907 10.3594 13.8817 10.3131 13.7674 10.3111C13.6531 10.3091 13.5425 10.3515 13.4588 10.4294L10.9412 12.9471L10.9412 2.94118C10.9412 2.82417 10.8947 2.71195 10.812 2.62922C10.7292 2.54648 10.617 2.5 10.5 2.5C10.383 2.5 10.2708 2.54648 10.188 2.62922C10.1053 2.71195 10.0588 2.82417 10.0588 2.94118L10.0588 12.9471L7.54118 10.4294C7.45816 10.3474 7.34614 10.3014 7.22941 10.3014ZM16.3824 17.5L4.61765 17.5C4.40517 17.5002 4.19475 17.4584 3.99842 17.3772C3.80209 17.2959 3.6237 17.1768 3.47345 17.0265C3.32321 16.8763 3.20406 16.6979 3.12282 16.5016C3.04158 16.3053 2.99985 16.0948 3 15.8824L3 10C3 9.88299 3.04648 9.77078 3.12922 9.68804C3.21195 9.60531 3.32417 9.55882 3.44118 9.55882C3.55818 9.55882 3.6704 9.60531 3.75314 9.68804C3.83587 9.77078 3.88235 9.88299 3.88235 10L3.88235 15.8824C3.88235 16.0774 3.95982 16.2644 4.09772 16.4023C4.23561 16.5402 4.42264 16.6176 4.61765 16.6176L16.3824 16.6176C16.5774 16.6176 16.7644 16.5402 16.9023 16.4023C17.0402 16.2644 17.1176 16.0774 17.1176 15.8824L17.1176 10C17.1176 9.88299 17.1641 9.77078 17.2469 9.68804C17.3296 9.6053 17.4418 9.55882 17.5588 9.55882C17.6758 9.55882 17.788 9.6053 17.8708 9.68804C17.9535 9.77078 18 9.88299 18 10L18 15.8824C18.0002 16.0948 17.9584 16.3053 17.8772 16.5016C17.7959 16.6979 17.6768 16.8763 17.5265 17.0265C17.3763 17.1768 17.1979 17.2959 17.0016 17.3772C16.8053 17.4584 16.5948 17.5002 16.3824 17.5Z"
                  fill="white" />
              </svg>
            </button>
          </div>
        </div>
        <div class="min-h-[260px] lg:min-h-[422px]" :class="{ 'overflow-y-auto max-h-[422px]': props.open }">
          <div v-if="actual">
            <div v-for="item in cicloNow" :key="item">
              <div class="flex items-center gap-2">
                <span
                  class="w-5 h-5 border-2 border-[#A9616D] flex items-center justify-center text-xs text-[#A9616D] font-bold rounded-full">{{
                    item.unidad }}</span>
                <p class="text-sm text-[#A9616D] font-bold">{{ item.texto }}</p>
              </div>
              <div
                class="relative pt-[10px] pl-[30px] pb-[19px] before:content-[''] before:left-[9px] before:absolute before:top-0 before:w-[2px] before:bottom-0 before:bg-[#A9616D]">
                <ul class="list-disc text-[#808080] ml-4 text-sm">
                  <li :class="{ 'pb-2': index + 1 !== item.detalles.length }" v-for="(detalle, index) in item.detalles"
                    :key="index">
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
                  class="w-5 h-5 border-2 border-[#A9616D] flex items-center justify-center text-xs text-[#A9616D] font-bold rounded-full">{{
                    item.unidad }}</span>
                <p class="text-sm text-[#A9616D] font-bold">{{ item.texto }}</p>
              </div>
              <div
                class="relative pt-[10px] pl-[30px] pb-[19px] before:content-[''] before:left-[9px] before:absolute before:top-0 before:w-[2px] before:bottom-0 before:bg-[#A9616D]">
                <ul class="list-disc text-[#808080] ml-4 text-sm">
                  <li :class="{ 'pb-2': index + 1 !== item.detalles.length }" v-for="(detalle, index) in item.detalles"
                    :key="index">
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
