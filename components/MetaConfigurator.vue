<script setup>
import { ref, watchEffect } from "vue";
import { apiKey, apiUrl } from "~/consts";
import { useMetaStore } from "../stores/meta";

const metaStore = useMetaStore();
const metaData = ref(null);
const meta = ref("");
const selectedColor = ref("#FE91A4");
const selectedImage = ref("icon-plane");

const fetchMetaInfo = async () => {
  await metaStore.fetchMetaData(apiUrl, apiKey, "U2020201234178"); // Provide the correct values
};

watchEffect(() => {
  const data = metaStore.getMetaData;
  if (data) {
    metaData.value = data[0];
    meta.value = metaData.value?.meta;
    selectedColor.value = metaData.value?.color;
    selectedImage.value = metaData.value?.imagen;
  }
});

onMounted(async () => {
  fetchMetaInfo();
});

const hasMeta = computed(() => meta.value !== "", console.log(meta.value));

const updateMeta = async () => {
  let metaItem = {
    id: "U2020201234178",
    imagen: selectedImage.value,
    meta: meta.value,
    color: selectedColor.value,
  };
  console.log(metaItem);
  await metaStore.registerMetaData(apiUrl, apiKey, metaItem);
  await fetchMetaInfo();
};

const cleanMeta = async () => {
  meta.value = "";
  selectedColor.value = "";
  selectedImage.value = "icon-plane";
  await updateMeta();
  await fetchMetaInfo();
};

const updateMetaText = (value) => {
  meta.value = value;
};

const changeColor = (newColor) => {
  selectedColor.value = newColor;
}

const changeImage = (newImage) => {
  selectedImage.value = newImage;
}

</script>
<template>
  <ContainerBoxSimple>
    <div class="flex items-center justify-between pb-[24px]">
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
      <div class="min-w-[340px] border-r border-[#D9D9D9] pr-[28px]">
        <div class="flex items-center justify-center flex-col gap-[14px]">
          <i class="text-[93px]" :class="selectedImage" :style="{ color: selectedColor !== '#FE91A4' ? selectedColor : '#FE91A4' }"></i>
          <div class="relative flex items-center flex-col justify-center">
            <div class="triangulo"></div>
            <div
              class="bg-white shadow-[0_0_20px_0_rgba(77,39,37,0.25)] px-5 py-2 w-full flex justify-between items-center rounded-lg"
            >
              <p class="text-sm text-[#A6A6A6] min-h-[16px] min-w-[40px]">
                {{ meta }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full flex gap-4 flex-col">
        <div>
          <div class="flex items-center justify-between pb-2">
            <p class="text-[#404040] font-bold font-solano uppercase">Meta</p>
            <p class="text-xs text-[#808080]">Máximo de caracteres : 100</p>
          </div>
          <input
            v-model="meta"
            class="border border-[#BFBFBF] placeholder:text-[#A6A6A6] h-[38px] px-[12px] w-full rounded text-sm"
            placeholder="Ejm: Hablar bien el idioma para cuando llegue a USA."
            type="text"
            @change="(event) => updateMetaText(event.target.value)"
          />
        </div>
        <div>
          <div class="flex items-center justify-between pb-2">
            <p class="text-[#404040] font-bold font-solano uppercase">Ícono</p>
          </div>
          <div class="flex gap-2">
            <i class="icon-plane text-[40px] cursor-pointer" :style="{ color: selectedColor !== '#FE91A4' ? selectedColor : '#FE91A4' }" @click="() => changeImage('icon-plane')"></i>
            <i class="icon-book text-[40px] cursor-pointer" :style="{ color: selectedColor !== '#FE91A4' ? selectedColor : '#FE91A4' }" @click="() => changeImage('icon-book')"></i>
            <i class="icon-flag text-[40px] cursor-pointer" :style="{ color: selectedColor !== '#FE91A4' ? selectedColor : '#FE91A4' }" @click="() => changeImage('icon-flag')"></i>
            <i class="icon-users text-[40px] cursor-pointer" :style="{ color: selectedColor !== '#FE91A4' ? selectedColor : '#FE91A4' }" @click="() => changeImage('icon-users')"></i>
            <i class="icon-work text-[40px] cursor-pointer" :style="{ color: selectedColor !== '#FE91A4' ? selectedColor : '#FE91A4' }" @click="() => changeImage('icon-work')"></i>
            <i
              class="icon-graduate text-[40px] cursor-pointer" :style="{ color: selectedColor !== '#FE91A4' ? selectedColor : '#FE91A4' }"
            ></i>
            <i
              class="icon-language text-[40px] cursor-pointer" :style="{ color: selectedColor !== '#FE91A4' ? selectedColor : '#FE91A4' }"
            ></i>
          </div>
        </div>
        <div>
          <div class="flex items-center justify-between pb-2">
            <p class="text-[#404040] font-bold font-solano uppercase">Color</p>
          </div>
          <div class="flex gap-2 items-center">
            <div class="cursor-pointer">
              <div class="bg-[#6644FF] rounded-full h-[25px] w-[25px]" @click="() => changeColor('#6644FF')"></div>
            </div>
            <div class="cursor-pointer">
              <div class="bg-[#3399FF] rounded-full h-[25px] w-[25px]" @click="() => changeColor('#3399FF')"></div>
            </div>
            <div class="cursor-pointer">
              <div class="bg-[#FFA439] rounded-full h-[25px] w-[25px]" @click="() => changeColor('#FFA439')"></div>
            </div>
            <div class="cursor-pointer">
              <div class="bg-[#E35169] rounded-full h-[25px] w-[25px]" @click="() => changeColor('#E35169')"></div>
            </div>
            <div class="cursor-pointer">
              <div class="bg-[#2ECDA7] rounded-full h-[25px] w-[25px]" @click="() => changeColor('#2ECDA7')"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ContainerBoxSimple>
</template>
