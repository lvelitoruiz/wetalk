<!-- eslint-disable vue/html-indent -->
<!-- eslint-disable vue/html-closing-bracket-newline -->
<!-- eslint-disable vue/require-default-prop -->
<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  data: Array,
  section: String,
});
</script>

<template>
  <div
    v-for="(item, index) in props.data"
    :key="index"
    class="p-3 border rounded-[8px] border-[#D9D9D9] mb-3 mr-4"
  >
    <router-link
      v-if="!item.url_externa"
      :to="'/' + props.section + '/' + item.id"
    >
      <div class="block md:flex items-center justify-start relative">
        <div class="absolute block right-0 top-0" v-if="item.es_recomendado">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.2191 11.682L17.8365 15.0898L21.4509 15.6358C21.6589 15.6681 21.8541 15.7602 22.0145 15.9017C22.175 16.0433 22.2943 16.2287 22.3591 16.4371C22.4239 16.6455 22.4316 16.8686 22.3813 17.0813C22.331 17.294 22.2247 17.4878 22.0744 17.641L19.463 20.2958L20.0775 24.0425C20.1136 24.2585 20.0908 24.4808 20.0116 24.6839C19.9324 24.887 19.8 25.0629 19.6295 25.1915C19.459 25.32 19.2573 25.3961 19.0473 25.411C18.8373 25.4259 18.6276 25.379 18.4419 25.2758L15.2071 23.5059L11.9722 25.2758C11.7863 25.3767 11.5772 25.4218 11.3681 25.4059C11.1591 25.39 10.9584 25.3137 10.7886 25.1857C10.6188 25.0577 10.4866 24.8829 10.4068 24.681C10.327 24.4791 10.3027 24.258 10.3367 24.0425L10.9511 20.2958L8.33972 17.641C8.1894 17.4878 8.08311 17.294 8.0328 17.0813C7.9825 16.8686 7.99018 16.6455 8.05497 16.4371C8.11977 16.2287 8.23912 16.0433 8.39957 15.9017C8.56003 15.7602 8.75523 15.6681 8.9632 15.6358L12.5776 15.0898L14.195 11.682C14.288 11.4849 14.4321 11.319 14.611 11.203C14.7898 11.0869 14.9963 11.0254 15.2071 11.0254C15.4178 11.0254 15.6243 11.0869 15.8032 11.203C15.982 11.319 16.1261 11.4849 16.2191 11.682Z"
              fill="#E50A17"
            />
            <path
              d="M23.9089 18.1021C23.8067 17.7677 23.6159 17.4702 23.3585 17.2437C23.1012 17.0172 22.7877 16.871 22.4542 16.8218L20.8367 16.5771V9.40362C21.3482 9.24588 21.7973 8.92093 22.1179 8.47678C22.4384 8.03263 22.6133 7.49284 22.6168 6.93716V4H9.62308V6.93716C9.6248 7.4933 9.79906 8.03395 10.1199 8.47845C10.4407 8.92296 10.8908 9.24749 11.4032 9.40362V16.5771L9.78572 16.8218C9.45216 16.8723 9.13879 17.019 8.88102 17.2452C8.62325 17.4715 8.43136 17.7684 8.32703 18.1023C8.2227 18.4362 8.21009 18.7939 8.29061 19.1349C8.37114 19.4759 8.5416 19.7866 8.78273 20.032L11.1411 22.4232L10.5809 25.8028C10.5221 26.1477 10.5578 26.503 10.6841 26.8277C10.8104 27.1525 11.022 27.4335 11.2947 27.6385C11.5668 27.8442 11.8888 27.9665 12.2242 27.9915C12.5595 28.0164 12.8949 27.9431 13.1923 27.7797L16.1109 26.1793L19.0295 27.7797C19.3267 27.9432 19.662 28.0167 19.9973 27.9918C20.3325 27.9669 20.6544 27.8445 20.9263 27.6387C21.1982 27.4328 21.4093 27.1517 21.5356 26.8272C21.6619 26.5027 21.6984 26.1478 21.6409 25.8028L21.0807 22.4232L23.4391 20.032C23.6856 19.7903 23.8608 19.4803 23.944 19.1384C24.0272 18.7966 24.0151 18.4371 23.9089 18.1021ZM10.9785 6.93716V5.4121H21.2524V6.93716C21.2524 7.24925 21.1334 7.54856 20.9216 7.76925C20.7097 7.98993 20.4224 8.11391 20.1229 8.11391H12.108C11.8084 8.11391 11.5211 7.98993 11.3093 7.76925C11.0975 7.54856 10.9785 7.24925 10.9785 6.93716ZM12.7586 9.52601H19.4723V16.37L19.1922 16.3229L17.7374 13.2445C17.5902 12.9288 17.3602 12.6631 17.0739 12.4781C16.7876 12.2931 16.4568 12.1966 16.1199 12.1996C15.7837 12.1998 15.4542 12.2977 15.1685 12.4823C14.8828 12.6669 14.6521 12.9308 14.5025 13.2445L13.0477 16.3229L12.7676 16.37V9.52601H12.7586ZM22.5084 19.0153L19.6349 21.9242L20.3126 26.0381C20.3295 26.125 20.3213 26.2151 20.2891 26.2972C20.257 26.3793 20.2023 26.4496 20.1319 26.4994C20.0651 26.5515 19.9854 26.5826 19.9022 26.5893C19.819 26.596 19.7357 26.5778 19.662 26.5371L16.1199 24.5978L12.5688 26.5371C12.4959 26.5807 12.4121 26.6004 12.3283 26.5937C12.2445 26.587 12.1646 26.5541 12.0989 26.4994C12.0316 26.4467 11.9793 26.376 11.9475 26.2947C11.9157 26.2135 11.9056 26.1249 11.9182 26.0381L12.5959 21.9242L9.72247 19.0153C9.66276 18.954 9.62026 18.8769 9.59955 18.7923C9.57885 18.7077 9.58074 18.6188 9.605 18.5352C9.6286 18.4509 9.67541 18.3756 9.73966 18.3187C9.8039 18.2618 9.88275 18.2258 9.96644 18.2151L13.9332 17.6126L15.7043 13.8659C15.7402 13.7856 15.7978 13.7179 15.87 13.6711C15.9422 13.6243 16.0259 13.6004 16.1109 13.6023C16.1945 13.6017 16.2764 13.6263 16.347 13.673C16.4175 13.7198 16.4736 13.7867 16.5085 13.8659L18.2795 17.6126L22.2463 18.2151C22.33 18.2258 22.4089 18.2618 22.4731 18.3187C22.5374 18.3756 22.5842 18.4509 22.6078 18.5352C22.6413 18.616 22.6497 18.7058 22.6319 18.7918C22.6141 18.8779 22.5709 18.956 22.5084 19.0153Z"
              fill="#191919"
            />
          </svg>
        </div>
        <div class="relative w-full md:w-2/5">
          <picture>
            <source
              class="w-full"
              :srcSet="item.imagen_principal"
              media="(min-width: 768px)"
            />
            <source
              class="w-full"
              :srcSet="item.imagen_principal"
              media="(max-width: 768px)"
            />
            <img
              class="max-w-[480px] w-full rounded-br-[7px] md:mb-0 mb-[15px]"
              :src="item.imagen_principal"
              alt=""
              loading="lazy"
              width="{482}"
              height="{269}"
            />
          </picture>
        </div>
        <div class="flex flex-wrap w-full md:w-3/5 px-0 md:px-[15px]">
          <span
            v-if="item.categoria"
            class="text-[10px] font-zizou-regular font-medium rounded-[4px] bg-[#0043AA] text-[#FFFFFF] px-[8px] py-[4px] mb-[5px]"
          >{{ item.categoria }}</span>
          <div
            class="w-full font-solano text-[#0043AA] font-bold text-[16px] mb-[5px]"
          >
            {{ item.titulo }}
          </div>
          <div class="w-full font-publicSans text-[#191919] text-[12px]">
            {{ item.descripcion_corta }}
          </div>
        </div>
      </div>
    </router-link>
    <a
      v-else
      :href="item.url_externa"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div class="block md:flex items-center justify-start">
        <div class="relative w-full md:w-2/5">
          <picture>
            <source
              class="w-full"
              :srcSet="item.imagen_principal"
              media="(min-width: 768px)"
            />
            <source
              class="w-full"
              :srcSet="item.imagen_principal"
              media="(max-width: 768px)"
            />
            <img
              class="max-w-[480px] w-full rounded-br-[7px] md:mb-0 mb-[15px]"
              :src="item.imagen_principal"
              alt=""
              loading="lazy"
              width="{482}"
              height="{269}"
            />
          </picture>
        </div>
        <div class="flex flex-wrap w-full md:w-3/5 px-0 md:px-[15px]">
          <span
            v-if="item.categoria"
            class="text-[10px] font-zizou-regular font-medium rounded-[4px] bg-[#0043AA] text-[#FFFFFF] px-[8px] py-[4px] mb-[5px]"
          >{{ item.categoria }}</span>
          <div
            class="w-full font-solano text-[#0043AA] font-bold text-[16px] mb-[5px]"
          >
            {{ item.titulo }}
          </div>
          <div class="w-full font-publicSans text-[#191919] text-[12px]">
            {{ item.descripcion_corta }}
          </div>
        </div>
      </div>
    </a>
  </div>
</template>
