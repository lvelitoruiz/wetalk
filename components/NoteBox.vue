<!-- eslint-disable @typescript-eslint/no-floating-promises -->
<!-- eslint-disable no-undef -->
<script setup>
import { useMenuStore } from '../stores/menu';
import { apiUrl } from '~/consts';
import { defineProps, ref } from 'vue';

const notasData = ref(null);
const inasistencia = ref(null);

const formula = ref(null);

const tableNotes = ref(null);

const showSimulator = ref(false);

const menuStore = useMenuStore();

const props = defineProps({
  dashboard: Boolean,
  showPromedio: Boolean,
});

const reestablishNotes = () => {
  tableNotes.value.recoverNotes();
  if (dataLayer) {
    dataLayer.push({
      event: 'Simular_Promedio',
      name: 'Evento_Simular_Promedio',
      Click_Text: 'Reestablecer notas',
    });
  }
};

const fetchData = async () => {
  await menuStore.fetchNotasData(apiUrl);
  await menuStore.fetchFaltasData(apiUrl);
};

watchEffect(async () => {
  const notas = menuStore.getNotasItems;
  if (notas) {
    notasData.value = notas.notas;
    formula.value = notas.dscFormula;
  }

  const faltaData = menuStore.getfaltasItems;
  if (faltaData) {
    inasistencia.value = faltaData.cantidad;
  }
});

const irSimulador = () => {
  showSimulator.value = !showSimulator.value;
  if ((dataLayer, !showSimulator.value)) {
    dataLayer.push({
      event: 'Simular_Promedio',
      name: 'Evento_Simular_Promedio',
      Click_Text: 'Cancelar',
    });
  }
  if ((dataLayer, showSimulator.value)) {
    dataLayer.push({
      event: 'Simular_Promedio',
      name: 'Evento_Simular_Promedio',
      Click_Text: 'Simulador de promedio',
    });
  }
};

onMounted(() => {
  fetchData();
});

const eventClickVerMas = () => {
  if (dataLayer) {
    dataLayer.push({
      event: 'Click_Click_Ver_Mas',
      name: 'Evento_Click_Ver_Mas',
      titulo_caja: 'Notas',
    });
  }
};
</script>

<template>
  <div>
    <div class="pb-7">
      <BoxContainer color="green">
        <div class="flex items-center justify-between pb-3">
          <h3 v-if="!showSimulator" class="text-[#404040] text-2xl">
            <span class="uppercase font-bold font-solano">Notas</span>
            <p v-if="!dashboard" class="text-[14px] font-publicSans">
              Nota mínima aprobatoria: 12.5
            </p>
          </h3>
          <h3 v-else class="text-[#404040] text-2xl">
            <span class="uppercase font-bold font-solano">
              Simulador de promedio
            </span>
            <p v-if="!dashboard" class="text-[14px] font-publicSans">
              Nota mínima aprobatoria: 12.5
            </p>
          </h3>
          <router-link
            @click="eventClickVerMas()"
            v-if="dashboard"
            class="flex items-center gap-2"
            to="/notas"
          >
            <span class="text-[#E50A17] font-bold font-zizou-bold text-sm">
              Ver más
            </span>
            <i class="icon-arrow-right text-[#E50A17]" />
          </router-link>
          <div v-else class="hidden lg:block">
            <div v-if="!showSimulator">
              <Button
                @click="irSimulador"
                label="Simulador de promedio"
                primary
              />
            </div>
            <div v-else class="flex gap-4">
              <Button @click="irSimulador" label="Cancelar" secundary />
              <Button
                @click="reestablishNotes"
                label="Reestablecer notas"
                primary
              />
            </div>
          </div>
        </div>
        <NotesTable
          v-if="notasData !== undefined"
          :notas-data="notasData"
          :dashboard="dashboard"
          :formula="formula"
          :simulator="showSimulator"
          :show-promedio="showPromedio"
          ref="tableNotes"
        />
        <div v-if="!dashboard" class="lg:hidden mt-6 flex justify-center">
          <div v-if="!showSimulator">
            <Button
              @click="irSimulador"
              label="Simulador de promedio"
              primary
            />
          </div>
          <div v-else class="flex flex-col lg:flex-row gap-4">
            <Button @click="irSimulador" label="Cancelar" secundary />
            <Button
              @click="reestablishNotes"
              label="Reestablecer notas"
              primary
            />
          </div>
        </div>
      </BoxContainer>
    </div>
  </div>
</template>
