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
    <div class="flex min-h-[calc(100vh)] bg-[#ACF] relative">
        <div class="flex justify-center lg:justify-end w-full  ">
            <div class="content lg:mx-[100px] pt-[82px] z-10">
                <div class="logos flex justify-between py-[33px]">
                    <img src="@/assets/images/logoupcicon.svg" alt="UPC">
                    <img src="@/assets/images/logoUPN.svg" alt="UPN">
                    <img src="@/assets/images/logoCIB.svg" alt="CIBERTEC">
                </div>
                <div class="content-login min-w-[100%] lg:min-w-[360px] max-w-[360px] bg-[#fff] py-[34px] px-[36px] rounded-[15px]">
                    <img src="@/assets/images/wetalkLogo.svg" class="mx-auto" alt="CIBERTEC">
                    
                    <!-- <button type="submit"
                        class="bg-[#E50A17] mx-auto text-white py-2 px-4  font-medium flex items-center gap-2 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50 transition duration-300 ease-in-out"
                        @click="login">
                        <span>Iniciar sesión</span>
                    </button>  -->
                    <Button
                        class="w-full w-full-btn mt-[40px]"
                        label="Iniciar sesión"
                        primary
                        @click="login"
                    />
                </div>
            </div>
        </div>
        <div class="marca-logo left-[84px] min-w-xs max-w-[700px] hidden md:block">
            <img src="@/assets/images/english.png" alt="English ">
        </div>
        
        <!-- <div class="relative w-full ">

           

            <div class="flex justify-center mx-auto w-[400px] my-10">
                <button type="submit"
                    class="bg-red-500 text-white py-2 px-4 rounded font-medium flex items-center gap-2 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50 transition duration-300 ease-in-out"
                    @click="login">
                    <span>Login con Microsoft 365</span>
                </button>    
            </div>
        </div> -->
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