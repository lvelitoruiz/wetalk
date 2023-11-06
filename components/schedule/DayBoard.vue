<script setup>
const props = defineProps({
    filter: {
        type: String,
        default: 'Todos'
    }
});
const coursesCalendar = ref(null);
const coursesToday = ref(null);
const { y } = useScroll(coursesCalendar);
const now = ref(new Date());

const data = scheduleState();
const hours = [
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24"
];

const isToday = (today) => today === 0 ? 6 : getDay(today) - 1;

onMounted(() => {
    const nowScroll = getnowMarkour(now.value);
    y.value = (nowScroll - 8) * 61.5;
});

watchEffect(async () => {
    coursesToday.value = data.coursesSelectedDay('Todos').length;
});
</script>

<template>
    <div class="px-3 lg:px-4 pt-[20px] pb-[36px] bg-white">
        <p class="mb-3"
            :class="{
                'lg:mb-8': !data.coursesListDay?.empty,
            }"
        >
            <span class="text-lg font-bold" v-if="data.day === isToday(new Date())">
                HOY
            </span>
            <span class="capitalize text-lg font-bold">{{ getDayName(data.day) }}</span>
            <p>Tienes {{ coursesToday }} {{ coursesToday.length >= 2 ? "clases hoy" : "clase hoy" }}.</p>
        </p>
        <div ref="coursesCalendar" class="flex pr-3 lg:pr-4"
            :class="{'scroll-horario-sch': !data.coursesListDay?.empty}"
        >
            <div v-if="!data.coursesListDay?.empty" class="hidden lg:block">
                <div v-for="(hour, i) in hours" :key="hour">
                    <div  class="leading-[1] lg:pr-3 text-[14px]"
                        :class="{'h-[60px]': i !== hours.length - 1}"
                    >
                        {{ hour }}:00
                    </div>
                </div>
            </div>
            <div class="relative w-full mt-[12px]">
                <template v-if="!data.coursesListDay?.empty">
                    <ScheduleDayBoardGrid 
                        :coursesCalendar="coursesCalendar" 
                        :filter="filter"
                    />
                </template>
                <div v-else class="flex flex-col items-center justify-center">
                    <NuxtIcon filled class="text-[52px] mb-[10px] bg-[#FFFFFF] rounded-full px-[20px] pt-[20px] pb-[13px]" name="noData" />
                    <p v-if="data.day === isToday(new Date())" class="font-bold text-center leading-[1.2] mb-1">No tienes cursos asignados para hoy</p>
                    <p v-if="data.day !== isToday(new Date())" class="font-bold text-center leading-[1.2] mb-1">No tienes cursos asignados este día</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="postcss" scoped>
.scroll-horario-sch {
    @apply overflow-x-auto lg:overflow-y-hidden;
    scrollbar-color: rgba(0, 0, 0, .5) rgba(0, 0, 0, 0);
}

.scroll-horario-sch::-webkit-scrollbar {
    border-radius: 10px;  
    background-color: #D9D9D9;
    width: 8px;
    height: 8px; /* horizontal scrollbar height */
    -webkit-appearance: none;
}
.scroll-horario-sch::-webkit-scrollbar {
    transform: translateY(-20px);
}
.scroll-horario-sch::-webkit-scrollbar-button {
    height: 20px; /* vertical scrollbar height */
}
.scroll-horario-sch::-webkit-scrollbar:vertical {
    width:8px;
}
.scroll-horario-sch::-webkit-scrollbar-button {
    display: none;
} 
.scroll-horario-sch::-webkit-scrollbar-thumb {
    position: absolute;
    right: -20px;
    background-color: #A999C6;
    border-radius: 20px;
}
.scroll-horario-sch::-webkit-scrollbar-track {
    border-radius: 10px;  
}

.hour-mark {
    @apply hidden lg:block absolute left-[-55px] z-10 bg-primary-100 rounded-sm px-2 py-[1px] text-sm;
}

.line {
    @apply absolute h-[1.2px] left-full top-[50%] translate-y-[-50%] bg-primary-100
}

.limit {
    @apply relative after:absolute after:left-[10px] after:content-[''] after:w-[1px] after:h-full after:bg-neutral-400;
}
</style>