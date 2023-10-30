<script setup ts>
import { useMenuStore } from "../stores/menu";
import { watchEffect, defineEmits } from "vue";

const notifications = ref(null);

const emit = defineEmits(['close']);

const menuStore = useMenuStore();

watchEffect(async () => {
    const notifData = menuStore.getNotificationItems;
    if (notifData) {
        notifications.value = notifData;
        console.log('information about notifications: ', notifData);
    }
});

function closeNotifications() {
    emit('close');
}
</script>
<template>
    <div class="absolute left-[-40px] top-[70px]">
        <div class="ml-[40px] triangulo-up z-10"></div>
        <div class="bg-white relative rounded-lg py-4 shadow-[0_0_20px_0_rgba(77,39,37,0.25)] min-w-[390px]">
            <div class="px-4 py-2 flex items-center justify-between">
                <p class="font-medium text-[#191919]">Notificaciones</p>
                <i class="text-[#35158C] text-xs icon-book-open cursor-pointer leading-none"></i>
            </div>
            <div class="flex items-center gap-3 px-4 py-2">

                <div v-for="(notification, index) in notifications">
                    <div v-if="notification.count > 0" class="bg-[#E50A17] px-4 py-1 text-white rounded-full flex items-center gap-1 cursor-pointer">
                        <p class="text-xs font-bold uppercase">{{ notification.category }}</p>
                        <span class="bg-white rounded-full w-[18px] h-[18px] flex items-center justify-center">
                            <span class="text-[#E50A17] font-medium text-sm">{{ notification.count }}</span>
                        </span>
                    </div>
                </div>

                <!-- <div class="bg-[#E50A17] px-4 py-1 text-white rounded-full flex items-center gap-1 cursor-pointer">
                    <p class="text-xs font-bold uppercase">PRINCIPAL</p>
                    <span class="bg-white rounded-full w-[18px] h-[18px] flex items-center justify-center">
                        <span class="text-[#E50A17] font-medium text-sm">2</span>
                    </span>
                </div>
                <div
                    class="border border-[#191919] px-4 py-1 text-[#191919] rounded-full flex items-center gap-1 cursor-pointer">
                    <p class="text-xs font-bold uppercase">General</p>
                    <span class="bg-[#E50A17] rounded-full w-[18px] h-[18px] flex items-center justify-center">
                        <span class="text-white font-medium text-sm">1</span>
                    </span>
                </div> -->
            </div>
            <div class="overflow-y-auto max-h-[590px]">
                <p class="uppercase text-[#191919] text-sm font-bold px-4 py-2">Esta semana</p>
                <div class="h-[106px] flex items-center px-4 bg-[#D7E9FB] cursor-pointer gap-5">
                    <span class="min-w-[16px] min-h-[16px] bg-[#E50A17] rounded-full"></span>
                    <div>
                        <p class="text-sm mb-1">Ya puedes visualizar todas tus notas de Inglés 5.</p>
                        <div class="flex items-center gap-1">
                            <div class="bg-[#FFF4AA] p-1 flex items-center gap-1 rounded cursor-pointer">
                                <i class="text-[#554A00] text-sm icon-book-open"></i>
                                <span class="text-[#554A00] text-sm leaning-none">Mi curso (1)</span>
                            </div>
                            <span class="text-[#0043AA] text-xs">•</span>
                            <p class="text-[#0043AA] text-xs">Hace 10m</p>
                        </div>
                    </div>
                </div>
                <div class="h-[106px] flex items-center px-4 bg-[#D7E9FB] cursor-pointer gap-5">
                    <span class="min-w-[16px] min-h-[16px] bg-[#E50A17] rounded-full"></span>
                    <div>
                        <p class="text-sm mb-1">Hoy tienes una reserva de espacio deportivo a las 5:00pm.</p>
                        <div class="flex items-center gap-1">
                            <div class="bg-[#F0B27C] p-1 flex items-center gap-1 rounded cursor-pointer">
                                <i class="text-[#803900] text-sm icon-user-chat"></i>
                                <span class="text-[#803900] text-sm leaning-none">Networking (1)</span>
                            </div>
                            <span class="text-[#0043AA] text-xs">•</span>
                            <p class="text-[#0043AA] text-xs">Hace 10m</p>
                        </div>
                    </div>
                </div>
                <div class="h-[106px] flex items-center px-4 bg-white cursor-pointer gap-5">
                    <span class="min-w-[16px] min-h-[16px] bg-white rounded-full"></span>
                    <div>
                        <p class="text-sm mb-1">Tienes una nueva boleta emitida con vencimiento 25/07/2023.</p>
                        <div class="flex items-center gap-1">
                            <div class="bg-[#EFB3EF] p-1 flex items-center gap-1 rounded cursor-pointer">
                                <i class="text-[#8F00A8] text-sm icon-creditcard"></i>
                                <span class="text-[#8F00A8] text-sm leaning-none">Pagos</span>
                            </div>
                            <span class="text-[#595959] text-xs">•</span>
                            <p class="text-[#595959] text-xs">Hace 10m</p>
                        </div>
                    </div>
                </div>
                <div class="h-[106px] flex items-center px-4 bg-white cursor-pointer gap-5">
                    <span class="min-w-[16px] min-h-[16px] bg-white rounded-full"></span>
                    <div>
                        <p class="text-sm mb-1">Tienes una nueva boleta emitida con vencimiento 25/07/2023.</p>
                        <div class="flex items-center gap-1">
                            <div class="bg-[#CEBDFF] p-1 flex items-center gap-1 rounded cursor-pointer">
                                <i class="text-[#5624E0] text-sm icon-user-chat"></i>
                                <span class="text-[#5624E0] text-sm leaning-none">General</span>
                            </div>
                            <span class="text-[#595959] text-xs">•</span>
                            <p class="text-[#595959] text-xs">Hace 2d</p>
                        </div>
                    </div>
                </div>
                <p class="uppercase text-[#191919] text-sm font-bold px-4 py-2 pt-5">Anteriores</p>
                <div class="h-[106px] flex items-center px-4 bg-white cursor-pointer gap-5">
                    <span class="min-w-[16px] min-h-[16px] bg-white rounded-full"></span>
                    <div>
                        <p class="text-sm mb-1">Participa este viernes de Let’s talk about FCE, y obtén un certificado.</p>
                        <div class="flex items-center gap-1">
                            <div class="bg-[#7AD6CF] p-1 flex items-center gap-1 rounded cursor-pointer">
                                <i class="text-[#135D59] text-sm icon-puzzle"></i>
                                <span class="text-[#135D59] text-sm leaning-none">Beyond Wetalk</span>
                            </div>
                            <span class="text-[#595959] text-xs">•</span>
                            <p class="text-[#595959] text-xs">Hace 2d</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>