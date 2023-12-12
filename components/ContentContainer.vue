<script setup>
const isOpen = false;
const haveLink = false;
const haveTabs = false;
</script>
<template>
  <Breadcrumb page="Contenido" />
  <div class="flex flex-col gap-6">
    <div class="w-full lg:w-[1023px] mx-auto">
      <div class="block lg:flex gap-[28px]">
        <SyllabusBox :open="isOpen" :link="haveLink" :tab-show="haveTabs" />
        <HelpBox />
      </div>
    </div>
  </div>
</template>
