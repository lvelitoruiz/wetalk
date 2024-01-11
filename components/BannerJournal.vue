<template>
  <div class="bg-[#025] flex px-[34px] py-2 justify-between items-center">
    <div class="flex items-center">
      <div class="flex justify-center items-center h-[56px] w-[56px] mr-2">
        <img src="@/assets/images/vector.svg" alt="" />
      </div>
      <span class="text-lg font-solano font-bold text-white mr-2">
        My Journal:
      </span>
      <p class="font-publicSans text-sm text-white">
        Completa tu journal del <span class="font-bold">12 al 14 de enero</span>
      </p>
    </div>
    <div class="text-white ">
      <router-link to="/calificacion" class="flex items-center">
        <span
          class="font-bold font-zizou-bold text-sm mr-2 tracking-widest"
          >Ver más</span
        >
        <i class="icon-arrow-right"></i>
      </router-link>
    </div>
  </div>
</template>

<script setup>
</script>
