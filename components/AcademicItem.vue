<template>
  <div>
    <p class="text-sm font-sans font-bold text-[#404040]">{{ label }}</p>
    <div class="flex items-center gap-2">
      <p class="text-sm text-[#404040]">{{ value }}</p>
      <a v-if="showIcon" href=""><i class="icon-file-copy text-[#699A8F]"></i></a>
    </div>
  </div>
</template>

<script setup lang="ts">

const props = defineProps({
  label: String,
  value: String,
  showIcon : {
    type: Boolean,
    default: false
  }
});

</script>

<style>
</style>