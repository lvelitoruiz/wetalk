<script setup lang="ts">
const props = withDefaults(
	defineProps<{
		hours: { [key: string]: number };
		hour: string;
		nowMark: Date;
		rowNumber: number;
		columnNumber: number;
		currentDay: number;
	}>(),
	{
		hour: '55',
		rowNumber: 0,
		columnNumber: 0,
		currentDay: 1,
	},
);
const currentHour = computed(() =>
	props.nowMark.getHours() < 7 ? 7 : props.nowMark.getHours(),
);
const positionFromTop = computed(() =>
	props.nowMark.getHours() < 7
		? '-1px'
		: `${(72 / 60) * props.nowMark.getMinutes() - 1}px`,
);
</script>

<template>
	<div
		v-if="rowNumber !== Object.keys(hours!).length - 1"
		class="grid-box h-[72px] relative"
	>
		<div
			v-if="columnNumber === 0 && Number(hour) === currentHour"
			class="hour-mark top-[10px]"
			:style="{
				top: positionFromTop,
			}"
		>
			{{ getHourMinutes(props.nowMark) }}
		</div>
		<div
			v-if="Number(hour) === currentHour"
			class="absolute top-[10px] h-[1px] w-full z-[15]"
			:class="{
				'bg-[#A9616D]': columnNumber !== currentDay,
				'mark-today': columnNumber === currentDay,
			}"
			:style="{
				top: positionFromTop,
			}"
		></div>
	</div>
</template>

<style lang="postcss" scoped>
.grid-box {
	@apply border-r-[1px] border-b-[1px] border-[#A6A6A6];
}

.hour-mark {
	@apply absolute right-[calc(100%_+_1px)] z-20 translate-y-[-50%] bg-[#FEB6C2] text-[#A9616D] rounded-sm px-1 py-[1px] text-xs font-bold;
}

.mark-today {
	@apply bg-[#A9616D] after:content-[''] after:absolute after:h-[5px] after:w-[5px]
	after:rounded after:bg-[#A9616D] after:top-0 after:translate-y-[-2px];
}
</style>
