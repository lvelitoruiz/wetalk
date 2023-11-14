<template>
  <div>
    <div class="pb-7">
      <BoxContainer color="green">
        <div class="flex items-center justify-between pb-3 px-[9px]">
          <h3 class="text-[#404040] text-2xl font-bold font-solano uppercase">
            Notas
          </h3>
          <router-link v-if="dashboard" class="flex items-center gap-2" to="/notas">
            <span class="text-[#E50A17] font-bold font-zizou-bold text-sm">Ver más</span>
            <i class="icon-arrow-right text-[#E50A17]"></i>
          </router-link>
          <div v-else>
            <div v-if="!showSimulator">
              <Button @click="irSimulador" label="Simulador de promedio" primary />
            </div>
            <div v-else class="flex gap-4">
              <Button @click="irSimulador" label="Cancelar" secundary />
              <Button @click="irSimulador" label="Reestablecer notas" primary />
            </div>
          </div>
        </div>
        <div class="flex items-center justify-start mb-3">
          <div v-if="dashboard">
            <div v-if="inasistencia !== null"
              class="border border-[#404040] px-4 gap-1 flex items-center justify-start h-[28px] rounded-full">
              <p class="text-[#404040] font-sans text-sm">Inasistencias:</p>
              <p class="text-[#404040] font-sans text-sm">{{ inasistencia }}</p>
            </div>
          </div>
        </div>
        <NotesTable v-if="notasData !== undefined" :notasData="notasData" :dashboard="dashboard" :simulator="showSimulator" />
      </BoxContainer>
    </div>
  </div>
</template>

<script setup >
import { useMenuStore } from "../stores/menu";
const notasData = ref(null);
const inasistencia = ref(null);

const showSimulator = ref(false);

const menuStore = useMenuStore();

const props = defineProps({
  dashboard: Boolean
})

watchEffect(async () => {
  const notas = menuStore.getNotasItems;
  console.log('getting information here: ', notas.notas);
  if (notas) {
    notasData.value = notas.notas;
    inasistencia.value = notas.inasistencias;
  }

  console.log('the notes data: ',notasData.value);
});

const irSimulador = () => {
  showSimulator.value = !showSimulator.value;
}


</script>
