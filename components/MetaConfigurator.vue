<script setup>
import { ref, watchEffect } from "vue";
import { apiKey, apiUrl } from "~/consts";
import { useMetaStore } from "../stores/meta";
import GraphemeSplitter from "grapheme-splitter";

const metaStore = useMetaStore();
const metaData = ref(null);
const illustrations = ref(null);
const meta = ref("");
const selectedColor = ref("#FE91A4");
const selectedImage = ref(
  "https://wetalk-directus-dev-upc.stage01.link/assets/b2155346-5f91-4749-91cb-77c50355c1e0"
);

const handleMeta = (event) => {
  const splitter = new GraphemeSplitter();
  const graphemes = splitter.splitGraphemes(meta.value);

  if (graphemes.length > 65) {
    meta.value = graphemes.slice(0, 65).join("");
  }
};

const fetchMetaInfo = async () => {
  await metaStore.fetchMetaData(apiUrl, apiKey, "U2020201234178");
  await metaStore.obtainImages(apiUrl);
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
      categoria: item.categoria,
      active: false,
    }));

    illustrations.value = formattedImages;
  }
});

onMounted(async () => {
  await fetchMetaInfo();
  illustrations.value.map( item => {
    if(item.imagen === selectedImage.value) {
      item.active = true;
    } else {
      item.active = false;
    }
  })
});

const hasMeta = computed(() => meta.value !== "");

const bigIcon = computed(() => `${selectedImage.value}`);

const updateMeta = async () => {
  let metaItem = {
    id: "U2020201234178",
    imagen: selectedImage.value,
    meta: meta.value,
    color: selectedColor.value,
  };

  await metaStore.registerMetaData(apiUrl, apiKey, metaItem);
  await fetchMetaInfo();
};

const cleanMeta = async () => {
  meta.value = "";
  selectedColor.value = "";
  selectedImage.value = "estudios.svg";
  await updateMeta();
  await fetchMetaInfo();
};

const changeImage = (indexItem, newImage) => {
  console.log('calling illustrations',newImage," ",indexItem);
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
      <div class="flex items-center gap-[31px]">
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
    <div class="flex gap-[20px]">
      <div
        class="min-w-[369px] max-w-[369px] border-r border-[#D9D9D9] pr-7"
      >
        <div class="flex items-center justify-center flex-col gap-[14px]">
          <img class="min-w-[255px] h-auto" :src="selectedImage" alt="" />
          <div class="relative flex items-center flex-col justify-center">
            <div class="triangulo"></div>
            <div
              class="bg-white shadow-[0_0_20px_0_rgba(77,39,37,0.25)] px-5 py-2 w-full flex justify-between items-center rounded-lg"
            >
              <p class="text-sm text-center text-[#A6A6A6] min-h-[16px] min-w-[40px]">
                {{ meta }}
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
              class="min-w-[100px] min-h-[78px] col-span-1 h-auto cursor-pointer rounded-md"
              :class="{
                'border-2 border-gray-700': illustration.active,
                'border border-gray-400': !illustration.active,
              }"
              :src="illustration.imagen"
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
            <p class="text-xs text-[#808080]">{{ meta.length || 0 }}/65</p>
          </div>
          <input
            v-model="meta"
            class="border border-[#BFBFBF] placeholder:text-[#A6A6A6] h-[38px] px-[12px] w-full rounded text-sm"
            placeholder="Ejm: Hablar bien el idioma para cuando llegue a USA."
            type="text"
            @input="handleMeta"
          />
        </div>
      </div>
    </div>
  </ContainerBoxSimple>
</template>
