<script setup lang="ts">
import { useUserStore } from "~/stores/auth";
const { $msal } = useNuxtApp();
const userStore = useUserStore();

const isDomainAllowed = (
  userEmailDomain: string | undefined,
  allowedDomains: string[]
) => {
  return (
    userEmailDomain &&
    allowedDomains.some((allowedDomain) =>
      userEmailDomain.includes(allowedDomain)
    )
  );
};

watchEffect(async () => {
  const userData = userStore.getUserData;
  if (userData) {
    localStorage.setItem("institucion", userData.institucion!);
  }
});

const accounts = $msal().getAccounts();
const accessToken = await $msal().acquireTokenSilent();
const accessDomain = ref(false);

const userEmailDomain = accounts?.length > 0 ? accounts[0].username : "";
const listDomain = ["upc.edu.pe", "upn.pe"];

let isAuthenticated = $msal().isAuthenticated() && isDomainAllowed(userEmailDomain, listDomain);
let stringCodUser = accounts[0]?.username
const userCode = stringCodUser?.replace(/[^0-9]+/g, "");

const entidadActiva = ref('');
if(stringCodUser){
 for (let index = 0; index < listDomain.length; index++) {
    const element = listDomain[index];
    if(stringCodUser.includes(element)){
      entidadActiva.value = element.substring(0, 3)
    }
 }
}

if (isAuthenticated) {
  const user = {
    ...accounts[0],
    bearerToken: accessToken,
    codUser: userCode,
    institucion : entidadActiva
  };
  localStorage.setItem("tokenH", accessToken!);
  localStorage.setItem("codUser", userCode);
  accessDomain.value = true;
  userStore.fetchUserData(
    Boolean(isDomainAllowed(userEmailDomain, listDomain)),
    JSON.stringify(accessToken),
    user
  );
}

if (accounts?.length === 0) {
  navigateTo("/login", { replace: true });
}

if (!isAuthenticated) {
  accessDomain.value = false;
} else if (isAuthenticated) {
  navigateTo("/", { replace: true });
}

const logout = async () => {
  if ($msal().isAuthenticated()) {
    await $msal().signOut($msal().getAccounts()[0]?.homeAccountId);
  }
};

</script>
<template>
  <div class="text-center h-[300px] flex justify-center items-center">
    <div>
      <!-- <p class="text-center mt-[20px]" v-if="loading">Validando Sesión...</p> -->

      <div class="flex items-center w-full justify-center mt-5"></div>
      <div v-if="!accessDomain">
        <p class="my-5">No tienes permisos para acceder</p>
        <!-- <p>Inicie sesión con otra cuenta</p> -->
        <!-- <Logout></Logout> -->
        <button @click="logout">Cerrar sesión</button>
      </div>
      <div v-if="accessDomain">Iniciando Sesión</div>
    </div>
  </div>
</template>
