<script setup>
import { useDateFormat } from '@vueuse/core';
import { apiUrl } from '~/consts';
const menuStore = useMenuStore();
const codAlum = (await menuStore.fetchData())?.localCodUser;
const states = scheduleState();
definePageMeta({
  middleware: 'auth',
});

useHead({
  title: 'Mi horario',
});

const weekDate = getWeekDates();
const startDate = `${
  useDateFormat(weekDate.Monday, 'YYYY-MM-DD').value
}T00:00:00Z`;
const endDate = `${
  useDateFormat(weekDate.Sunday, 'YYYY-MM-DD').value
}T23:59:00Z`;

const errorService = ref(null);
const response = ref({});

onMounted(() => {
  menuStore.fetchCalendarData(
	  apiUrl,
  );
});

watchEffect(() => {
  response.value = menuStore.getCalendarItems;
  if (response?.value.flag && response.value.data.length) {
    states.setWeekCourses(response.value.data);
    states.setFilter(response.value.data);
    states.setDataStatus(true);
  } else if (response?.error) {
    errorService.value = response?.error;
  }
});
</script>

<template>
  <Breadcrumb page="Horario" />

  <div class="block lg:flex lg:flex-col gap-6">
    <div class="w-full lg:w-[1023px] mx-auto">
      <div class="block lg:flex gap-[28px]">
        <div class="min-w-[100%] lg:min-w-[65%]">
          <Schedules :pending="pending" :error-service="errorService" :error="error" />
        </div>
        <div class="flex-col flex gap-7">
          <HelpBox />
        </div>
      </div>
    </div>
  </div>
</template>
