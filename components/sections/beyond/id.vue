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
  import { useMenuStore } from '../../../stores/menu';
  import { apiUrl } from "~/consts";
  import { useRouter } from 'vue-router';

  const menuStore = useMenuStore();
  const newsIdData = ref(null);
  const router = useRouter();
  const id = router.currentRoute.value.params.id;

  const props = defineProps({
    id: Number,
    default: () => this.$route.params.id
  })

  const fetchData = async (id) => {
    await menuStore
      .fetchNewsDataId(apiUrl, id)
  }

  onMounted(() => {
    fetchData(id);
  });

  watchEffect(() => {
    const news = menuStore.getNewsId;
    if (news) {    
      newsIdData.value = news;
    }
  });
</script>