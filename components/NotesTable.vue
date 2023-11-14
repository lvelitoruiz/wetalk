<template>
  <div class="px-[9px] min-h-[100px] overflow-y-scroll">
    <table class="table-auto w-full">
      <thead class="border-b border-[#BFBFBF]">
        <tr>
          <th class="text-start font-sans font-normal text-sm text-[#404040] pb-3">
            Tipo
          </th>
          <th class="text-start font-sans font-normal text-sm text-[#404040] pb-3">
            Evaluación
          </th>
          <th class="text-start font-normal font-sans text-sm text-[#404040] pb-3">
            Peso
          </th>
          <th class="text-end font-normal font-sans text-sm text-[#404040] pb-3">
            Nota
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(data, index) in notas" :key="index" class="h-[52px]">
          <td class="text-start text-sm font-sans text-[#404040]">
            {{ data.codTipoPrueba }}
          </td>
          <td class="text-start text-sm font-sans text-[#404040]">
            {{ data.desTipoPrueba }}
          </td>
          <td class="text-start font-sans text-sm text-[#404040]">
            {{ data.pesoPonderado }}
          </td>
          <td class="text-end flex justify-end items-center h-[52px]">
            <div v-if="dashboard">
              <span
                class="font-sans w-[32px] h-[26px] text-sm font-bold rounded-[6px] flex items-center text-white justify-center"
                :class="getColorClass(data.nota)">
                {{ data.nota === "00" ? "-" : data.nota }}
              </span>
            </div>
            <div v-else>
              <span v-if="!simulator"
                class="font-sans w-[32px] h-[26px] text-sm font-bold rounded-[6px] flex items-center text-white justify-center"
                :class="getColorClass(data.nota)">
                {{ data.nota }}
              </span>
              <input v-else type="text" v-model="calculus[index].nota"
                class="w-[32px] border rounded h-[26px] text-sm font-normal font-sans flex items-center text-[404040] justify-center text-center" />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="flex items-center justify-between bg-[#DEF7F1] px-[9px] py-[10px] rounded-[10px]">
    <p class="text-[#404040] text-sm font-bold">Promedio final</p>
    <span v-if="!simulator" class="w-[32px] h-[26px] text-sm font-bold rounded-[6px] flex items-center text-white justify-center"
      :class="getColorClass(promedio[0].nota)">{{ promedio[0].nota }}</span>
    <span v-else class="w-[32px] h-[26px] text-sm font-bold rounded-[6px] flex items-center text-white justify-center"
      :class="getColorClass(newVariable)">{{ newVariable }}</span>
  </div>
</template>

<script setup>
const notas = ref(null);
const calculus = ref(null);
const promedio = ref(null);
const newVariable = ref(null);
const props = defineProps({
  notasData: Array,
  dashboard: Boolean,
  simulator: Boolean,
});

if(props.notasData !== null && props.notasData !== undefined) {
  const newvalue = JSON.parse(JSON.stringify(props.notasData?.slice(0, -2)));
}

notas.value = props.notasData.slice(0, -2);
calculus.value = [...newvalue];
promedio.value = props.notasData.slice(-2, -1);
console.log(promedio.value);

const getColorClass = (nota) => {
  if (nota === "00" || nota === null) {
    return 'bg-[#BFBFBF]';
  } else if (nota < 13) {
    return 'bg-[#E50A17]';
  } else {
    return 'bg-[#039C6D]';
  }
};

const recalculateNewVariable = () => {
  const inputs = calculus.value.map((data) => data.nota);

  // Assuming inputs are numbers, you might need to parse them if they are strings
  const weightedSum = 0.15 * inputs[0] + 0.15 * inputs[1] + 0.15 * inputs[2] + 0.15 * inputs[3] + 0.4 * inputs[4];

  console.log(weightedSum);

  // Update the new variable
  newVariable.value = weightedSum.toFixed();
};

// Watch for changes in the notas array and recalculate the new variable
watch(calculus, recalculateNewVariable, { deep: true });
</script>