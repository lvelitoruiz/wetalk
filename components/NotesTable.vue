<template>
  <div class="px-[9px] min-h-[100px] overflow-y-auto">
    <table class="table-auto w-full">
      <thead class="border-b border-[#BFBFBF]">
        <tr>
          <th class="text-start font-sans font-normal text-sm text-[#404040] pb-3">
            ID
          </th>
          <th class="text-start font-publicSans font-normal text-sm text-[#404040] pb-3">
            Evaluación
          </th>
          <th class="text-start font-normal font-publicSans text-sm text-[#404040] pb-3">
            Peso
          </th>
          <th class="text-end font-normal font-publicSans text-sm text-[#404040] pb-3">
            Nota
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(data, index) in notas" :key="index" class="h-[52px]">
          <td class="text-start text-sm font-publicSans text-[#404040]">
            {{ data.codTipoPrueba }}
          </td>
          <td class="text-start text-sm font-publicSans text-[#404040]">
            {{ data.desTipoPrueba }}
          </td>
          <td class="text-start font-publicSans text-sm text-[#404040]">
            {{ data.pesoPonderado }}
          </td>
          <td class="text-end flex justify-end items-center h-[52px]">
            <div v-if="dashboard">
              <span
                class="font-publicSans w-[32px] h-[26px] text-sm font-bold rounded-[6px] flex items-center text-white justify-center"
                :class="getColorClass(data.nota)">
                {{ data.nota === "00" ? "-" : data.nota }}
              </span>
            </div>
            <div v-else>
              <span v-if="!simulator"
                class="font-publicSans w-[32px] h-[26px] text-sm font-bold rounded-[6px] flex items-center text-white justify-center"
                :class="getColorClass(data.nota)">
                {{ data.nota === "00" ? "-" : data.nota }}
              </span>
              <input v-else type="text" v-model="calculus[index].nota"
                class="w-[32px] border rounded h-[26px] text-sm font-normal font-sans flex items-center text-[404040] justify-center text-center"
                @input="validateInput(index)" />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="flex items-center justify-between bg-[#DEF7F1] px-[9px] py-[10px] rounded-[10px]">
    <p class="text-[#404040] text-sm font-bold flex">Promedio final
      <span class="inline-block w-[32px] h-[24px] relative overflow-hidden rounded-full hover:w-auto hover:overflow-visible" v-if="simulator">
        <img class="ml-2" src="@/assets/images/Ic-md-information.svg" />
        <ToolTip title="Fórmula" :text="formula" />
      </span>
    </p>
    <span v-if="!simulator"
      class="w-[32px] h-[26px] text-sm font-bold rounded-[6px] flex items-center text-white justify-center"
      :class="getColorClass(promedio[0].nota)">{{ promedio[0].nota === "00" ? "-" : promedio[0].nota }}</span>
    <span v-else class="w-[32px] h-[26px] text-sm font-bold rounded-[6px] flex items-center text-white justify-center"
      :class="getColorClass(newVariable)">{{ newVariable < 10 ? `0${newVariable}` : newVariable }}</span>
  </div>
  <div v-if="simulator" class="mt-3 px-1.5 py-0.5 bg-[#FFEA55] inline-block rounded-sm">
    <p class="flex text-sm items-center">
      <img class="mr-1 h-[18px]" src="@/assets/images/Ic-md-information.svg" />
      La nota calculada es solo una referencia del promedio final.
    </p>
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
  formula: String,
});

if (props.notasData !== null && props.notasData !== undefined) {
  const newvalue = JSON.parse(JSON.stringify(props.notasData?.slice(0, -2)));
  notas.value = props.notasData.slice(0, -2);
  calculus.value = [...newvalue];
  promedio.value = props.notasData.slice(-2, -1);
  newVariable.value = props.notasData.slice(-2, -1)[0].nota;
  console.log(promedio.value);
}

const recoverNotes = () => {
  console.log('this is supposed to work!!');
  const newvalue = JSON.parse(JSON.stringify(props.notasData?.slice(0, -2)));
  calculus.value = [...newvalue];
}

const getColorClass = (nota) => {
  if (nota === "00" || nota === null || nota === "-" ) {
    return 'bg-[#BFBFBF]';
  } else if (nota < 13) {
    return 'bg-[#E50A17]';
  } else {
    return 'bg-[#039C6D]';
  }
};

const validateInput = (index) => {
  const regex = /^\d*\.?\d*$/;

  if (!regex.test(calculus.value[index].nota)) {
    calculus.value[index].nota = '';
  }

  if (calculus.value[index].nota > 20) {
    calculus.value[index].nota = 20;
  }

  calculus.value[index].nota = calculus.value[index].nota.slice(0,2); 
};

const recalculateNewVariable = () => {
  const inputs = calculus.value.map((data) => data.nota);

  console.log('how this works: ', inputs);

  if (inputs.some(item => item === "")) {
    newVariable.value = "-"
  } else {
    const weightedSum = 0.15 * inputs[0] + 0.15 * inputs[1] + 0.15 * inputs[2] + 0.15 * inputs[3] + 0.4 * inputs[4];
    newVariable.value = weightedSum.toFixed();
  }


};

watch(calculus, recalculateNewVariable, { deep: true });

defineExpose({
  recoverNotes,
})

</script>