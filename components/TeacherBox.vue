<template>
  <div class="flex flex-col gap-[28px]">
    <BoxContainer color="yellow">
      <div class="flex items-center justify-between pb-[18px]">
        <h3 class="text-[#404040] font-solano text-2xl font-bold uppercase">Profesor</h3>
      </div>
      <div class="flex items-start gap-3">
        <i class="icon-user text-[33px] text-[#404040]"></i>
        <div class="w-full">
          <p class="text-[#404040] font-publicSans capitalize font-bold" >{{ teacher }}</p>
          <p class="flex items-center justify-between cursor-pointer">
            <a a :href="`mailTo:${mail}`" class="text-sm font-publicSans text-[#404040]">{{ mail }}</a>
            <i @click="copyToClipboard(mail)" class="icon-file-copy text-xl text-[#699A8F] hidden lg:block"></i>
          </p>
        </div>
        <i class="icon-file-copy text-xl text-[#699A8F] lg:hidden" @click="copyToClipboard(mail)"></i>

      </div>
    </BoxContainer>
  </div>
</template>

<script setup>

import { useMenuStore } from "../stores/menu";
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

const $toast = useToast();

const teacher = ref("");

const mail = ref("");

const menuStore = useMenuStore();


watchEffect(async () => {
  const alumnData = menuStore.getProfileItems;
  if (alumnData) {
    const profesorNombre = alumnData.data[0].profesorNombre;
    teacher.value = profesorNombre.toLowerCase();
    mail.value = alumnData.data[0].profesorEmail;
  }
});


const copyToClipboard = (email) => {
    if (!navigator.clipboard) {
        $toast.open({
            message: "No se puede copiar en tu navegador.",
            typeof: "error",
        });
        return;
    }
    navigator.clipboard.writeText(mail.value)
        .then(() => {
            $toast.open({
                message: "Texto Copiado!!!",
                typeof: "success",
            });
        })
        .catch(err => {
            $toast.open({
                message: "Error al copiar texto",
                typeof: "error",
            });
        });

    if(dataLayer){
      dataLayer.push({
        event: 'Click-EmailProffesor',
        'email': email
      })
    }
};

</script>

<style></style>