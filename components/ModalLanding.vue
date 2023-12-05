<template>
  <section
    class="fixed top-0 left-0 right-0 bottom-0 bg-[#00000069] flex items-center justify-center z-50"
  >
    <div
      class="bg-white p-10 relative rounded-none min-w-[90%] md:min-w-[479px]"
    >
      <i @click="triggerModal" class="absolute top-4 right-4 text-red-600 text-base icon-close"></i>
      <h3 class="mb-2 font-bold text-lg uppercase font-solano">
        Selecciona una institución
      </h3>
      <select
        class="mb-6 rounded px-3 py-[10px] w-full border border-[#BFBFBF] outline-none text-sm"
        name=""
        id=""
      >
        <option value="">Selecciona</option>
      </select>
      <div>
        <p class="mb-4 font-bold text-lg uppercase font-solano">
          ¿Eres nuevo en Wetalk?
        </p>
        <div
          class="flex md:items-center gap-[17px] md:gap-16 flex-col md:flex-row"
        >
          <div class="flex items-center">
            <input
              id="default-radio-1"
              type="radio"
              value=""
              name="default-radio"
              class="outline-none w-5 h-5 border-[#404040] focus:ring-transparent"
            />
            <label for="default-radio-1" class="ms-2 text-[#404040]"
              >Sí, soy nuevo</label
            >
          </div>
          <div class="flex items-center">
            <input
              id="default-radio-2"
              type="radio"
              value=""
              name="default-radio"
              class="outline-none w-5 h-5 border-[#404040] focus:ring-transparent"
            />
            <label for="default-radio-2" class="ms-2 text-[#404040]"
              >No, soy reingresante</label
            >
          </div>
        </div>
        <div class="flex justify-center items-center mt-8">
          <Button primary label="Mas informacion aqui" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
 const emit = defineEmits();

const triggerModal = () => {
  emit('modal-close');
};

</script>

<style>
</style>