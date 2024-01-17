<!-- eslint-disable no-undef -->
<!-- eslint-disable vue/require-default-prop -->
<script setup>
import { defineProps, ref } from 'vue'

const props = defineProps({
  cursosItems: {
    type: Object
  }
})
const { getScheduleCourse } = useScheduleData()

const showItem = ref(false)
const detailsNote = ref({})
const errorDate = ref()
const loading = ref(true)
const errorMsg = ref(null)

const showCourse = async (curso) => {
  showItem.value = !showItem.value

  if (showItem.value) {
    const { matricula1, error } = await getScheduleCourse(curso)
    loading.value = false
    errorDate.value = error.value
    if (matricula1.value?.flag && Boolean(matricula1.value.data?.notas)) {
      detailsNote.value = matricula1.value.data
    } else if (matricula1.value?.error) {
      errorMsg.value = {
        ...matricula1.value.error,
        flag: matricula1.value.flag
      }
    }
  }
}

const validateNote = (nota) => {
  if (nota === 0 || nota === null || nota === '' || nota > 20) return '-'
  return nota
}
</script>
<template>
  <div
    class="cursor-pointer"
    @click.prevent="showCourse(cursosItems)"
  >
    <div class="flex justify-between">
      <h3
        class="font-solano text-xl uppercase leading-[1]"
        :class="{ 'text-primary': showItem }"
      >
        {{ cursosItems.descEspecialCurso }}
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
    class="content_detalls text-sm pt-4 mt-2 pb-4 border-t-neutral-2 border-t-[1px]"
    v-if="showItem"
  >
    <div class="content_note">
      <div
        v-if="loading"
        class="min-h-[80px] flex justify-center items-center"
      >
        <img
          class="w-[50px]"
          src="~/assets/images/loading.gif"
          alt="Cargando"
        >
      </div>
      <div
        class="flex"
        v-else-if="Boolean(errorDate)"
      >
        <NuxtIcon
          class="text-[35px] mr-2"
          filled
          name="IconNoService"
        />
        <div>
          <p class="font-bold">Lo sentimos, no pudimos cargar tus notas</p>
          <p>Inténtalo de nuevo en unos minutos</p>
        </div>
      </div>
      <div
        v-else-if="Boolean(errorMsg)"
        class="flex"
      >
        <NuxtIcon
          v-if="!errorMsg.flag"
          class="text-[27px] mr-2"
          filled
          name="IconNoService"
        />
        <NuxtIcon
          v-else
          class="text-[27px] mr-2"
          filled
          name="IconClock2"
        />
        <p class="font-bold">{{ errorMsg.titulo }}</p>
        <p v-if="Boolean(errorMsg.descripcion)">{{ errorMsg.descripcion }}</p>
      </div>
      <div v-else>
        <div class="c_notas grid gap-4">
          <div
            class="item_detall"
            v-for="item in detailsNote.notas"
            :key="item"
          >
            {{ item.codTipoPrueba }}:
            <span
              class=""
              :class="{
                'text-secondary':
                  Number(item.nota) > 12.5 || isNaN(Number(item.nota)),
                'text-primary':
                  Number(item.nota) <= 12.5 && Number(item.nota) > 0,
                'text-black': validateNote(item.nota) === '-',
              }"
            >{{ validateNote(item.nota) }}</span>

            <div class="hover_detall">
              {{ item.desTipoPrueba }}
            </div>
          </div>
        </div>
        <div class="flex c_footer_nota mt-5 justify-between items-center">
          <div class="flex c_faltas items-center">
            <div class="">
              <span
                class="px-1 lg:px-[2px] text-[12px] xl:text-[15px] leading-[1]"
              >Inasistencias</span>
            </div>
            <span class="number text-center xl:ml-1 !bg-[#BFE8FF]">
              {{ detailsNote.inasistencias }}
            </span>
          </div>
          <div class="flex c_promedio items-center">
            <div class="">
              <span
                class="px-1 lg:px-[2px] text-[12px] xl:text-[15px] leading-[1]"
              >Promedio final</span>
            </div>
            <span
              class="number text-center xl:ml-1 text-white"
              :class="{
                'bg-secondary':
                  Number(detailsNote.notaFinal) > 12.5 ||
                  isNaN(Number(detailsNote.notaFinal)),
                'bg-primary': Number(detailsNote.notaFinal) < 12.5,
                'bg-disabled': validateNote(detailsNote.notaFinal) === '-',
              }"
            >
              {{ validateNote(detailsNote.notaFinal) }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.c_footer_nota {
  border: 1px solid #e0e0e0;
}
.c_faltas .number,
.c_promedio .number {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 39px;
}
.c_faltas .number {
  width: 35px;
}
.c_promedio .number {
  width: 35px;
}
.c_faltas .text,
.c_promedio .text {
  padding: 0px 10px;
}
.c_faltas .number,
.bg-disabled {
  background-color: #e1e1e1;
}
.item_detall {
  position: relative;
  border: 1px solid #e0e0e0;
  padding: 5px 8px;
  font-size: 12px;
  text-align: center;
}

.content_note .c_notas {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

@media (min-width: 768px) {
  .content_note .c_notas {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .content_note .c_notas {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .c_faltas .text,
  .c_promedio .text {
    padding: 0px 2px;
  }
}

@media (min-width: 1224px) {
  .content_note .c_notas {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
  .item_detall {
    font-size: 14px;
  }
  .c_promedio .number {
    width: 45px;
  }
}

.item_detall .hover_detall {
  display: none;
}

.item_detall:hover .hover_detall {
  display: block;
}

.hover_detall {
  position: absolute;
  background-color: #e8e8e8;
  font-size: 11px;
  bottom: 100%;
  left: -6px;
  z-index: 9;
  line-height: 1;
  padding: 4px 4px;
}

.hover_detall::before {
  content: '';
  position: absolute;
  bottom: -2px;
  background-color: #e8e8e8;
  width: 10px;
  height: 8px;
  transform: rotate(45deg);
  z-index: -1;
}
</style>
