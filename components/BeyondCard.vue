<!-- eslint-disable vue/require-default-prop -->
<script setup>
import { defineProps, ref, watchEffect } from 'vue';

const dataCard = ref(null);
const props = defineProps({
  dataPost: Object,
});

watchEffect(() => {
  if (props.dataPost) {
    const dataList = [...props.dataPost]
      .filter((item) => item.destacado !== null)
      .sort((a, b) => a.destacado - b.destacado)
      .slice(0, 5);

    dataCard.value = dataList;
  }
});
</script>
<template>
  <GenericCarouselSlider :data-list="dataCard">
    <template #default="slotProps">
      <ScheduleCardBeyond :item="slotProps.item" />
    </template>
  </GenericCarouselSlider>
</template>
