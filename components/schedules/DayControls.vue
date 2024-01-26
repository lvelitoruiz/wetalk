<script setup lang="ts">
defineProps<{
	activeWeek: string;
}>();
</script>
<template>
	<div class="col-span-2 flex items-center justify-center">
		<span class="font-publicSans text-sm text-white text-center uppercase">
			{{ activeWeek }}
		</span>
	</div>
</template>
