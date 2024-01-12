<template>
  <div>
    <div class="pb-7">
      <BoxContainer color="black">
        <img :src="bg_triangles_gray" alt="Background Image" class="absolute top-[0px] left-[0px] z-[-1]" />
        <div class="flex items-baseline justify-between pb-2">
          <router-link @click="eventClickVerMas()" class="flex items-center gap-2" to="/notas">
            <i class="icon-arrow-right text-[#404040] rotate-180"></i>
            <span class="text-[#404040] font-bold font-zizou-bold text-sm">Atrás</span>
          </router-link>
        </div>
        <div class="relative black-scroll min-h-[300px] overflow-y-auto max-h-[500px]">
          <h3 class="text-[#404040] text-2xl">
            <span class="uppercase font-bold font-solano">Beyond WeTALK</span>
            <p class="text-[14px] font-publicSans">Recomendaciones para ti</p>
          </h3>
          asdasdx
        </div>
      </BoxContainer>
    </div>
  </div>
</template>

<script setup >
  import { bg_triangles_gray } from '@/assets/index.ts';

  const dataContent = ref([]);

  const props = defineProps({
    data: Array
  })

  if(props.data) {
    dataContent.value = props.data;
  }

  console.log(dataContent)

</script>