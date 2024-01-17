<template>
  <div>
    <div class="pb-7">
      <BoxContainer color="green">
        <div class="flex items-center justify-between pb-5 px-[9px]">
          <h3 class="text-[#404040] text-2xl font-bold font-solano uppercase">
            Notas
          </h3>
          <div class="flex flex-col gap-4">
            <Button
              label="Cancelar"
              secundary
            />
            <Button
              label="Reestablecer notas"
              primary
            />
          </div>
        </div>

        <SimuladorTable :notas-data="tablaNotas" />
      </BoxContainer>
    </div>
  </div>
</template>

<script setup>
const tablaNotas = [
  {
    tipo: 'PA1',
    evaluacion: 'Prod. oral - sesión sinc.',
    peso: '20%',
    nota: 20,
  },
  {
    tipo: 'PA1',
    evaluacion: 'Prod. oral - sesión sinc.',
    peso: '20%',
    nota: 13,
  },
  {
    tipo: 'PA1',
    evaluacion: 'Prod. oral - sesión sinc.',
    peso: '10%',
    nota: 18,
  },
  {
    tipo: 'PA1',
    evaluacion: 'Prod. oral - sesión sinc.',
    peso: '10%',
    nota: '05',
  },
  {
    tipo: 'PA1',
    evaluacion: 'Prod. oral - sesión sinc.',
    peso: '20%',
    nota: '-',
  },
  {
    tipo: 'PA1',
    evaluacion: 'Prod. oral - sesión sinc.',
    peso: '10%',
    nota: '-',
  },
  {
    tipo: 'PA1',
    evaluacion: 'Prod. oral - sesión sinc.',
    peso: '10%',
    nota: '-',
  },
];
</script>
