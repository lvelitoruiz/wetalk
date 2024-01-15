<script setup>
defineProps({
    item: {
        type: Object,
        required: true
    }
})

</script>
<template>
   <div>
        <nuxt-link v-if="!item.url_externa" :to="`/beyond/${item.id}`">
            <div class="">
                <img v-if="item.imagen_principal" :src="item.imagen_principal" :alt="item.titulo" class="object-cover w-full p-[10px] rounded-[16px]"> 
            </div>
            <div>
                <span v-if="item.categoria" class="bg-etiqueta">
                    {{item.categoria}}
                </span>
                <h2 v-if="item.titulo" class="title-beyond">
                    {{item.titulo}}
                </h2>
                <p v-if="item.descripcion_corta" class="descript-beyond">
                    {{item.descripcion_corta}}
                </p>
            </div>
        </nuxt-link>
        <a v-else :href="item.url_externa" target="_blank" rel="noopener noreferrer">
            <div class="">
                <img v-if="item.imagen_principal" :src="item.imagen_principal" :alt="item.titulo" class="object-cover w-full p-[10px] rounded-[16px]"> 
            </div>
            <div>
                <span v-if="item.categoria" class="bg-etiqueta">
                    {{item.categoria}}
                </span>
                <h2 v-if="item.titulo" class="title-beyond">
                    {{item.titulo}}
                </h2>
                <p v-if="item.descripcion_corta" class="descript-beyond">
                    {{item.descripcion_corta}}
                </p>
            </div>
        </a>
   </div>
</template>

<style lang="postcss" scoped>
.bg-etiqueta {
    @apply font-zizou-regular bg-[#0065FF] text-[#FFFFFF] rounded-[4px] px-[8px] py-[4px] text-[10px];
}

.title-beyond {
    @apply font-solano text-[#0043AA] text-[16px] leading-[24px] pt-[4px];
}

.descript-beyond {
    @apply text-[12px] pt-[4px];
}
</style>