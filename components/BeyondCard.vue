<!-- eslint-disable vue/require-default-prop -->
<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  dataPost: Object,
});

const dataList = [...props.dataPost].filter(item => item.destacado !== null).sort((a, b) => a.destacado - b.destacado).slice(0, 5);

</script>
<template>
  <GenericCarouselSlider :data-list="dataList">
    <template #default="slotProps">
      <ScheduleCardBeyond :item="slotProps.item" />
    </template>
  </GenericCarouselSlider>
</template>
