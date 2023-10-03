<script setup>

import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

const $toast = useToast();

const props = defineProps({
    label: String,
    labelCode: String,
    code: String,
    link: String,
    hasCode: Boolean,
})

const copyToClipboard = () => {
    if (!navigator.clipboard) {
        $toast.open({
            message: "No se puede copiar en tu navegador.",
            typeof: "error",
        });
        return;
    }
    navigator.clipboard.writeText(props.code)
        .then(() => {
            $toast.open({
                message: "Código Copiado!!!",
                typeof: "success",
            });
        })
        .catch(err => {
            $toast.open({
                message: "Error al copiar código",
                typeof: "error",
            });
        });
};

</script>
<template>
    <div class="relative w-full h-auto">
        <NuxtLink class="fastLink" :class="{ 'rounded-bl-none': hasCode }" to="#">
            <span class="fastLink-label">{{ label }}</span>
            <i class="icon-arrow-right text-white"></i>
        </NuxtLink>
        <div v-if="hasCode" class="fastLink-code">
            <span class="fastLink-code__label">{{ labelCode }}</span>
            <div class="fastLink-code__activeZone" @click="copyToClipboard">
                <span class="fastLink-code__activeZone--label">{{ code }}</span>
                <i class="text-[#404040] text-xs icon-file-copy"></i>
            </div>
        </div>
    </div>
</template>