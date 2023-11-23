<script setup>
import { ref, watchEffect } from "vue";
import { apiUrl } from "~/consts";
import { useMetaStore } from "../stores/meta";
import GraphemeSplitter from "grapheme-splitter";

import animation from "@/assets/images/Ilustracion1.json";

const metaStore = useMetaStore();
const metaData = ref(null);
const illustrations = ref(null);
const meta = ref("");
const selectedColor = ref("#FE91A4");
const selectedImage = ref(
  "https://wetalk-directus-dev-upc.stage01.link/assets/ca00ff67-6533-4b6a-a119-de7c12ccb016"
);

const graphemesNow = ref(0);

const handleMeta = (event) => {
  const splitter = new GraphemeSplitter();
  const graphemes = splitter.splitGraphemes(meta.value);
  graphemesNow.value = graphemes;

  if (graphemes.length > 65) {
    meta.value = graphemes.slice(0, 65).join("");
  }
};

const fetchMetaInfo = async () => {
  await metaStore.fetchMetaData(apiUrl);
};

watchEffect(() => {
  const data = metaStore.getMetaData;
  const images = metaStore.getImages;
  if (data) {
    metaData.value = data[0];
    meta.value = metaData.value?.meta;
    selectedColor.value = metaData.value?.color;
    selectedImage.value = metaData.value?.imagen;
  }
  if (images) {
    const formattedImages = images.map((item) => ({
      imagen: item.imagen,
      imagen_estatica: item.imagen_estatica,
      categoria: item.categoria,
      active: false,
    }));

    illustrations.value = formattedImages;
  }
});

onMounted(async () => {
  const splitter = new GraphemeSplitter();
  const graphemes = splitter.splitGraphemes(meta.value);
  graphemesNow.value = graphemes;
});

const hasMeta = computed(() => meta.value !== "");

const markImage = () => {
  illustrations.value.map((item, index) => {
    if (item.imagen === selectedImage.value) {
      item.active = true;
    } else if ((index = 0 && selectedImage.value == "")) {
      item.active = true;
    } else {
      item.active = false;
    }
  });
};

const updateMeta = async () => {
  const codUser = localStorage.getItem("codUser");
  let metaItem = {
    id: codUser,
    imagen: selectedImage.value,
    meta: meta.value,
    color: "#FFA439",
  };

  await metaStore.registerMetaData(apiUrl, metaItem);
  await fetchMetaInfo();
  markImage();
};

const cleanMeta = async () => {
  meta.value = "";
  selectedColor.value = "";
  selectedImage.value = "";
  await updateMeta();
  await fetchMetaInfo();
  graphemesNow.value = "";
  markImage();
};

const changeImage = (indexItem, newImage) => {
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
    <div class="flex items-center justify-between pb-6">
      <h3 class="text-[#404040] text-[32px] font-bold font-solano uppercase">
        Mi meta
      </h3>
      <div class="hidden lg:flex lg:flex-row items-center lg:gap-[31px] gap-4">
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
          @click="updateMeta"
        />
      </div>
    </div>
    <div class="flex lg:flex-row flex-col gap-5">
      <div class="lg:min-w-[369px] lg:max-w-[369px] lg:border-r border-b border-[#D9D9D9] pr-7">
        <div class="flex items-center justify-center flex-col gap-[14px]">
          <!-- <img
            v-if="selectedImage !== ''"
            class="min-w-[255px] h-auto"
            :src="selectedImage"
            alt=""
          />
          <img
            v-if="selectedImage === ''"
            class="min-w-[255px] h-auto"
            src="https://wetalk-directus-dev-upc.stage01.link/assets/b2155346-5f91-4749-91cb-77c50355c1e0"
            alt=""
          /> -->
          <client-only>
            <Vue3Lottie
              v-if="selectedImage !== ''"
              :animationLink="selectedImage"
              :height="200"
              :width="255"
              class="min-w-[255px] h-auto"
            />
          </client-only>
          <div class="relative flex items-center flex-col justify-center">
            <div class="triangulo"></div>
            <div
              class="bg-white shadow-[0_0_20px_0_rgba(77,39,37,0.25)] px-5 py-2 w-full flex justify-between items-center rounded-lg"
            >
              <p
                v-if="meta !== ''"
                class="text-base text-center text-[#A6A6A6] min-h-[16px] min-w-[40px]"
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
          <div class="grid grid-cols-3 gap-4">
            <img
              v-for="(illustration, index) in illustrations"
              :key="index"
              class="lg:min-w-[100px] min-h-[78px] col-span-1 h-auto cursor-pointer rounded-md"
              :class="{
                'border-2 border-gray-700': illustration.active,
                'border border-gray-400': !illustration.active,
              }"
              :src="illustration.imagen_estatica"
              alt=""
              @click="() => changeImage(index, illustration.imagen)"
            />
            <!-- <client-only>
              <Vue3Lottie
                v-for="(illustration, index) in illustrations"
                :animationLink="illustration.imagen"
                :height="auto"
                :width="187"
                class="min-w-[100px] min-h-[78px] col-span-1 h-auto cursor-pointer rounded-md"
                :class="{
                  'border-2 border-gray-700': illustration.active,
                  'border border-gray-400': !illustration.active,
                }"
                @click="() => changeImage(index, illustration.imagen)"
              />
            </client-only> -->
          </div>
        </div>
        <div class="relative">
          <div class="flex items-center justify-between pb-2">
            <p class="text-[#404040] font-bold font-solano uppercase">
              Cuéntanos tu metaff
            </p>
            <p class="text-xs text-[#808080]">
              {{ graphemesNow.length > 65 ? 65 : graphemesNow.length || 0 }}/65
            </p>
          </div>
          <input
            v-model="meta"
            class="border border-[#BFBFBF] placeholder:text-[#A6A6A6] h-[38px] px-[12px] w-full rounded placeholder:text-sm text-base"
            placeholder="Cuéntanos tu meta al estudiar inglés, y alcancémosla juntos 🏁🏆"
            type="text"
            @input="handleMeta"
          />
        </div>
      </div>
    </div>
  </ContainerBoxSimple>
</template>
