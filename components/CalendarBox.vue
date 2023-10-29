<script setup>
import { useMenuStore } from "../stores/menu";

import { watchEffect } from "vue";

const calData = ref(null);

const menuStore = useMenuStore();

watchEffect(async () => {
  const calendarData = menuStore.getCalendarItems;
  if (calendarData) {
    calData.value = calendarData;
    console.log('calendar data: ',[...calData.value]);
    console.log(typeof calData.value);
    console.log(typeof calendarData);
  }
});

const paddingNo = false;
</script>
<template>
  <div class="min-w-[65%]">
    <div class="pb-[28px]">
      <BoxContainer color="blueLigth" :padding="paddingNo" >
        <Schedule :data="calData" />
      </BoxContainer>
    </div>
  </div>
</template>
