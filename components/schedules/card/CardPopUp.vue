<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';
import type { DetalleHorario, Professor } from '~/types/cursos.types';

const props = defineProps<{
  course: DetalleHorario
  closePopup: () => void
}>();

const breakpoints = useBreakpoints(breakpointsTailwind);
const smallerThanLg = breakpoints.smaller('lg');
const msgCopy = ref<{ text: null | string, id: string | null }>({
  text: null,
  id: null,
});

let timeOut: string | number | NodeJS.Timeout | undefined;
const copy = (text: string) => {
  clearTimeout(timeOut);
  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'Click/Copy-HorarioPopup',
      page_url: `${window.location.href}`,
      section: props.course.descripMateria,
      title: 'email Docente',
    });
  }
  try {
    navigator.clipboard.writeText(text);
    msgCopy.value.text = 'copiado';
    msgCopy.value.id = text;
  } catch {
    msgCopy.value.text = 'No se pudo copiar';
    msgCopy.value.id = text;
  } finally {
    timeOut = setTimeout(() => {
      msgCopy.value.text = null;
      msgCopy.value.id = null;
    }, 2000);
  }
};
const selectedProfessor = ref<Professor>(props.course.profesor[0]);
const handleChange = (e: any) => {
  selectedProfessor.value = props.course.profesor[e.target.value ?? 0];
};

const eventClick = () => {
  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'Click/Select-HorarioPopup',
      page_url: `${window.location.href}`,
      section: props.course.descripMateria,
      title: 'Docente',
    });
  }
};

const eventClickCorreo = () => {
  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'Click/Url-HorarioPopup',
      page_url: `${window.location.href}`,
      section: props.course.descripMateria,
      title: 'email docente',
    });
  }
};

const eventClickRemoto = (title: string, url: string) => {
  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'Click/Remoto-HorarioPopup',
      page_url: `${window.location.href}`,
      section: props.course.descripMateria,
      url,
      title,
    });
  }
};

