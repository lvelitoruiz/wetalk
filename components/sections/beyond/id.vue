<template>
  <Breadcrumb page="Beyond WeTALK" />

  <div class="block lg:flex lg:flex-col gap-6">
    <div class="w-full lg:w-[1023px] mx-auto">
      <div class="block lg:flex gap-[28px]">
        <div class="min-w-[100%] lg:min-w-[65%]">
          <SectionsBeyondContentId :data="newsIdData" />
        </div>
        <div class="flex-col flex gap-7">
          <TeacherBox />
          <HelpBox />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { apiUrl } from "~/consts";

  const menuStore = useMenuStore();
  const newsIdData = ref(null);

  const props = defineProps({
    id: Number
  })

  const fetchData = async (id) => {
    await menuStore
      .fetchNewsDataId(apiUrl, id)
  }

  watchEffect(async () => {
    const news = menuStore.getNewsId
    if (news) {    
      newsIdData.value = news;
    }
  });

  onMounted( () => {
    fetchData(props.id);
  });

</script>