<script setup lang="ts">
import { useUserStore } from "~/stores/auth";
const { $msal, $config } = useNuxtApp();
const userStore = useUserStore();

const accessDomain = ref(false);

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

const logout = async () => {
  if ($msal().isAuthenticated()) {
    await $msal().signOut($msal().getAccounts()[0]?.homeAccountId);
  }
};

watchEffect(async () => {
  const userData = userStore.getUserData;
  if (userData) {
    localStorage.setItem("institucion", userData.institucion!);
  }
});


if($config.public.stage != 'prod') {
  
    accessDomain.value = true;
    navigateTo("/", { replace: true });

} else {

  const accounts = $msal().getAccounts();
  const accessToken = await $msal().acquireTokenSilent();

  const userEmailDomain = accounts?.length > 0 ? accounts[0].username : "";
  // const listDomain = ["upc.edu.pe", "upn.pe"];
  const listDomain = ["upn.pe"];

  let isAuthenticated = $msal().isAuthenticated() && isDomainAllowed(userEmailDomain, listDomain);
  let stringCodUser = accounts[0]?.username

  const entidadActiva = ref('');
  if(stringCodUser){
  for (let index = 0; index < listDomain.length; index++) {
      const element = listDomain[index];
      if(stringCodUser.includes(element)){
        entidadActiva.value = element.substring(0, 3)
      }
  }
  }

  let userCode = "";
  switch(entidadActiva.value) {
    case "upc": userCode = stringCodUser?.replace(/[^0-9]+/g, ""); break;
    case "upn": userCode = stringCodUser?.match(/([^@]+)/)?.at(0) ?? ""; break;
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
}

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
