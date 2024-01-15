<script setup>
defineProps({
    item: {
        type: Object,
        required: true
    }
})

</script>
<template>
   <nuxt-link :to="`/beyond/${item.id}`">
        <div class="">
            <img :src="item.imagen_principal" :alt="item.titulo" class="object-cover w-full p-[10px] rounded-[16px]" v-if="item.imagen_principal" > 
        </div>
        <div>
            <span class="bg-etiqueta">
                {{item.tipo}}
            </span>
            <h2 class="title-beyond">
                {{item.titulo}}
            </h2>
            <p class="descript-beyond">
                {{item.descripcion_corta}}
            </p>
        </div>
    </nuxt-link>

</template>

<style lang="postcss" scoped>
.bg-etiqueta {
    @apply font-zizou-regular bg-[#0065FF] text-[#FFFFFF] rounded-[4px] px-[8px] py-[4px] text-[10px];
}

.title-beyond {
    @apply font-solano text-[#0043AA] text-[16px] leading-[24px] pt-[4px]
}

.descript-beyond {
    @apply text-[12px] pt-[4px]
}
</style>