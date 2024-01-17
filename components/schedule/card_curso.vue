<!-- eslint-disable vue/require-default-prop -->
<script setup>
import { defineProps, ref } from 'vue'

import locales from '~/utils/locales.json'
defineProps({
  i: Object,
})

const showItem = ref(false)
const showCourse = () => {
  showItem.value = !showItem.value
}
</script>

<template>
  <div
    class="cursor-pointer"
    @click="showCourse()"
  >
    <div class="flex justify-between">
      <h3
        class="font-solano text-xl uppercase leading-[1]"
        :class="{ 'text-primary': showItem }"
      >
        {{ i.DescEspecialCurso }}
      </h3>
      <nuxt-icon
        class="text-[14px] text-primary"
        name="menos"
        v-if="showItem"
      />
      <nuxt-icon
        class="text-[14px] text-primary"
        name="mas"
        v-else
      />
    </div>
  </div>
  <div
    class="content_detalls grid grid-cols-2 gap-2 text-sm pt-4 mt-2 pb-10 border-t-neutral-2 border-t-[1px]"
    v-if="showItem"
  >
    <div class="item_detall">
      <div class="font-bold">Sección:</div>
      <div>{{ i.Seccion }}</div>
    </div>
    <div class="item_detall">
      <div class="font-bold">Profesor:</div>
      <div>{{ i.NombresImag }} {{ i.ApeMatImag }}</div>
    </div>
    <div class="item_detall">
      <div class="font-bold">Aula:</div>
      <div>{{ i.CodAula }}</div>
    </div>
    <div class="item_detall">
      <div class="font-bold">Campus:</div>
      <div>{{ locales[i.CodLocal] }}</div>
    </div>
  </div>
</template>
