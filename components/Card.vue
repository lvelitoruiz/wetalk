<template>
  <div v-for="(data, index) in dataCard" :key="index">
    <router-link v-if="!data.url_externa" :to="'/beyond/' + data.id">
      <div class="block md:flex items-center justify-start mb-[20px]">
        <div class="relative w-full md:w-2/5">
          <picture>
            <source class="w-full" srcSet="https://i.ibb.co/SBvhPmK/Frame-1000006166-1.png" media="(min-width: 768px)"/>
            <source class="w-full" srcSet="https://i.ibb.co/SBvhPmK/Frame-1000006166-1.png" media="(max-width: 768px)"/>
            <img class="max-w-[480px] w-full rounded-br-[7px] md:mb-0 mb-[15px]" src="https://i.ibb.co/SBvhPmK/Frame-1000006166-1.png" alt="" loading="lazy" width={482} height={269} />
          </picture>
        </div>
        <div class="flex flex-wrap w-full md:w-3/5 px-0 md:px-[15px]">
          <span  v-if="data.categoria" class="text-[10px] font-zizou-regular font-medium rounded-[4px] bg-[#0043AA] text-[#FFFFFF] px-[8px] py-[4px] mb-[5px]">{{ data.categoria }}</span>
          <div class="w-full font-solano text-[#0043AA] font-bold text-[16px] mb-[5px]">{{ data.titulo }}</div>
          <div class="w-full font-publicSans text-[#191919] text-[12px]">{{ data.descripcion_corta }}</div>
        </div>
      </div>
    </router-link>
    <a v-else :href="data.url_externa" target="_blank" rel="noopener noreferrer">
      <div class="block md:flex items-center justify-start mb-[20px]">
        <div class="relative w-full md:w-2/5">
          <picture>
            <source class="w-full" srcSet="https://i.ibb.co/SBvhPmK/Frame-1000006166-1.png" media="(min-width: 768px)"/>
            <source class="w-full" srcSet="https://i.ibb.co/SBvhPmK/Frame-1000006166-1.png" media="(max-width: 768px)"/>
            <img class="max-w-[480px] w-full rounded-br-[7px] md:mb-0 mb-[15px]" src="https://i.ibb.co/SBvhPmK/Frame-1000006166-1.png" alt="" loading="lazy" width={482} height={269} />
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
  const dataCard = ref([]);

  const props = defineProps({
    data: Array,
  })

  if(props.data) {
    dataCard.value = props.data;
  }

  watch(() => props.data, (newData) => {
    dataCard.value = newData;
  });
</script>