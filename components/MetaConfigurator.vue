<!-- eslint-disable array-callback-return -->
<!-- eslint-disable no-undef -->
<script setup>
import { ref, watchEffect, onMounted } from 'vue';
import { apiUrl } from '~/consts';
import { useMetaStore } from '../stores/meta';
import GraphemeSplitter from 'grapheme-splitter';
import { Vue3Lottie } from 'vue3-lottie';

const metaStore = useMetaStore();
const metaData = ref(null);
const illustrations = ref(null);
const meta = ref('');
const selectedColor = ref('#FE91A4');
const selectedImage = ref('');
const anotherdImage = ref('');
const graphemesNow = ref(0);

const handleMeta = (event) => {
  const splitter = new GraphemeSplitter();
  const graphemes = splitter.splitGraphemes(meta.value);
  graphemesNow.value = graphemes;

  if (graphemes.length > 65) {
    meta.value = graphemes.slice(0, 65).join('');
  }
};

const fetchMetaInfo = async () => {
  await metaStore.fetchMetaData(apiUrl);
};

watchEffect(() => {
  const data = metaStore.getMetaData;
  const images = metaStore.getImages;
  if (data.length > 0) {
    metaData.value = data[0];
    meta.value = metaData.value?.meta;
    selectedColor.value = metaData.value?.color;
    if (metaData.value?.imagen !== '' && metaData.value?.imagen !== null) {
      selectedImage.value = metaData.value?.imagen;
    }
  }
  if (images) {
    const formattedImages = images.map((item) => ({
      imagen: item.imagen,
      imagen_estatica: item.imagen_estatica,
      categoria: item.categoria,
      active: false,
    }));

    anotherdImage.value = images[0].imagen;
    illustrations.value = formattedImages;
  }
});

onMounted(async () => {
  const splitter = new GraphemeSplitter();
  const graphemes = splitter.splitGraphemes(meta.value);
  graphemesNow.value = graphemes;
});

const hasMeta = computed(() => meta.value !== '');

const markImage = () => {
  illustrations.value.map((item, index) => {
    if (item.imagen === selectedImage.value) {
      item.active = true;
    } else if (index === 0 && selectedImage.value === '') {
      item.active = true;
    } else {
      item.active = false;
    }
  });
};

const updateMeta = async (ignoreDataLayer) => {
  // const codUser = localStorage.getItem("codUser");
  const codUser = (await metaStore.fetchData())?.localCodUser;

  const metaItem = {
    id: codUser,
    imagen: selectedImage.value,
    meta: meta.value,
    color: '#FFA439',
  };

  await metaStore.registerMetaData(apiUrl, metaItem);
  await fetchMetaInfo();
  markImage();
  if (!ignoreDataLayer) {
    if (dataLayer) {
      dataLayer.push({
        event: 'Mi_Meta_Guardar',
        name: 'Evento_Mi_Meta_Guardar',
        Click_Text: 'Guardar cambios',
      });
    }
  }
};

const cleanMeta = async () => {
  meta.value = '';
  selectedColor.value = '';
  selectedImage.value = '';
  await updateMeta(true);
  await fetchMetaInfo();
  graphemesNow.value = '';
  markImage();
  if (dataLayer) {
    dataLayer.push({
      event: 'Mi_Meta_Eliminar',
      name: 'Evento_Mi_Meta_Eliminar',
      Click_Text: 'Eliminar meta',
    });
  }
};

