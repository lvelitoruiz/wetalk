<script setup>
defineProps({
    changeView: {
        type: Function,
        required: true
    },
    active: {
        type: String,
        default: 'day'
    }
})
</script>
<template>
<div class="xl:flex items-center text-center xl:mr-8 xl:mb-0 xl:order-2">
    <!-- <span class="text-sm text-white">Ver por:</span> -->
    <div class="flex sm:w-max mx-auto text-dark-600 bg-white rounded-full p-[3px] xl:ml-4 mt-2 xl:mt-0">
        <button
            @click="changeView('day')"
            class="w-[75px] rounded-full font-solano text-[#191919]"
            :class="{'bg-primary text-white': active === 'day' }"
        >
            Día
        </button>
        <button
            @click="changeView('week')"
            class="w-[75px] rounded-full font-solano text-[#191919]"
            :class="{'bg-primary text-white': active === 'week' }"
        >
            Semana
        </button>
    </div>
</div>
</template>

<style scoped>
    .rounded-full.font-solano.bg-primary.text-white {
        padding-top: 6px;
        padding-bottom: 6px;
    }
</style>