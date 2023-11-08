<script setup ts>
import { ref, watchEffect, defineEmits } from "vue";
import { useMenuStore } from "../stores/menu";

const emit = defineEmits(['close']);

const notifications = ref(null);
const categorizedItems = ref(null);

const finalItems = ref(null);

const generalItems = ref(null);
const personalItems = ref(null);
const pagosItems = ref(null);
const beyondItems = ref(null);
const networkItems = ref(null);

const menuStore = useMenuStore();

const convert = (element) => {
    let elements = [[], []];

    categorizedItems.value[element][0].map(item => {
        const antiguedad = item.antiguedad;
        const valor = parseInt(antiguedad);

        if (antiguedad.includes('d')) {
            if (valor > 6) {
                elements[0].push(item);
            } else {
                elements[1].push(item);
            }
        } else if (antiguedad.includes('h')) {
            elements[1].push(item);
        }
    });
    return elements;
}

watchEffect(async () => {
    const notifData = menuStore.getNotificationItems;
    if (notifData) {
        notifData.map((item, index) => {
            if (index === 0) {
                item.active = true
            } else {
                item.active = false
            }
        });
        notifications.value = notifData;
    }

    let items = {};

    notifications.value.forEach(item => {
        const category = item.category;
        if (!items[category]) {
            items[category] = [];
        }
        items[category].push(item.data);
    });

    categorizedItems.value = items;

    if (categorizedItems.value['General'].length) {
        generalItems.value = convert('General');
        finalItems.value = convert('General');
    }

    if (categorizedItems.value['Personal'].length) {
        personalItems.value = convert('Personal');
    }
});

function closeNotifications() {
    emit('close');
}

const changeItems = (value) => {

    notifications.value.map( item => {
        if(item.category === value) {
            item.active = true
        } else {
            item.active = false
        }
        if(value === "Personal") {
            finalItems.value = personalItems.value
        } else {
            finalItems.value = generalItems.value
        }
    });

}

</script>
<template>
    <div class="absolute left-[-40px] top-[70px]">
        <div class="ml-[40px] triangulo-up z-10"></div>
        <div class="bg-white relative rounded-lg py-4 shadow-[0_0_20px_0_rgba(77,39,37,0.25)] min-w-[390px]">
            <div class="px-4 py-2 flex items-center justify-between">
                <p class="font-medium text-[#191919]">Notificaciones</p>
                <i class="text-[#35158C] text-xs icon-book-open cursor-pointer leading-none"
                    @click="closeNotifications"></i>
            </div>
            <div class="flex items-center gap-3 px-4 py-2">

                <div v-for="(notification, index) in notifications">
                    <div v-if="notification.count > 0" class="rounded-full flex items-center gap-1 cursor-pointer" :class="[{
                        'bg-[#E50A17] px-4 py-1 text-white': notification.active,
                        'border border-[#191919] px-4 py-1 text-[#191919]': !notification.active,
                    }]" @click="changeItems(notification.category)">
                        <p class="text-xs font-bold uppercase">{{ notification.category }}</p>
                        <p class="rounded-full w-[18px] h-[18px] flex items-center justify-center" :class="[{
                            'bg-[#E50A17]': !notification.active,
                            'bg-[#fff]': notification.active,
                        }]">
                            <span class="font-medium text-sm" :class="[{
                                'text-[#E50A17]': notification.active,
                                'text-[#fff]': !notification.active,
                            }]">{{ notification.count }}</span>
                        </p>
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
                <div v-if="finalItems !== null">
                    <p v-if="finalItems[1].length > 0" class="uppercase text-[#191919] text-sm font-bold px-4 py-2 font-solano">Esta
                        semana</p>
                    <div v-for="item in finalItems[1]">
                        <div
                            class="h-[106px] flex items-center px-4 bg-[#D7E9FB] cursor-pointer gap-5 border-b border-white">
                            <span class="min-w-[16px] min-h-[16px] bg-[#E50A17] rounded-full"></span>
                            <div>
                                <p class="text-sm mb-1">{{ item.mensaje }}</p>
                                <div class="flex items-center gap-1">
                                    <div class="p-1 flex items-center gap-1 rounded cursor-pointer"
                                    :class="[{
                                        'bg-[#FFF4AA]': item.tipo === 'Mis estudios' || item.tipo === 'NUEVO',
                                        'bg-[#EFB3EF]': item.tipo === 'Pagos',
                                        'bg-[#F0B27C]': item.tipo === 'Networking',
                                        'bg-[#7AD6CF]': item.tipo === 'Beyond Wetalk',
                                        'bg-[#CEBDFF]': item.tipo === 'General',
                                    }]">
                                        <i class="text-[#554A00] text-sm"
                                        :class="[{
                                            'icon-book-open': item.tipo === 'Mis estudios' || item.tipo === 'NUEVO',
                                            'icon-creditcard': item.tipo === 'Pagos',
                                            'icon-user-chat': item.tipo === 'Networking',
                                            'icon-puzzle': item.tipo === 'Beyond Wetalk',
                                            'icon-home': item.tipo === 'General',
                                        }]"></i>
                                        <span class="text-[#554A00] text-sm leaning-none">{{ item.tipo }}</span>
                                    </div>
                                    <span class="text-[#0043AA] text-xs">•</span>
                                    <p class="text-[#0043AA] text-xs">Hace {{ item.antiguedad }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p v-if="finalItems[0].length > 0" class="uppercase text-[#191919] text-sm font-bold px-4 py-2 font-solano">
                        Anteriores</p>
                    <div v-for="item in finalItems[0]">
                        <div
                            class="h-[106px] flex items-center px-4 bg-[#D7E9FB] cursor-pointer gap-5 border-b border-white">
                            <span class="min-w-[16px] min-h-[16px] bg-[#E50A17] rounded-full"></span>
                            <div>
                                <p class="text-sm mb-1">{{ item.mensaje }}</p>
                                <div class="flex items-center gap-1">
                                    <div class="bg-[#FFF4AA] p-1 flex items-center gap-1 rounded cursor-pointer">
                                        <i class="text-[#554A00] text-sm icon-book-open"></i>
                                        <span class="text-[#554A00] text-sm leaning-none">{{ item.tipo }}</span>
                                    </div>
                                    <span class="text-[#0043AA] text-xs">•</span>
                                    <p class="text-[#0043AA] text-xs">Hace {{ item.antiguedad }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <p>No tienes notificaciones.</p>
                </div>
                <!-- <div class="h-[106px] flex items-center px-4 bg-[#D7E9FB] cursor-pointer gap-5">
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
                </div> -->
                <!-- <p class="uppercase text-[#191919] text-sm font-bold px-4 py-2 pt-5">Anteriores</p>
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
                </div> -->
            </div>
        </div>
    </div>
</template>