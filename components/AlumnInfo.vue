<script setup>
</script>
<template>
  <ContainerBoxSimple>
    <div class="flex items-center justify-between pb-6">
      <h3 class="text-[#404040] text-[32px] font-solano font-bold uppercase">
        Mis Datos
      </h3>
      <Button label="Cambiar contraseña" primary />
    </div>
    <div class="flex items-start gap-[38px]">
      <UserImage />
      <div class="w-full flex flex-col justify-start items-start">
        <UserInfo />
      </div>
    </div>
  </ContainerBoxSimple>
</template>
