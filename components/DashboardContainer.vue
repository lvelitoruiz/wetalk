<script setup>
import { useMetaStore } from "../stores/meta";
const selectedImage = ref(
  "https://wetalk-directus-dev-upc.stage01.link/assets/b2155346-5f91-4749-91cb-77c50355c1e0"
);
const metaText = ref("");

const metaStore = useMetaStore();

watchEffect(() => {
  const data = metaStore.getMetaData;
  if (data) {
    selectedImage.value = data[0].imagen;
    metaText.value = data[0].meta;
  }
});

const isOpen = true;
const haveLink = true;

</script>
<template>
  <div class="flex items-center w-[1023px] mx-auto pb-[18px] gap-[6px]">
    <a class="text-[#575759] text-[15px] underline" href="">Inicio</a>
    <span class="text-[#575759] text-[15px]">></span>
    <span class="text-[#575759] text-[15px]">Dashboard</span>
  </div>
  <div class="flex flex-col gap-6">
    <div class="flex items-center w-[1023px] mx-auto gap-5 pb-[28px]">
      <div>
        <h1
          class="text-[#191919] text-[32px] font-bold font-solano uppercase whitespace-nowrap"
        >
          Welcome, Gianinna Roca
        </h1>
        <p class="text-[#191919] text-[18px] whitespace-nowrap">
          Inglés 1 | Lun y Mar 19:00h - 22:00h
        </p>
      </div>

      <div
        class="bg-white shadow-[0_0_20px_0_rgba(77,39,37,0.25)] h-[71px] px-5 py-2 w-full flex items-center rounded-lg triangle relative"
      >
        <div class="w-[70px]">
          <!-- <img
            v-if="selectedImage !== ''"
            class="w-auto h-[55px]"
            :src="selectedImage"
            alt=""
          />
          <img
            v-if="selectedImage === ''"
            class="w-auto h-[55px]"
            src="https://wetalk-directus-dev-upc.stage01.link/assets/b2155346-5f91-4749-91cb-77c50355c1e0"
            alt=""
          /> -->
          <client-only>
              <Vue3Lottie
                v-if="selectedImage !== ''"
                :animationLink="selectedImage"
                :height="55"
                :width="auto"
                class="min-h-[55px] w-auto"
              />
            </client-only>
        </div>
        <div class="w-[calc(100%-100px)] px-3">
          <p class="text-[#404040] text-sm font-bold">Meta:</p>
          <p v-if="metaText !== ''" class="text-sm text-[#404040] font-light">
            {{ metaText }}
          </p>
          <p v-if="metaText === ''" class="text-sm text-[#A6A6A6] font-light">
            Cuéntanos tu meta al estudiar inglés, y alcancémosla juntos 🏁🏆
          </p>
        </div>
        <router-link to="/meta" class="inline-block w-[30px]">
          <i class="icon-edit text-xl text-[#595959]"></i>
        </router-link>
      </div>
    </div>
    <!-- <div class="flex items-center justify-between gap-[28px] pb-[28px]">
      <div class="min-w-[35%]">
        <BoxContainer size="550" color="green">
          <div class="flex items-center justify-between pb-[18px] px-[9px]">
            <h3 class="text-[#404040] text-2xl font-bold uppercase">Notas</h3>
            <a class="flex items-center gap-2" href="">
              <span class="text-[#E50A17] font-bold text-sm">Ver más</span>
              <i class="icon-arrow-right text-[#E50A17]"></i>
            </a>
          </div>
          <div class="px-[9px] h-[410px] overflow-y-auto">
            <table class="table-auto w-full">
              <thead class="border-b border-[#BFBFBF]">
                <tr>
                  <th class="text-start text-sm text-[#404040] pb-3">Tipo</th>
                  <th class="text-start text-sm text-[#404040] pb-3">
                    Evaluación
                  </th>
                  <th class="text-start text-sm text-[#404040] pb-3">Peso</th>
                  <th class="text-end text-sm text-[#404040] pb-3">Nota</th>
                </tr>
              </thead>
              <tbody>
                <tr class="h-[52px]">
                  <td class="text-start text-sm text-[#404040]">PA1</td>
                  <td class="text-start text-sm text-[#404040]">
                    Prod. oral - sesión sinc.
                  </td>
                  <td class="text-start text-sm text-[#404040]">20%</td>
                  <td class="text-end flex justify-end items-center h-[52px]">
                    <span
                      class="bg-[#039C6D] w-[32px] h-[26px] text-sm font-bold rounded-[6px] flex items-center text-white justify-center"
                      >20</span
                    >
                  </td>
                </tr>
                <tr class="h-[52px]">
                  <td class="text-start text-sm text-[#404040]">PA1</td>
                  <td class="text-start text-sm text-[#404040]">
                    Prod. oral - sesión sinc.
                  </td>
                  <td class="text-start text-sm text-[#404040]">20%</td>
                  <td class="text-end flex justify-end items-center h-[52px]">
                    <span
                      class="bg-[#039C6D] w-[32px] h-[26px] text-sm font-bold rounded-[6px] flex items-center text-white justify-center"
                      >13</span
                    >
                  </td>
                </tr>
                <tr class="h-[52px]">
                  <td class="text-start text-sm text-[#404040]">PA1</td>
                  <td class="text-start text-sm text-[#404040]">
                    Prod. oral - sesión sinc.
                  </td>
                  <td class="text-start text-sm text-[#404040]">20%</td>
                  <td class="text-end flex justify-end items-center h-[52px]">
                    <span
                      class="bg-[#039C6D] w-[32px] h-[26px] text-sm font-bold rounded-[6px] flex items-center text-white justify-center"
                      >18</span
                    >
                  </td>
                </tr>
                <tr class="h-[52px]">
                  <td class="text-start text-sm text-[#404040]">PA1</td>
                  <td class="text-start text-sm text-[#404040]">
                    Prod. oral - sesión sinc.
                  </td>
                  <td class="text-start text-sm text-[#404040]">20%</td>
                  <td class="text-end flex justify-end items-center h-[52px]">
                    <span
                      class="bg-[#E50A17] w-[32px] h-[26px] text-sm font-bold rounded-[6px] flex items-center text-white justify-center"
                      >20</span
                    >
                  </td>
                </tr>
                <tr class="h-[52px]">
                  <td class="text-start text-sm text-[#404040]">PA1</td>
                  <td class="text-start text-sm text-[#404040]">
                    Prod. oral - sesión sinc.
                  </td>
                  <td class="text-start text-sm text-[#404040]">20%</td>
                  <td class="text-end flex justify-end items-center h-[52px]">
                    <span
                      class="bg-[#BFBFBF] w-[32px] h-[26px] text-sm font-bold rounded-[6px] flex items-center text-white justify-center"
                      >-</span
                    >
                  </td>
                </tr>
                <tr class="h-[52px]">
                  <td class="text-start text-sm text-[#404040]">PA1</td>
                  <td class="text-start text-sm text-[#404040]">
                    Prod. oral - sesión sinc.
                  </td>
                  <td class="text-start text-sm text-[#404040]">20%</td>
                  <td class="text-end flex justify-end items-center h-[52px]">
                    <span
                      class="bg-[#BFBFBF] w-[32px] h-[26px] text-sm font-bold rounded-[6px] flex items-center text-white justify-center"
                      >-</span
                    >
                  </td>
                </tr>
                <tr class="h-[52px]">
                  <td class="text-start text-sm text-[#404040]">PA1</td>
                  <td class="text-start text-sm text-[#404040]">
                    Prod. oral - sesión sinc.
                  </td>
                  <td class="text-start text-sm text-[#404040]">20%</td>
                  <td class="text-end flex justify-end items-center h-[52px]">
                    <span
                      class="bg-[#BFBFBF] w-[32px] h-[26px] text-sm font-bold rounded-[6px] flex items-center text-white justify-center"
                      >-</span
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div
            class="flex items-center justify-between bg-[#DEF7F1] px-[9px] py-[10px] rounded-[10px]"
          >
            <p class="text-[#404040] text-sm font-bold">Promedio final</p>
            <span
              class="bg-[#BFBFBF] w-[32px] h-[26px] text-sm font-bold rounded-[6px] flex items-center text-white justify-center"
              >-</span
            >
          </div>
        </BoxContainer>
      </div>
      <div class="flex flex-col gap-[28px] w-full min-w-[30%]">
        <BoxContainer color="yellow">
          <div class="flex items-center justify-between pb-[18px]">
            <h3 class="text-[#404040] text-2xl font-bold uppercase">
              Profesor
            </h3>
          </div>
          <div class="flex items-center gap-3">
            <i class="icon-user text-[33px] text-[#404040]"></i>
            <div class="w-full">
              <p class="text-[#404040] font-bold">Caterina Sumina Molina</p>
              <div class="flex items-center justify-between cursor-pointer">
                <span class="text-sm text-[#404040]">csumina@wetalk.com</span>
                <i class="icon-file-copy text-xl text-[#699A8F]"></i>
              </div>
            </div>
          </div>
        </BoxContainer>
        <BoxContainer color="cyan">
          <div class="flex items-center justify-between pb-[18px]">
            <h3 class="text-[#404040] text-2xl font-bold uppercase">
              Estudiantes
            </h3>
            <a class="flex items-center gap-2" href="">
              <span class="text-[#E50A17] font-bold text-sm">Ver más</span>
              <i class="icon-arrow-right text-[#E50A17]"></i>
            </a>
          </div>
          <div class="h-[282px] overflow-y-scroll pr-3">
            <div class="flex items-center justify-between pb-2">
              <div>
                <p class="text-[#404040] font-bold">Enrique Rojas Molina</p>
                <p class="text-[#808080] text-sm">Inglés 1</p>
              </div>
              <a href="">
                <i class="icon-file-copy text-xl text-[#699A8F]"></i>
              </a>
            </div>
            <div class="flex items-center justify-between pb-2">
              <div>
                <p class="text-[#404040] font-bold">Enrique Rojas Molina</p>
                <p class="text-[#808080] text-sm">Inglés 1</p>
              </div>
              <a href="">
                <i class="icon-file-copy text-xl text-[#699A8F]"></i>
              </a>
            </div>
            <div class="flex items-center justify-between pb-2">
              <div>
                <p class="text-[#404040] font-bold">Enrique Rojas Molina</p>
                <p class="text-[#808080] text-sm">Inglés 1</p>
              </div>
              <a href="">
                <i class="icon-file-copy text-xl text-[#699A8F]"></i>
              </a>
            </div>
            <div class="flex items-center justify-between pb-2">
              <div>
                <p class="text-[#404040] font-bold">Enrique Rojas Molina</p>
                <p class="text-[#808080] text-sm">Inglés 1</p>
              </div>
              <a href="">
                <i class="icon-file-copy text-xl text-[#699A8F]"></i>
              </a>
            </div>
            <div class="flex items-center justify-between pb-2">
              <div>
                <p class="text-[#404040] font-bold">Enrique Rojas Molina</p>
                <p class="text-[#808080] text-sm">Inglés 1</p>
              </div>
              <a href="">
                <i class="icon-file-copy text-xl text-[#699A8F]"></i>
              </a>
            </div>
            <div class="flex items-center justify-between pb-2">
              <div>
                <p class="text-[#404040] font-bold">Enrique Rojas Molina</p>
                <p class="text-[#808080] text-sm">Inglés 1</p>
              </div>
              <a href="">
                <i class="icon-file-copy text-xl text-[#699A8F]"></i>
              </a>
            </div>
          </div>
        </BoxContainer>
      </div>
      <div class="flex flex-col gap-[28px] w-full min-w-[30%]">
        <BoxContainer color="blueLigth">
          <div class="flex items-center justify-between pb-[18px]">
            <h3 class="text-[#404040] text-2xl font-bold uppercase">
              Calendario
            </h3>
            <a class="flex items-center gap-2" href="">
              <span class="text-[#E50A17] font-bold text-sm">Ver más</span>
              <i class="icon-arrow-right text-[#E50A17]"></i>
            </a>
          </div>
          <div class="flex items-center flex-col gap-2">
            <div
              class="flex items-center px-4 py-2 w-full cursor-pointer group bg-[#E6F0FF] rounded"
            >
              <div
                class="pr-2 mr-2 border-r border-[#5598FF] group-hover:border-[#5598FF] w-[50px]"
              >
                <p
                  class="text-[#0043AA] group-hover:text-[#0043AA] text-sm font-bold"
                >
                  Mar
                </p>
                <p
                  class="text-[#0043AA] group-hover:text-[#0043AA] text-sm font-bold"
                >
                  10/10
                </p>
              </div>
              <div class="flex flex-col">
                <p
                  class="uppercase text-[#0043AA] group-hover:text-[#0043AA] text-lg font-bold leading-none"
                >
                  Básico 1
                </p>
                <p
                  class="text-[#0043AA] text-sm group-hover:text-[#0043AA] leading-none"
                >
                  10:00 - 13:00
                </p>
              </div>
            </div>
            <div
              class="flex items-center px-4 py-2 w-full cursor-pointer group hover:bg-[#E6F0FF] rounded"
            >
              <div
                class="pr-2 mr-2 border-r border-[#039C6D] group-hover:border-[#5598FF] w-[50px]"
              >
                <p
                  class="text-[#013424] group-hover:text-[#0043AA] text-sm font-bold"
                >
                  Mar
                </p>
                <p
                  class="text-[#013424] group-hover:text-[#0043AA] text-sm font-bold"
                >
                  10/10
                </p>
              </div>
              <div class="flex flex-col">
                <p
                  class="uppercase text-[#013424] group-hover:text-[#0043AA] text-lg font-bold leading-none"
                >
                  Básico 1
                </p>
                <p
                  class="text-[#026849] text-sm group-hover:text-[#0043AA] leading-none"
                >
                  10:00 - 13:00
                </p>
              </div>
            </div>
            <div
              class="flex items-center px-4 py-2 w-full cursor-pointer group hover:bg-[#E6F0FF] rounded"
            >
              <div
                class="pr-2 mr-2 border-r border-[#039C6D] group-hover:border-[#5598FF] w-[50px]"
              >
                <p
                  class="text-[#013424] group-hover:text-[#0043AA] text-sm font-bold"
                >
                  Mar
                </p>
                <p
                  class="text-[#013424] group-hover:text-[#0043AA] text-sm font-bold"
                >
                  10/10
                </p>
              </div>
              <div class="flex flex-col">
                <p
                  class="uppercase text-[#013424] group-hover:text-[#0043AA] text-lg font-bold leading-none"
                >
                  Básico 1
                </p>
                <p
                  class="text-[#026849] text-sm group-hover:text-[#0043AA] leading-none"
                >
                  10:00 - 13:00
                </p>
              </div>
            </div>
          </div>
        </BoxContainer>
        <BoxContainer color="red">
          <div class="flex items-center justify-between pb-[18px]">
            <h3 class="text-[#404040] text-2xl font-bold uppercase">
              Mis pagos
            </h3>
            <a class="flex items-center gap-2" href="">
              <span class="text-[#E50A17] font-bold text-sm">Ver más</span>
              <i class="icon-arrow-right text-[#E50A17]"></i>
            </a>
          </div>
          <div class="flex items-center justify-center flex-col gap-1">
            <p class="text-[#404040]">Pago pendiente</p>
            <p class="text-[#E50A17] text-lg font-bold">S/ 233.00</p>
            <p class="text-[#595959]">Vence: 30/9/23</p>
            <button
              class="bg-[#E50A17] h-[44px] w-[132px] text-white font-bold mt-2 relative before:content-[''] before:w-full before:h-full before:absolute before:border before:border-[#E50A17] before:left-[5px] before:top-[5px]"
            >
              <span>Pagar</span>
            </button>
          </div>
        </BoxContainer>
      </div>
    </div> -->
    <div class="w-[1023px] mx-auto">
      <div class="flex gap-[28px]">
        <SyllabusBox :open="isOpen" :link="haveLink" />
        <HelpBox />
      </div>
    </div>
  </div>
</template>
