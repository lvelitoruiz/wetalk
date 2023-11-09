import { useUserStore } from "~/stores/auth";
export default defineNuxtRouteMiddleware(async (to, form) => {
    const userStore = useUserStore();

   if (to.name !== "login" && !userStore.getAccesUser) {
        return navigateTo("/login", { replace: true });
    } else if (to.name === "login" && userStore.getAccesUser) {
        return navigateTo("/", { replace: true });
    } else {
        return;
    }

});

