<template>
  <div class="relative pb-4 lg:pb-0">
    <div class="w-[114px] h-[114px] rounded-full overflow-hidden border border-gray-200">
      <img class="min-w-[114px] h-[114px] object-cover" :src="photo" alt="" />
    </div>
    <!-- <div
      class="w-[35px] h-[35px] rounded-full bg-[#E50A17] flex items-center justify-center text-white cursor-pointer absolute bottom-0 right-0">
      <i class="icon-edit"></i>
    </div> -->
  </div>
</template>

<script setup>

const props = defineProps({
  photo: String,
})

</script>
