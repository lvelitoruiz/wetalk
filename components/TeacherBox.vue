<!-- eslint-disable no-undef -->
<!-- eslint-disable @typescript-eslint/no-floating-promises -->
<script setup>
import { useMenuStore } from '../stores/menu';
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import { apiUrl } from '~/consts';
import { ref, watchEffect, onMounted } from 'vue';

const $toast = useToast();
const teacher = ref('');
const mail = ref('');
const menuStore = useMenuStore();

watchEffect(async () => {
  const profesorData = menuStore.getProfesorItems;
  if (profesorData) {
    const profesorNombre = profesorData[0]?.nombreCompleto;
    teacher.value = profesorNombre?.toLowerCase();
    mail.value = profesorData[0]?.correo;
  }
});

onMounted(() => {
  menuStore.fetchProfesorData(apiUrl);
});

const copyToClipboard = (email) => {
  if (!navigator.clipboard) {
    $toast.open({
      message: 'No se puede copiar en tu navegador.',
      typeof: 'error',
    });
    return;
  }
  navigator.clipboard
    .writeText(mail.value)
    .then(() => {
      $toast.open({
        message: 'Texto Copiado!!!',
        typeof: 'success',
      });
    })
    .catch((_err) => {
      $toast.open({
        message: 'Error al copiar texto',
        typeof: 'error',
      });
    });

  if (dataLayer) {
    dataLayer.push({
      event: 'Click-EmailProffesor',
      email,
    });
  }
};
</script>

<template>
  <div class="flex flex-col gap-[28px] mb-[20px]">
    <BoxContainer color="yellow">
      <div class="flex items-center justify-between pb-[18px]">
        <h3 class="text-[#404040] font-solano text-2xl font-bold uppercase">
          Profesor
        </h3>
      </div>
      <div class="flex items-start gap-3">
        <i class="icon-user text-[33px] text-[#404040]" />
        <div class="w-full">
          <p class="text-[#404040] font-publicSans capitalize font-bold">
            {{ teacher }}
          </p>
          <p
            v-if="mail"
            class="flex items-center justify-between cursor-pointer"
          >
            <a
              a
              :href="`mailTo:${mail}`"
              class="text-sm font-publicSans text-[#404040]"
              >{{ mail }}</a
            >
            <i
              @click="copyToClipboard(mail)"
              class="icon-file-copy text-xl text-[#699A8F] hidden lg:block"
            />
          </p>
        </div>
        <i
          v-if="mail"
          class="icon-file-copy text-xl text-[#699A8F] lg:hidden"
          @click="copyToClipboard(mail)"
        />
      </div>
    </BoxContainer>
  </div>
</template>

<style></style>
