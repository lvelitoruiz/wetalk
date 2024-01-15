<script setup>
const props = defineProps({
  dataPost: Object,
});

const dataList = props.dataPost.sort((a, b) => a.destacado - b.destacado).slice(0, 6);


</script>
<template>
    <GenericCarouselSlider :dataList="dataList">
        <template v-slot="slotProps">
            <ScheduleCardBeyond :item="slotProps.item"/>
        </template>
    </GenericCarouselSlider>
</template>
