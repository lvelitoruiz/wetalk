<script setup>
import { breakpointsTailwind, useBreakpoints, useNow, useWindowSize } from '@vueuse/core';
import { useScroll } from '@vueuse/core';
import { getFullname } from '~~/utils/setFormatName';

const props = defineProps({
    data: {
        type: Array,
        default: []
    },
    allCourses: Object,
    selectedCourse: {
        type: String,
    },
    filter: {
        type: String,
        default: 'Todos'
    },
    displayed: Object,
    hours: Object,
    handleChange: Function
});

console.log('this is the data: ',props.allCourses);

const earlierCourse = ref(Infinity);
const store = scheduleState();
const listP = store.sessions;
const datesList = ref(null);
const coursesCalendar = ref(null);
const listHours = ref(null);
const { y } = useScroll(coursesCalendar);
const breakpoints = useBreakpoints(breakpointsTailwind);
const smallerThanLg = breakpoints.smaller('lg');
const now = ref(new Date());
const nowMark = useNow();

console.log(store);

// Horarios con cursos activos
if(Object.keys(props.allCourses).length === 0 || earlierCourse.value === Infinity) {
    props.data.forEach(item => {
        item.ListaDTOHorarioAlumnoDet.forEach(course => {
            props.allCourses[course.CodCurso] = { 
                state: true, 
                DescEspecialCurso: course.DescEspecialCurso, 
                CodCurso: course.CodCurso
            };
            const hourInit = getHour(course.HoraInicioSesion);
            earlierCourse.value = Math.min(earlierCourse.value, hourInit);
        });
    });
}

const getDiff = (init, fin) => {
    return ((getHour(fin)+(getMinutes(fin)/60)) - (getHour(init)+(getMinutes(init)/60)))
}

const getTopAndHeight = (init, fin) => {
    const hCard = smallerThanLg.value ? 62 : 55;
    const height = getDiff(init, fin) * (hCard-0.5);
    let top = 0;
    Object.keys(props.hours).sort().forEach(item => {
        if(Number(item) < getHour(init)) {
            top = top + hCard;
        }
    });

    if(getMinutes(init)/60 > 0) top = top + 40,5;
    return {
        top: `${top + 10}px`,
        height: `${height}px`
    }
}

const isRepeated = (session, name, lastname) => {
    const professors = listP[session].docentes;
    if(professors.length === 0) return true;
    const fullname = getFullname(name, lastname)
    return professors.indexOf(fullname) === 0;
}

const sessionDate = (val) => {
    const today = new Date();
    return new Date(today.setDate(today.getDate() - today.getDay() + val + 1)).getDate()
}

const calendarDay = (num) => {
    if(num === 0) return 6;
    else return num - 1;
}

const heightBox = ref(smallerThanLg.value ? 62 : 55);

const getTopStyle = (inicioTime) => {
    const date = getnowMarkour(inicioTime);
    return `${(Number(date) - 7) * heightBox.value + 10}px`;
}

onMounted(() => {
    y.value = (getnowMarkour(now.value) - 8) * 56.5;

    coursesCalendar.value.addEventListener('scroll', () => { 
        let scrollXVal = coursesCalendar.value.scrollLeft; 
        let scrollYVal = coursesCalendar.value.scrollTop;
        datesList.value.scrollLeft = scrollXVal;
        listHours.value.scrollTop = scrollYVal;
    });
})
</script>

