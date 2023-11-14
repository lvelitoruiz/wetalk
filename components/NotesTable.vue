<template>
  <div class="px-[9px] h-[410px] overflow-y-scroll">
    <table class="table-auto w-full">
      <thead class="border-b border-[#BFBFBF]">
        <tr>
          <th
            class="text-start font-sans font-normal text-sm text-[#404040] pb-3"
          >
            Tipo
          </th>
          <th
            class="text-start font-sans font-normal text-sm text-[#404040] pb-3"
          >
            Evaluación
          </th>
          <th
            class="text-start font-normal font-sans text-sm text-[#404040] pb-3"
          >
            Peso
          </th>
          <th
            class="text-end font-normal font-sans text-sm text-[#404040] pb-3"
          >
            Nota
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(data, index) in notasData" :key="index" class="h-[52px]">
          <td class="text-start text-sm font-sans text-[#404040]">
            {{ data.tipo }}
          </td>
          <td class="text-start text-sm font-sans text-[#404040]">
            {{ data.evaluacion }}
          </td>
          <td class="text-start font-sans text-sm text-[#404040]">
            {{ data.peso }}
          </td>
          <td class="text-end flex justify-end items-center h-[52px]">
            <div v-if="dashboard">
              <span
                class="font-sans w-[32px] h-[26px] text-sm font-bold rounded-[6px] flex items-center text-white justify-center"
                :class="getColorClass(data.nota)"
              >
                {{ data.nota }}
              </span>
            </div>
            <div v-else>
              <span
                v-if="promedio"
                class="font-sans w-[32px] h-[26px] text-sm font-bold rounded-[6px] flex items-center text-white justify-center"
                :class="getColorClass(data.nota)"
              >
                {{ data.nota }}
              </span>
              <input
                v-else
                type="text"
                v-model="data.nota"
                class="w-[32px] border rounded h-[26px] text-sm font-normal font-sans flex items-center text-[404040] justify-center text-center"
              />
            </div>
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
</template>

<script setup>
const props = defineProps({
  notasData: Array,
  dashboard: Boolean,
});

const getColorClass = (nota) => {
  if (nota === "-" || nota === null) {
    return "bg-[#BFBFBF]";
  } else if (nota < 13) {
    return "bg-[#E50A17]";
  } else {
    return "bg-[#039C6D]";
  }
};
</script>