<script setup>
const { $msal } = useNuxtApp();
definePageMeta({
    middleware: 'auth'
});
async function login() {
    // console.log($msal().signIn(), 'login')
    await $msal().signIn();
    // await $msal().acquireTokenSilent()
}


</script>
<template>
    <div class="flex justify-center mx-auto w-[400px] my-10">
        <button type="submit"
            class="bg-red-500 text-white py-2 px-4 rounded font-medium flex items-center gap-2 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50 transition duration-300 ease-in-out"
            @click="login">
            <span>Login con Microsoft 365</span>
        </button>
        
    </div>
</template>
<style lang="scss" scoped>
</style>