<template>
    <div class="flex flex-col px-2 lg:py-5 bg-white">
        <div class="datesList" ref="datesList">
            <div v-for="(_, day) in new Array(7)" :key="day"
                class="dateList-item"
                :class="{'border-b-[1px] border-neutral-400': y > 10}"            
            >
                <p v-if="smallerThanLg" class="dateList-item-text lg:mr-1">{{ getDayName(day, true).slice(0,1) }}</p>
                <p v-else class="dateList-item-text lg:mr-1">{{ getDayName(day, true) }}</p>
                <p class="dateList-item-text"
                    :class="{'isToday': day === calendarDay(getDay(new Date()))}"
                >
                    {{ sessionDate(day) }}
                </p>
            </div>
        </div>
        <div class="calendar-container">
            <!-- horas -->
            <div class="hours-container relative" ref="listHours">
                <div class="h-[10px] border-r-[1px] border-b-[1px] border-neutral-400"></div>
                <div class="hour-mark"
                    :style="{
                        top: getTopStyle(nowMark),
                    }"
                >
                    {{ getHourMinutes(`${nowMark}`) }}
                </div>
                <div v-for="(hour, i) in Object.keys(hours).sort()" :key="hour"
                    class="relative border-r-[1px] border-neutral-400"
                    :class="{'h-[62px] lg:h-[55px] border-b-[1px]': i !== Object.keys(hours).length - 1}"
                >
                    <div class="leading-[1] text-xs lg:text-sm absolute top-[-10px] lg:top-[-10px] bg-white pr-1 w-[40px] lg:w-full">
                        {{ hour }}:00
                    </div>
                </div>
                <div class="lg:h-[5px]"></div>
            </div>
            <div class="calendar-grid scroll-horario-sch relative" ref="coursesCalendar">
                <div v-for="(item, ix) in store.fullWeek" :key="item" class="relative">
                    <div class="lg:absolute lg:top-0 w-full h-full ">
                        <div class="h-[10px] border-r-[1px] border-b-[1px] border-neutral-400"></div>
                        <!-- cuadros horas -->
                        <template v-for="(hour, i) in Object.keys(hours).sort()" :key="hour">
                            <div class="grid-box h-[62px] lg:h-[55px] relative" v-if="i !== Object.keys(hours).length - 1">
                                <div v-if="Number(hour) === getHour(nowMark)"
                                    class="absolute top-[10px] h-[1px] w-full z-10"
                                    :class="{
                                        'bg-primary-100': ix !== calendarDay(getDay(new Date())),
                                        'mark-today': ix === calendarDay(getDay(new Date()))
                                    }"
                                    :style="{top:`${heightBox/60 * getMinutes(nowMark) - 1}px`}"
                                ></div>
                            </div>
                        </template>
                        <div class="lg:h-[5px]"></div>
                    </div>
                    <!-- card -->
                    <template v-if="!item?.empty">
                        <template v-for="(course, i) in item.ListaDTOHorarioAlumnoDet" :key="i">
                            {{
                                console.log(course)
                            }}
                            <ScheduleCardContainer
                                :course="course"
                                :selectedCourse="selectedCourse"
                                :isRepeated="isRepeated"
                                :getTopAndHeight="getTopAndHeight"
                                :allCourses="allCourses"
                                :positionX="ix"
                            />
                        </template>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="postcss" scoped>
    .datesList {
        @apply ml-[45px] lg:ml-[55px] grid grid-cols-weekly pt-6 overflow-hidden lg:mr-2 relative;
    }

    .dateList-item {
        @apply flex flex-col lg:flex-col items-center justify-center pb-6;
    }
    .dateList-item-text {
        @apply font-solano text-xl text-center;
    }
    .isToday {
        @apply text-white bg-primary h-[29px] w-[29px] rounded-full;
    }
    .calendar-container {
        @apply relative grid grid-cols-[45px_1fr] lg:grid-cols-[55px_1fr] w-full bg-white;
    }
    .hours-container {
        @apply mb-[25px] lg:pl-1 overflow-hidden;
    }
    .calendar-grid {
        @apply grid grid-cols-weekly;
    }
    .grid-box {
        @apply border-r-[1px] border-b-[1px] border-neutral-400;
    }

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
        @apply absolute left-0 z-10 top-[50%] translate-y-[-50%] bg-primary-100 rounded-sm px-1 lg:px-2 py-[1px] text-xs
        after:absolute after:content-[''] after:h-[1px] after:bg-primary-100 after:w-full after:top-[50%] after:translate-y-[-50%];
    }

    .mark-today {
        @apply bg-primary after:content-[''] after:absolute after:h-[5px] after:w-[5px]
        after:rounded after:bg-primary after:top-0 after:translate-y-[-2px];
    }

    .line {
        @apply absolute h-[1.2px] bg-primary-100 z-10;
    }

    .limit {
        @apply relative after:absolute after:left-[0px] after:content-[''] after:w-[1px] after:h-full after:bg-neutral-400;
    }
</style>