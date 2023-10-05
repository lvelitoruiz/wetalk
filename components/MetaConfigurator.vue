<script setup></script>
<template>
  <ContainerBoxSimple>
    <div class="flex items-center justify-between pb-[24px]">
      <h3 class="text-[#404040] text-[32px] font-bold font-solano uppercase">Mi meta</h3>
      <div class="flex items-center gap-[31px]">
        <Button label="Eliminar meta" secundary disabled />
        <Button label="Guardar cambios" primary disabled />
      </div>
    </div>
    <div class="flex gap-[20px]">
      <div class="min-w-[340px] border-r border-[#D9D9D9] pr-[28px]">
        <div class="flex items-center justify-center flex-col gap-[14px]">
          <i class="icon-plane text-[93px] text-[#FE91A4]"></i>
          <div class="relative flex items-center flex-col justify-center">
            <div class="triangulo"></div>
            <div
              class="bg-white shadow-[0_0_20px_0_rgba(77,39,37,0.25)] px-5 py-2 w-full flex justify-between items-center rounded-lg"
            >
              <p class="text-sm text-[#A6A6A6]">
                “Escribe aquí esa meta que te motiva estudiar inglés y
                alcancémosla juntos ✈ 💼 🎉 ”.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full flex gap-4 flex-col">
        <div>
          <div class="flex items-center justify-between pb-2">
            <p class="text-[#404040] font-bold font-solano uppercase">Meta</p>
            <p class="text-xs text-[#808080]">Máximo de caracteres : 100</p>
          </div>
          <input
            class="border border-[#BFBFBF] placeholder:text-[#A6A6A6] h-[38px] px-[12px] w-full rounded text-sm"
            placeholder="Ejm: Hablar bien el idioma para cuando llegue a USA."
            type="text"
          />
        </div>
        <div>
          <div class="flex items-center justify-between pb-2">
            <p class="text-[#404040] font-bold font-solano uppercase">Ícono</p>
          </div>
          <div class="flex gap-2">
            <i class="icon-plane text-[#FE91A4] text-[40px] cursor-pointer"></i>
            <i class="icon-book text-[#FE91A4] text-[40px] cursor-pointer"></i>
            <i class="icon-flag text-[#FE91A4] text-[40px] cursor-pointer"></i>
            <i class="icon-users text-[#FE91A4] text-[40px] cursor-pointer"></i>
            <i class="icon-work text-[#FE91A4] text-[40px] cursor-pointer"></i>
            <i
              class="icon-graduate text-[#FE91A4] text-[40px] cursor-pointer"
            ></i>
            <i
              class="icon-language text-[#FE91A4] text-[40px] cursor-pointer"
            ></i>
          </div>
        </div>
        <div>
          <div class="flex items-center justify-between pb-2">
            <p class="text-[#404040] font-bold font-solano uppercase">Color</p>
          </div>
          <div class="flex gap-2 items-center">
            <div class="cursor-pointer">
              <div class="bg-[#E50A17] rounded-full h-[25px] w-[25px]"></div>
            </div>
            <div class="cursor-pointer">
              <div class="bg-[#404040] rounded-full h-[25px] w-[25px]"></div>
            </div>
            <div class="cursor-pointer">
              <div class="bg-[#026849] rounded-full h-[25px] w-[25px]"></div>
            </div>
            <div class="cursor-pointer">
              <div class="bg-[#0065FF] rounded-full h-[25px] w-[25px]"></div>
            </div>
            <div class="cursor-pointer">
              <div class="bg-[#AA9500] rounded-full h-[25px] w-[25px]"></div>
            </div>
            <div
              class="cursor-pointer border border-[#FE91A4] rounded-full p-[2px]"
            >
              <div class="bg-[#FE91A4] rounded-full h-[25px] w-[25px]"></div>
            </div>
            <div class="cursor-pointer">
              <div class="bg-[#699A8F] rounded-full h-[25px] w-[25px]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ContainerBoxSimple>
</template>
