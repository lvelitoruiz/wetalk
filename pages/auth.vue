<script setup>
 const { $msal } = useNuxtApp();


    if($msal().isAuthenticated()){
    navigateTo("/");
    }

    if(!$msal().isAuthenticated()){
    navigateTo("/login");
    }

</script>
<template>
    <div>
        <p class="text-center mt-[20px]">Validando Sesión</p>
        <div class="flex items-center w-full justify-center mt-5">
            <!-- <button type="submit"
            class="bg-red-500 text-white py-2 px-4 rounded font-medium flex items-center gap-2 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50 transition duration-300 ease-in-out"
            @click="logout">
            <span>Cerrar sesión</span>
            </button> -->
        </div>
    </div>
</template>
