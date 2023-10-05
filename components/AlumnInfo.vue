<script setup></script>
<template>
  <ContainerBoxSimple>
    <div class="flex items-center justify-between pb-[18px]">
      <h3 class="text-[#404040] text-[32px] font-solano font-bold uppercase">
        Mis Datos
      </h3>
      <Button label="Cambiar contraseña" primary />
    </div>
    <div class="flex items-end gap-[38px]">
      <div class="relative">
        <img
          class="min-w-[114px] h-[114px]"
          src="@/assets/images/user.png"
          alt=""
        />
        <div
          class="w-[35px] h-[35px] rounded-full bg-[#E50A17] flex items-center justify-center text-white cursor-pointer absolute bottom-0 right-0"
        >
          <i class="icon-edit"></i>
        </div>
      </div>
      <div class="w-full flex flex-col justify-start items-start">
        <div class="pb-[10px]">
          <p class="text-[20px] font-bold text-[#404040] font-solano uppercase">
            Giannina Roca
          </p>
          <div
            class="bg-[#699A8F] px-2 py-[3px] flex items-center gap-1 rounded cursor-pointer"
          >
            <span class="text-white font-bold text-xs leaning-none"
              >Cód: U202019587</span
            >
            <i class="text-white text-xs icon-file-copy"></i>
          </div>
        </div>
        <div class="flex items-start justify-between w-full">
          <div>
            <p class="text-sm font-bold text-[#404040]">Institución</p>
            <p class="text-sm text-[#404040]">UPC</p>
          </div>
          <div>
            <p class="text-sm font-bold text-[#404040]">Nivel</p>
            <p class="text-sm text-[#404040]">Inglés 1</p>
          </div>
          <div>
            <p class="text-sm font-bold text-[#404040]">Modalidad</p>
            <p class="text-sm text-[#404040]">Regular</p>
          </div>
          <div>
            <p class="text-sm font-bold text-[#404040]">Carrera</p>
            <p class="text-sm text-[#404040]">Ing. de sistemas</p>
          </div>
          <div>
            <p class="text-sm font-bold text-[#404040]">Correo</p>
            <p class="text-sm text-[#404040]">groca@upc.edu.pe</p>
          </div>
          <div>
            <p class="text-sm font-bold text-[#404040]">DNI</p>
            <p class="text-sm text-[#404040]">24520158</p>
          </div>
        </div>
      </div>
    </div>
  </ContainerBoxSimple>
</template>
