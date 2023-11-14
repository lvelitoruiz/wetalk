<template>
  <div>
    <div class="pb-7">
      <BoxContainer color="green">
        <div class="flex items-center justify-between pb-3 px-[9px]">
          <h3 class="text-[#404040] text-2xl font-bold font-solano uppercase">
            Notas
          </h3>
          <router-link v-if="dashboard" class="flex items-center gap-2" to="/notas">
            <span class="text-[#E50A17] font-bold font-zizou-bold text-sm"
              >Ver más</span
            >
            <i class="icon-arrow-right text-[#E50A17]"></i>
          </router-link>
          <router-link to="/simulador" v-else>
            <Button label="Simulador de promedio" primary />
          </router-link>
          
        </div>
        <div class="flex items-center justify-start mb-3">
          <div v-if="inasistencia"
            class="border border-[#404040] px-4 gap-1 flex items-center justify-start h-[28px] rounded-full"
          >
            <p class="text-[#404040] font-sans text-sm">Inasistencias:</p>
            <p class="text-[#404040] font-sans text-sm">{{ inasistencia }}</p>
          </div>
        </div>
        <NotesTable :notasData="tablaNotas" />
      </BoxContainer>
    </div>
  </div>
</template>

<script setup >

const props = defineProps ({
  inasistencia : Number,
  dashboard: Boolean
})

const tablaNotas = [
  {
    tipo: "PA1",
    evaluacion: "Prod. oral - sesión sinc.",
    peso: "20%",
    nota: 20,
  },
  {
    tipo: "PA1",
    evaluacion: "Prod. oral - sesión sinc.",
    peso: "20%",
    nota: 13,
  },
  {
    tipo: "PA1",
    evaluacion: "Prod. oral - sesión sinc.",
    peso: "10%",
    nota: 18,
  },
  {
    tipo: "PA1",
    evaluacion: "Prod. oral - sesión sinc.",
    peso: "10%",
    nota: "05",
  },
  {
    tipo: "PA1",
    evaluacion: "Prod. oral - sesión sinc.",
    peso: "20%",
    nota: "-",
  },
  {
    tipo: "PA1",
    evaluacion: "Prod. oral - sesión sinc.",
    peso: "10%",
    nota: "-",
  },
  {
    tipo: "PA1",
    evaluacion: "Prod. oral - sesión sinc.",
    peso: "10%",
    nota: "-",
  }
];
</script>
