<script setup>

const props = defineProps({
    links: Array,
})

</script>

<template>
    <div class="flex flex-col gap-4 border-b border-[#BFBFBF] pb-7">
        <FastLink v-for="link in links" :link="link.link" :has-code="link.hasCode" :label="link.label"
            :label-code="link.labelCode" :code="link.code" />
    </div>
</template>