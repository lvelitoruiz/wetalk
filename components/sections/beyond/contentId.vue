<template>
  <div>
    <div class="pb-7">
      <BoxContainer color="black">
        <img :src="bg_triangles_gray" alt="Background Image" class="absolute top-[0px] left-[0px] z-[-1]" />
        <div class="flex items-baseline justify-between pb-[15px]">
          <div @click="goBack()" class="md:flex hidden items-center gap-2 cursor-pointer">
            <i class="icon-arrow-right text-[#404040] rotate-180"></i>
            <span class="text-[#404040] font-bold font-zizou-bold text-sm">Atrás</span>
          </div>
        </div>
        <div class="relative black-scroll min-h-[300px] overflow-y-auto max-h-[550px]">
          <div v-for="(data, index) in dataContent" :key="index">
            <h3 class="text-[#0043AA] text-2xl mb-[10px]">
              <span class="uppercase font-bold font-solano">{{ data.titulo }}</span>
            </h3>
            <div class="card-content">
              <div class="text-[#404040] text-[14px] font-publicSans">{{ data.descripcion_corta }}</div>
              <div class="relative my-[22px]">
                <img :src="data.imagen_principal" alt="Imagen Beyond" class=" max-w-auto md:max-w-[470px] w-full">
              </div>
              <div class="text-[#404040] text-[14px] font-publicSans" v-html="data.body"></div>
            </div>
            </div>
        </div>
      </BoxContainer>
    </div>
  </div>
</template>

<script setup >
  import { bg_triangles_gray } from '@/assets/index.ts';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const dataContent = ref([]);

  const props = defineProps({
    data: Array
  })

  watchEffect(() => {
    dataContent.value = props.data;
  });

  const goBack = () => {
    router.go(-1);
  };

</script>

<style>
  .card-content h1 {
    font-size: 36px;
    line-height: 46px;
    margin-top: 1em;
  }

  .card-content h2 {
    font-size: 24px;
    line-height: 34px;
    margin-top: 1.25em;
  }

  .card-content h3 {
    font-size: 19px;
    line-height: 29px;
    margin-top: 1.25em;
  }

  .card-content a {
    text-decoration: underline;
    color: #0065ff;
  }

  .card-content p {
    margin: 1.5em 0;
  }

  .card-content ol {
    display: block;
    margin: 1.5em 0;
    list-style-type: decimal;
    margin-block-start: 1em;
    margin-block-end: 1em;
    padding-inline-start: 40px;
  }

  .card-content ul {
    display: block;
    margin: 1.5em 0;
    list-style-type: disc;
    margin-block-start: 1em;
    margin-block-end: 1em;
    padding-inline-start: 40px;
  }

  .card-content li {
    position: relative;
    display: list-item;
    text-align: -webkit-match-parent;
  }
  
  .card-content li::after {
    content: '';
    unicode-bidi: isolate;
    font-variant-numeric: tabular-nums;
    text-transform: none;
    text-indent: 0px !important;
    text-align: start !important;
    text-align-last: start !important;
  }

  @media (max-width: 768px) {
    .card-content h1 {
      font-size: 20px;
      line-height: 26px;
      margin-top: 0.6em;
    }

    .card-content h2 {
      font-size: 18px;
      line-height: 26px;
      margin-top: 1em;
    }

    .card-content h3 {
      font-size: 14px;
      line-height: 20px;
      margin-top: 1em;
    }
  }
</style>