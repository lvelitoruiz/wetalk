<!-- eslint-disable no-undef -->
<script setup>
import { ref } from 'vue'
import { useNuxtApp } from '#app'
import { useUserStore } from '~/stores/auth'

const { $msal, $config } = useNuxtApp()
const userStore = useUserStore()

const selectedCodUser = ref(null)

definePageMeta({
  middleware: 'auth'
})
useHead({
  title: 'Portal WeTALK'
})

async function login () {
  if ($config.public.stage !== 'prod' && selectedCodUser.value) {
    const accessToken = ''
    const userCode = selectedCodUser.value

    const user = {
      name: 'Lesdy Huamán Cartagena',
      bearerToken: accessToken,
      codUser: userCode,
      institucion: 'upn'
    }

    // localStorage.setItem("tokenH", accessToken);
    // localStorage.setItem("codUser", userCode);
    // localStorage.setItem("institucion", 'upn');
    await userStore.fetchUserData(true, '', user)

    await navigateTo('/auth', { replace: true })
  } else {
    await $msal().signIn()
  }
}
</script>
<template>
  <div class="min-h-[calc(100vh)] bg-[#FE91A4] relative">
    <div
      class="logos flex justify-center pt-[39px] lg:justify-end gap-[26px] lg:gap-[26px] items-center lg:max-w-screen-xl mx-[auto]"
    >
      <img
        src="@/assets/images/upn-logo.svg"
        class="h-[45px] lg:h-[86px]"
        alt="UPN"
      >
      <div class="h-[68px] lg:h-[103px] w-[2px] bg-[#FFF]" />
      <img
        src="@/assets/images/wetalkLogo.svg"
        class="h-[45px] lg:h-[55px]"
        alt="WETALK"
      >
    </div>
    <div class="flex lg:max-w-screen-xl mx-[auto]">
      <div class="flex justify-center lg:justify-end w-full">
        <div class="content lg:mx-[77px] pt-[35px] lg:pt-[62px] z-10">
          <div v-if="$config.public.stage != 'prod'">
            <select v-model="selectedCodUser">
              <option>N00200910</option>
              <option>N00230206</option>
              <option>N00049275</option>
              <option>N00282479</option>
              <option>N00200854</option>
              <option>N00281622</option>
              <option>N00268730</option>
            </select>
          </div>
          <div
            class="content-login min-w-[100%] lg:min-w-[314px] max-w-[360px] bg-[#fff] py-[40px] px-[36px] rounded-[15px]"
          >
            <!-- <div class="logos flex justify-center gap-[20px] pb-[33px]">
                            <img src="@/assets/images/upcicon.svg" alt="UPC">
                            <img src="@/assets/images/upn.svg" alt="UPN">
                            <img src="@/assets/images/cib.svg" alt="CIBERTEC">
                        </div> -->
            <div class="text-center mb-[70px] mt-[42px]">
              <h3 class="text-[24px] font-solano">
                ¡Bienvenido a TU portal WeTALK!
              </h3>
              <p class="text-[14px]">Accede con tu cuenta para continuar</p>
            </div>
            <Button
              class="w-full w-full-btn"
              label="Iniciar sesión"
              primary
              @click="login"
            />
            <div class="text-center mt-[12px]">
              <span class="text-[14px]">¿Aún no estás matriculado?
                <a
                  href="/public"
                  class="text-primary font-zizou-bold"
                >Haz clic aquí</a></span>
            </div>
          </div>
        </div>
      </div>
      <div
        class="marca-logo left-[84px] min-w-xs max-w-[700px] hidden md:block"
      >
        <img
          src="@/assets/images/english.png"
          alt="English "
        >
      </div>
    </div>
  </div>
</template>
<style>
.marca-logo {
  position: absolute;
  bottom: 0px;
}
.w-full-btn > span {
  width: 100%;
}
</style>
