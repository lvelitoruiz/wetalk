<template>
  <div>
    <div class="pb-7">
      <BoxContainer color="green">
        <div class="flex items-center justify-between pb-3 px-[9px]">
          <h3 v-if="!showSimulator" class="text-[#404040] text-2xl">
            <span class="uppercase font-bold font-solano">Notas</span>
            <p v-if="!dashboard" class="text-[14px] font-publicSans">Nota mínima aprobatoria: 12.5</p>
          </h3>
          <h3 v-else class="text-[#404040] text-2xl">
            <span class="uppercase font-bold font-solano">Simulador de promedio</span>
            <p v-if="!dashboard" class="text-[14px] font-publicSans">Nota mínima aprobatoria: 12.5</p>
          </h3>
          <router-link v-if="dashboard" class="flex items-center gap-2" to="/notas">
            <span class="text-[#E50A17] font-bold font-zizou-bold text-sm">Ver más</span>
            <i class="icon-arrow-right text-[#E50A17]"></i>
          </router-link>
          <div v-else  class="hidden lg:block">
            <div v-if="!showSimulator">
              <Button @click="irSimulador" label="Simulador de promedio" primary />
            </div>
            <div v-else class="flex gap-4">
              <Button @click="irSimulador" label="Cancelar" secundary />
              <Button @click="reestablishNotes" label="Reestablecer notas" primary />
            </div>
          </div>
        </div>
        <div class="flex items-center justify-start mb-3">
          <div v-if="dashboard">
            <div v-if="inasistencia !== null"
              class="border border-[#404040] px-4 gap-1 flex items-center justify-start h-[28px] rounded-full">
              <p class="text-[#404040] font-publicSans text-sm">Inasistencias:</p>
              <p class="text-[#404040] font-publicSans text-sm">{{ inasistencia || 0 }}</p>
            </div>
          </div>
        </div>
        <NotesTable v-if="notasData !== undefined" :notasData="notasData" :dashboard="dashboard" :formula="formula" :simulator="showSimulator" ref="tableNotes" />
        <div class="lg:hidden mt-6 flex justify-center">
          <div v-if="!showSimulator">
            <Button @click="irSimulador" label="Simulador de promedio" primary />
          </div>
          <div v-else class="flex gap-4">
            <Button @click="irSimulador" label="Cancelar" secundary />
            <Button @click="reestablishNotes" label="Reestablecer notas" primary />
          </div>
        </div>
      </BoxContainer>
    </div>
  </div>
</template>

<script setup >
import { useMenuStore } from "../stores/menu";
import { apiUrl } from "~/consts";


const notasData = ref(null);
const inasistencia = ref(null);

const formula = ref(null);

const tableNotes = ref(null);

const showSimulator = ref(false);

const menuStore = useMenuStore();

const props = defineProps({
  dashboard: Boolean
})


const reestablishNotes = () => {
  tableNotes.value.recoverNotes();
};

const fetchData = async () => {
  await menuStore
    .fetchNotasData(apiUrl)
  await menuStore
    .fetchFaltasData(apiUrl)
}

watchEffect(async () => {
  const notas = menuStore.getNotasItems;
  if (notas) {
    notasData.value = notas.notas;
    console.log('passing formula: ',notas.dscFormula);
    formula.value = notas.dscFormula;
  }

  const faltaData = menuStore.getfaltasItems;
  if (faltaData) {
    inasistencia.value = faltaData.cantidad;
  }
});

const irSimulador = () => {
  showSimulator.value = !showSimulator.value;
}

onMounted( () => {
  fetchData();
});


</script>