const target = ref(null);
onClickOutside(target, () => { props.closePopup(); });
onMounted(() => {
  const body: HTMLElement | null = document.querySelector('body');
  body?.classList.add('overflow-hidden');
});
</script>
<template>
  <div class="content-popup">
    <div
      ref="target"
      class="popup-schedule"
      :class="{
        'mobile-popup': smallerThanLg,
      }"
    >
      <button @click.stop="closePopup">
        <NuxtIcon class="close-schedule-popup" name="navClose" />
      </button>

      <div class="px-[32px] pb-[65px] lg:pb-[40px]">
        <span
          class="fon-telegraf bg-[#039C6D] text-white text-[0.625rem] font-bold px-[8px] py-[4px] rounded-[16px]"
        >
          {{ course.descripMetodoEducativo }}
        </span>
        <h4 class="card-title-popup" :title="course.descripMateria">
          {{ course.descripMateria }}
        </h4>
        <p class="font-publicSans text-[#4F6168] text-sm mb-4">
          {{ course.codMateria }} - {{ course.codSeccion }}
        </p>
        <div class="grid grid-cols-2 gap-y-[10px] gap-x-[16px]">
          <div>
            <p
              class="font-publicSans text-[#333333] leading-[1] text-xs pb-[2px]"
            >
              Horario
            </p>
            <div class="font-publicSans font-bold text-[#000]">
              <span class="text-[16px]">{{
                course.horaInicio.slice(0, 5)
              }}</span>
              -
              <span class="text-xs">{{ course.horaFin.slice(0, 5) }}</span>
            </div>
          </div>
          <div>
            <p
              class="font-publicSans text-[#333333] leading-[1] text-xs pb-[2px]"
            >
              Salón
            </p>
            <p
              v-if="course.descripMetodoEducativo !== 'Virtual'"
              class="font-publicSans font-bold text-[#000] text-sm"
            >
              {{ course.codAula || '-' }}
            </p>
            <p v-else class="font-publicSans text-blue_light text-sm">
              <a
                href="https://upn.blackboard.com/auth-saml/saml/login?apId=_111_1&redirectUrl=https%3A%2F%2Fupn.blackboard.com%2Fultra"
                class="underline"
                target="_blank"
                @click="
                  eventClickRemoto(
                    'Aula virtual (Blackboard)',
                    'https://upn.blackboard.com/auth-saml/saml/login?apId=_111_1&redirectUrl=https%3A%2F%2Fupn.blackboard.com%2Fultra',
                  )
                "
              >Aula virtual (Blackboard)</a>
            </p>
          </div>
          <div v-if="course.profesor.length" class="col-span-2 lg:col-span-1">
            <label
              for="docentes"
              class="font-publicSans text-[#333333] leading-[1] text-xs pb-[6px] h-full"
            >
              Instructor
            </label>
            <select
              id="docentes"
              class="font-publicSans font-bold capitalize w-full border border-[#BFBFBF] rounded p-2 outline-none text-xs text-[#404040]"
              name="docentes"
              @click="eventClick"
              @change="handleChange"
            >
              <option
                v-for="(docente, k) in course.profesor"
                :key="k"
                class="capitalize"
                :selected="k === 0"
                :value="k"
              >
                {{ docente.nombreCompleto.toLowerCase() }}
              </option>
            </select>
          </div>
          <div
            v-if="course.profesor.length"
            class="flex flex-col justify-start col-span-2 lg:col-span-1 mt-3 lg:mt-0"
          >
            <p
              class="font-publicSans text-[#333333] leading-[1] text-xs pb-[6px] mt-auto"
            >
              Correo del instructor
            </p>
            <div class="relative flex items-center lg:h-[31.2px] max-w-min">
              <a
                href="mailto:ernesto.castillo@upn.pe"
                class="font-publicSans text-blue_light text-xs pr-2 underline"
                @click="eventClickCorreo"
              >
                {{ selectedProfessor.correo }}
              </a>
              <button @click="copy(selectedProfessor.correo)">
                <NuxtIcon class="iconCopy" name="fileCopy" />
              </button>
              <div
                v-if="msgCopy.id === selectedProfessor.correo"
                class="copy-msg"
              >
                <nuxt-icon name="IconCheckSim" class="mr-1" />
                {{ msgCopy.text }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.content-popup {
	@apply fixed top-0 h-screen w-full bg-black bg-opacity-30 flex items-center justify-center z-[105] left-[50%] translate-x-[-50%];
}
.popup-schedule {
	@apply relative bg-white lg:fixed z-50 lg:w-[500px] lg:rounded-[8px] lg:cursor-auto;
}
.close-schedule-popup {
	@apply text-[#000000] text-[16px] absolute right-3 top-3 leading-[1] font-[600]
	hover:text-primary;
}
.popup-schedule.mobile-popup {
	@apply fixed bottom-0 left-0 right-0 w-full z-[110] rounded-t-[15px];
	animation-duration: 0.2s;
	animation-name: animate-entrance;
}
.mobile-popup .close-schedule-popup {
	@apply right-4 top-4 text-[16px];
}
.card-title-popup {
	@apply font-solano uppercase text-lg lg:text-[20px] text-[#E50A17] mt-2 leading-[1] break-words col-span-2;
}
.iconCopy {
	@apply text-[#699A8F] text-[20px] cursor-pointer;
}

.copy-msg {
	@apply bg-[#404040] opacity-90 min-w-max flex items-center text-white text-xs ml-1 p-2 rounded absolute left-full bottom-0 lg:bottom-[initial] lg:top-0;
}

@keyframes animate-entrance {
	0% {
		opacity: 0;
		transform: translateY(100%);
	}

	100% {
		opacity: 1;
		transform: translateY(0);
	}
}
</style>

<style lang="postcss">
.iconCopy svg {
	@apply !mb-0;
}
</style>
