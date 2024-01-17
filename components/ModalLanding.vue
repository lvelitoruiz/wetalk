<!-- eslint-disable no-undef -->
<!-- eslint-disable vue/valid-define-emits -->
<script setup>
import { defineEmits, ref } from 'vue';

const emit = defineEmits();

const triggerModal = () => {
  emit('modal-close');
};

const institucionSeleccionada = ref(0);
const esAlumnoNuevo = ref(null);

const enlaces = [
  { true: '', false: '' },
  { true: 'https://idiomas.upc.edu.pe/', false: 'https://idiomas.upc.edu.pe/' },
  { true: 'https://wa.link/yd1ig9', false: 'https://bit.ly/3h2sVlt' },
  { true: 'https://wa.link/5ouyu7', false: 'https://wa.link/m236ca' },
  { true: 'http://bit.ly/3rAA7h6', false: 'https://idiomas.upc.edu.pe/' },
];

const eventClickMasInformacion = (text) => {
  emit('modal-open');
  if (dataLayer) {
    dataLayer.push({
      event: 'Mas_Informacion_Modal',
      name: 'Evento_Mas_Informacion_Modal',
      Click_text: text,
    });
  }
};
</script>
<template>
  <section
    class="fixed top-0 left-0 right-0 bottom-0 bg-[#00000069] flex items-center justify-center z-50"
  >
    <div
      class="bg-white p-10 relative rounded-none min-w-[90%] md:min-w-[479px]"
    >
      <i
        @click="triggerModal"
        class="absolute top-4 right-4 text-red-600 text-base icon-close cursor-pointer"
      />
      <h3 class="mb-2 font-bold text-lg uppercase font-solano">
        Selecciona una institución
      </h3>
      <select
        class="mb-6 rounded px-3 py-[10px] w-full border border-[#BFBFBF] outline-none hover:outline-[#191919] hover:border-none focus:outline-black focus:border-none invalid:outline-red-700 invalid:border-none text-sm cursor-pointer"
        name=""
        id=""
        v-model="institucionSeleccionada"
      >
        <option value="0">Selecciona</option>
        <option value="1">Alumno UPC</option>
        <option value="2">Alumno UPN</option>
        <option value="3">Alumno Cibertec</option>
        <option value="4">Alumno externo</option>
      </select>
      <div>
        <p class="mb-4 font-bold text-lg uppercase font-solano">
          ¿Eres nuevo en WeTALK?
        </p>
        <div
          class="flex md:items-center gap-[17px] md:gap-16 flex-col md:flex-row"
        >
          <div class="flex items-center">
            <input
              id="default-radio-1"
              type="radio"
              :value="true"
              name="default-radio"
              class="outline-none w-5 h-5 border-[#404040] focus:ring-transparent cursor-pointer"
              v-model="esAlumnoNuevo"
            >
            <label
              for="default-radio-1"
              class="ms-[11px] text-[#404040]"
            >Sí, soy nuevo</label>
          </div>
          <div class="flex items-center">
            <input
              id="default-radio-2"
              type="radio"
              :value="false"
              name="default-radio"
              class="outline-none w-5 h-5 border-[#404040] focus:ring-transparent cursor-pointer"
              v-model="esAlumnoNuevo"
            >
            <label
              for="default-radio-2"
              class="ms-[11px] text-[#404040]"
            >No, ya estudié antes</label>
          </div>
        </div>
        <div class="flex justify-center items-center mt-8">
          <a
            class="display inline-block w-auto pr-1 pb-1 relative"
            :href="enlaces[institucionSeleccionada][esAlumnoNuevo]"
            @click="
              eventClickMasInformacion(
                enlaces[institucionSeleccionada][esAlumnoNuevo]
              )
            "
            target="_blank"
          >
            <span
              class="inline-block p-2.5 leading-6 w-full font-zizou-bold text-normal relative z-10"
              :class="{
                'bg-[#E50A17] text-white transition-all duration-300 ease-in-out hover:bg-[#B70812]':
                  esAlumnoNuevo === true || esAlumnoNuevo === false,
                'bg-[#808080] text-white transition-all duration-300 ease-in-out':
                  esAlumnoNuevo == null || esAlumnoNuevo == undefined,
              }"
            >
              <div class="flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="21"
                  height="20"
                  viewBox="0 0 21 20"
                  fill="none"
                  class="mr-2"
                  v-if="downloadIcon"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7.22941 10.3014C7.11269 10.3014 7.00067 10.3474 6.91765 10.4294C6.8356 10.5124 6.78959 10.6245 6.78959 10.7412C6.78959 10.8579 6.8356 10.9699 6.91765 11.0529L10.1882 14.3235C10.229 14.3634 10.2769 14.3954 10.3294 14.4176C10.3834 14.4406 10.4414 14.4526 10.5 14.4529C10.5587 14.4532 10.6168 14.4412 10.6706 14.4176C10.7231 14.3954 10.771 14.3634 10.8118 14.3235L14.0824 11.0529C14.1603 10.9693 14.2027 10.8587 14.2007 10.7444C14.1987 10.6301 14.1524 10.5211 14.0715 10.4402C13.9907 10.3594 13.8817 10.3131 13.7674 10.3111C13.6531 10.3091 13.5425 10.3515 13.4588 10.4294L10.9412 12.9471L10.9412 2.94118C10.9412 2.82417 10.8947 2.71195 10.812 2.62922C10.7292 2.54648 10.617 2.5 10.5 2.5C10.383 2.5 10.2708 2.54648 10.188 2.62922C10.1053 2.71195 10.0588 2.82417 10.0588 2.94118L10.0588 12.9471L7.54118 10.4294C7.45816 10.3474 7.34614 10.3014 7.22941 10.3014ZM16.3824 17.5L4.61765 17.5C4.40517 17.5002 4.19475 17.4584 3.99842 17.3772C3.80209 17.2959 3.6237 17.1768 3.47345 17.0265C3.32321 16.8763 3.20406 16.6979 3.12282 16.5016C3.04158 16.3053 2.99985 16.0948 3 15.8824L3 10C3 9.88299 3.04648 9.77078 3.12922 9.68804C3.21195 9.60531 3.32417 9.55882 3.44118 9.55882C3.55818 9.55882 3.6704 9.60531 3.75314 9.68804C3.83587 9.77078 3.88235 9.88299 3.88235 10L3.88235 15.8824C3.88235 16.0774 3.95982 16.2644 4.09772 16.4023C4.23561 16.5402 4.42264 16.6176 4.61765 16.6176L16.3824 16.6176C16.5774 16.6176 16.7644 16.5402 16.9023 16.4023C17.0402 16.2644 17.1176 16.0774 17.1176 15.8824L17.1176 10C17.1176 9.88299 17.1641 9.77078 17.2469 9.68804C17.3296 9.6053 17.4418 9.55882 17.5588 9.55882C17.6758 9.55882 17.788 9.6053 17.8708 9.68804C17.9535 9.77078 18 9.88299 18 10L18 15.8824C18.0002 16.0948 17.9584 16.3053 17.8772 16.5016C17.7959 16.6979 17.6768 16.8763 17.5265 17.0265C17.3763 17.1768 17.1979 17.2959 17.0016 17.3772C16.8053 17.4584 16.5948 17.5002 16.3824 17.5Z"
                    fill="white"
                  />
                </svg>
                Más información aquí
              </div>
            </span>
            <span
              class="border-[#808080] inline-block p-2.5 leading-6 font-zizou-bold text-normal text-white border box-border absolute h-[calc(100%-4px)] w-[calc(100%-4px)] right-0 bottom-0 z-0"
            />
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
