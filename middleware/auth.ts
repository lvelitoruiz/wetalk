import { useUserStore } from "~/stores/auth";
import * as jose from 'jose';
const { $msal } = useNuxtApp();


export default defineNuxtRouteMiddleware(async (to, form) => {
    const userStore = useUserStore();

    // const token = "eyJ0eXAiOiJKV1QiLCJub25jZSI6InBRWFEzU2VTc2FfV1Bwc244eEYtY1ZxdHNoaURuWWRzYTFpdDJHX0dYTXMiLCJhbGciOiJSUzI1NiIsIng1dCI6IlQxU3QtZExUdnlXUmd4Ql82NzZ1OGtyWFMtSSIsImtpZCI6IlQxU3QtZExUdnlXUmd4Ql82NzZ1OGtyWFMtSSJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDAiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC80OGJhMDBlMC0wMDJlLTRjYjAtYjUwMS0wNzM4NWQzNGVjMzQvIiwiaWF0IjoxNzAyNDEwNjk3LCJuYmYiOjE3MDI0MTA2OTcsImV4cCI6MTcwMjQxNTIyNCwiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IkFUUUF5LzhWQUFBQVE1TGhNTlVZYlcrNHlNVFNDZzhqelNHMmRkdGIvS3lVZWFNVjQ5MklqZ0d1bmJ5anJTdTVFK0Myb1VUdm5RRFkiLCJhbXIiOlsicHdkIl0sImFwcF9kaXNwbGF5bmFtZSI6IndldGFsay1wb3J0YWwtZGV2IiwiYXBwaWQiOiJlZjE0MDY0Zi02OWJmLTRiYTUtODUwMS1mODg0N2FkNjU0ZjkiLCJhcHBpZGFjciI6IjAiLCJmYW1pbHlfbmFtZSI6IkFsYnVycXVlcXVlIFRvcnJlcyIsImdpdmVuX25hbWUiOiJMZXlkeSBMZWUiLCJpZHR5cCI6InVzZXIiLCJpcGFkZHIiOiIxODEuNjUuMjUuMjI0IiwibmFtZSI6IkxleWR5IExlZSBBbGJ1cnF1ZXF1ZSBUb3JyZXMiLCJvaWQiOiIxN2EzNjc3ZS00NTE2LTRjMmQtYmVjOS0xZDRkNjM0MzY3MmIiLCJvbnByZW1fc2lkIjoiUy0xLTUtMjEtNDAwODg1MzM5MC0xNDgyNjA5NzEzLTkxMTc4NTE4NC0xMDIxNDE4IiwicGxhdGYiOiI1IiwicHVpZCI6IjEwMDMyMDAwOThDNDQzQTQiLCJyaCI6IjAuQVNVQTRBQzZTQzRBc0V5MUFRYzRYVFRzTkFNQUFBQUFBQUFBd0FBQUFBQUFBQUFsQUcwLiIsInNjcCI6Im9wZW5pZCBwcm9maWxlIFVzZXIuUmVhZCBlbWFpbCIsInN1YiI6Im1PaXZPcGRpaXpsRnhpemFyaVdMbGtfdkE4THI3N0UwUnhqbHFJckJyc28iLCJ0ZW5hbnRfcmVnaW9uX3Njb3BlIjoiU0EiLCJ0aWQiOiI0OGJhMDBlMC0wMDJlLTRjYjAtYjUwMS0wNzM4NWQzNGVjMzQiLCJ1bmlxdWVfbmFtZSI6Ik4wMDI1MTcyOEB1cG4ucGUiLCJ1cG4iOiJOMDAyNTE3MjhAdXBuLnBlIiwidXRpIjoib3FabW9XQXRzVXFWTE9pYVBzb0NBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il0sInhtc19zdCI6eyJzdWIiOiJmSHNhYlpfTHNWYURVZ01uZHRMMldPNXhzR2Nnc0Zsd2N1SDFlSk5Ia1BFIn0sInhtc190Y2R0IjoxMzU3ODQ2NzQzfQ.jxi2116dNY6njGkHElhr1CsFhcZa6f-3ty9Urd0fFyRgmKsjOV5Ql8swFdZmUX-zHWOxM8nlrcR0PXlhpn8MRq--Mw5NnuoERIobVvfPRyc9i15jZ3KPLnR6FI77U0LkI67rsfBqEQc4KGACQiv9BtNJYl-reHmQHwKAD3K9UNVMPXIKq_eSfAIyeeGHwAld2SrNQ0Bu5ovozufh3_BDhFH-TPVoy4CayRpaKWT8PaEUJktoNtyblqPsADHnYbTzRgYkZ1toCwjL4a6cGos_z74aEI8Yl1_lA--2eSx7zTRTiI9ZO7yMu5ssPQqoE0ggqmo27yGQr_Y_SGLZO51aGA";
    const token = await $msal().acquireTokenSilent();
    if(token) {
        const jwtdata = jose.decodeJwt(token!);
        const jwtExpired = jwtdata.exp ? Date.now() >= ((jwtdata.exp ?? 0) * 1000) : false;
        if(jwtExpired) {
            if($msal().isAuthenticated()){
                await $msal().signOut($msal().getAccounts()[0]?.homeAccountId)
            }
        }
    }
    
   if ((to.name !== "login" && !userStore.getAccesUser)) {
        return navigateTo("/login", { replace: true });
    } else if (to.name === "login" && userStore.getAccesUser) {
        return navigateTo("/", { replace: true });
    } else {
        return;
    }
});
