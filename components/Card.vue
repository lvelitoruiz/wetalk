<template>
  <div v-for="(data, index) in props.data" :key="index">
    <nuxt-link v-if="!data.url_externa" :to="'/' + props.section +'/' + data.id">
      <div class="block md:flex items-center justify-start mb-[20px]">
        <div class="relative w-full md:w-2/5">
          <picture>
            <source class="w-full" :srcSet="data.imagen_principal" media="(min-width: 768px)"/>
            <source class="w-full" :srcSet="data.imagen_principal" media="(max-width: 768px)"/>
            <img class="max-w-[480px] w-full rounded-br-[7px] md:mb-0 mb-[15px]" :src="data.imagen_principal" alt="" loading="lazy" width={482} height={269} />
          </picture>
        </div>
        <div class="flex flex-wrap w-full md:w-3/5 px-0 md:px-[15px]">
          <span  v-if="data.categoria" class="text-[10px] font-zizou-regular font-medium rounded-[4px] bg-[#0043AA] text-[#FFFFFF] px-[8px] py-[4px] mb-[5px]">{{ data.categoria }}</span>
          <div class="w-full font-solano text-[#0043AA] font-bold text-[16px] mb-[5px]">{{ data.titulo }}</div>
          <div class="w-full font-publicSans text-[#191919] text-[12px]">{{ data.descripcion_corta }}</div>
        </div>
      </div>
    </nuxt-link>
    <a v-else :href="data.url_externa" target="_blank" rel="noopener noreferrer">
      <div class="block md:flex items-center justify-start mb-[20px]">
        <div class="relative w-full md:w-2/5">
          <picture>
            <source class="w-full" :srcSet="data.imagen_principal" media="(min-width: 768px)"/>
            <source class="w-full" :srcSet="data.imagen_principal" media="(max-width: 768px)"/>
            <img class="max-w-[480px] w-full rounded-br-[7px] md:mb-0 mb-[15px]" :src="data.imagen_principal" alt="" loading="lazy" width={482} height={269} />
          </picture>
        </div>
        <div class="flex flex-wrap w-full md:w-3/5 px-0 md:px-[15px]">
          <span  v-if="data.categoria" class="text-[10px] font-zizou-regular font-medium rounded-[4px] bg-[#0043AA] text-[#FFFFFF] px-[8px] py-[4px] mb-[5px]">{{ data.categoria }}</span>
          <div class="w-full font-solano text-[#0043AA] font-bold text-[16px] mb-[5px]">{{ data.titulo }}</div>
          <div class="w-full font-publicSans text-[#191919] text-[12px]">{{ data.descripcion_corta }}</div>
        </div>
      </div>
    </a>
  </div>
</template>

<script setup>
  const props = defineProps({
    data: Array,
    section: String,
  })
</script>