const changeImage = (indexItem, newImage) => {
  console.log('illustrations: ', illustrations.value, indexItem, newImage);
  illustrations.value.map((item, index) => {
    if (index === indexItem) {
      item.active = true;
    } else {
      item.active = false;
    }
  });
  selectedImage.value = newImage;
};
</script>
<template>
  <ContainerBoxSimple>
    <div class="flex items-center lg:justify-between pb-6">
      <h3 class="text-[#404040] text-[32px] font-bold font-solano uppercase">
        Mi meta
      </h3>
      <div class="hidden lg:flex flex-row items-center lg:gap-[31px]">
        <Button
          label="Eliminar meta"
          secundary
          :disabled="!hasMeta"
          @click="cleanMeta"
        />
        <Button
          label="Guardar cambios"
          primary
          :disabled="!hasMeta"
          @click="updateMeta(false)"
        />
      </div>
    </div>
    <div class="flex lg:flex-row flex-col gap-5">
      <div
        class="lg:min-w-[369px] lg:max-w-[369px] pb-[18px] lg:pb-0 lg:border-r border-b lg:border-b-0 border-[#D9D9D9] pr-0 lg:pr-7"
      >
        <div class="flex items-center justify-center flex-col gap-[14px]">
          <client-only>
            <Vue3Lottie
              v-if="selectedImage !== ''"
              :animation-link="selectedImage"
              :height="200"
              :width="255"
              class="min-w-[255px] h-auto"
            />
            <Vue3Lottie
              v-else
              :animation-link="anotherdImage"
              :height="200"
              :width="255"
              class="min-w-[255px] h-auto"
            />
          </client-only>
          <div class="relative flex items-center flex-col justify-center">
            <div class="triangulo-up" style="position: relative" />
            <div
              class="bg-white shadow-[0_0_20px_0_rgba(77,39,37,0.25)] px-5 py-2 w-full flex justify-between items-center rounded-lg"
            >
              <p
                v-if="meta !== ''"
                class="text-base text-center text-[#000] min-h-[16px] min-w-[40px]"
              >
                {{ meta }}
              </p>
              <p
                v-if="meta === ''"
                class="text-base text-center text-[#A6A6A6] min-h-[16px] min-w-[40px]"
              >
                Cuéntanos tu meta al estudiar inglés, y alcancémosla juntos 🏁🏆
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full flex gap-4 flex-col">
        <div class="relative mb-7">
          <div class="flex items-center justify-between pb-2">
            <p class="text-[#404040] font-bold font-solano uppercase">
              Selecciona una ilustración
            </p>
          </div>
          <div class="grid md:grid-cols-4 grid-cols-2 gap-4">
            <img
              v-for="(illustration, index) in illustrations"
              :key="index"
              class="lg:min-w-[100px] min-h-[78px] col-span-1 h-auto cursor-pointer rounded-md"
              :class="{
                'border-[3px] border-gray-700': illustration.active,
                'border border-gray-400': !illustration.active,
              }"
              :src="illustration.imagen_estatica"
              alt=""
              @click="() => changeImage(index, illustration.imagen)"
            />
          </div>
        </div>
        <div class="relative">
          <div class="flex items-center justify-between pb-2">
            <p class="text-[#404040] font-bold font-solano uppercase">
              Cuéntanos tu meta
            </p>
            <p class="hidden lg:block text-xs text-[#808080]">
              {{ graphemesNow.length > 65 ? 65 : graphemesNow.length || 0 }}/65
            </p>
          </div>
          <input
            v-model="meta"
            class="border border-[#BFBFBF] placeholder:text-[#A6A6A6] h-[38px] outline-none hover:outline-[#191919] hover:border-none focus:outline-black focus:border-none invalid:outline-red-700 invalid:border-none px-[12px] w-full rounded placeholder:text-sm text-base"
            placeholder="Cuéntanos tu meta al estudiar inglés, y alcancémosla juntos 🏁🏆"
            type="text"
            @input="handleMeta"
          />
          <div class="pt-2 lg:hidden flex justify-end mb-4">
            <p class="text-xs text-[#808080]">
              {{ graphemesNow.length > 65 ? 65 : graphemesNow.length || 0 }}/65
            </p>
          </div>
          <div class="lg:hidden flex flex-col gap-3">
            <Button
              label="Eliminar meta"
              secundary
              :disabled="!hasMeta"
              @click="cleanMeta"
            />
            <Button
              label="Guardar cambios"
              primary
              :disabled="!hasMeta"
              @click="updateMeta(false)"
            />
          </div>
        </div>
      </div>
    </div>
  </ContainerBoxSimple>
</template>
