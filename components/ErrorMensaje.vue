<script setup>

const props = defineProps({
    message : String,
})

</script>
<template>
  <div class="grid col-span-1 justify-items-center gap-2">
    <img src="@/assets/images/upc-icon-exclamation-circle.svg" />
    <div class="text-center">
      <p class="text-sm font-bold font-publicSans mb-1">Lo sentimos, no pudimos cargar {{ message }} </p>
      <p class="text-sm font-publicSans">Inténtalo de nuevo más tarde</p>
    </div>
  </div>
</template>

