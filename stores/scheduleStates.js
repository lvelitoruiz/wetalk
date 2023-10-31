import { defineStore } from 'pinia';
import { getFullname } from '~/utils/setFormatName';
export const scheduleState = defineStore('scheduleState', {
    state: () => ({
        coursesListDay: null,
        day: 0,
        sessions: null,
        sessionDaily: null,
        fullWeek: Array(7).fill({ empty: true }),
        earlierCourseDay: Infinity,
        dayFilter: {}
    }),
    persist: {
        storage: persistedState.localStorage,
    },
    getters: {
        coursesSelectedDay(state) {
            return (filter = 'Todos') => {
                if (filter === 'Todos') return state.coursesListDay?.ListaDTOHorarioAlumnoDet;
                return state.coursesListDay?.ListaDTOHorarioAlumnoDet.filter(item => item.CodCurso === filter);
            }
        },
    },
    actions: {
        changeDay(val) {
            this.day = this.day + val;
        },
        setcoursesListDay(payload) {
            this.coursesListDay = payload;
            if (Boolean(payload?.ListaDTOHorarioAlumnoDet)) {
                let earlierCourse = Infinity;
                let dayFilter = {};
                payload.ListaDTOHorarioAlumnoDet.forEach(course => {
                    const hourInit = getHour(course.HoraInicioSesion);
                    earlierCourse = Math.min(earlierCourse, hourInit);

                    dayFilter[course.CodCurso] = {
                        state: true,
                        DescEspecialCurso: course.DescEspecialCurso,
                        CodCurso: course.CodCurso
                    };
                });
                this.dayFilter = dayFilter;
                this.earlierCourseDay = earlierCourse;
            }
        },
        setDay(payload) {
            this.day = payload === 0 ? 6 : payload - 1;
        },
        setSessions(payload) {
            const hashCourses = {};
            payload.forEach(day => {
                day.ListaDTOHorarioAlumnoDet.forEach(course => {
                    const fullname = getFullname(course.NombresImag, course.ApePatImag);
                    if (!hashCourses[course.IdSesion]) {
                        hashCourses[course.IdSesion] = { docentes: Boolean(fullname) ? [fullname] : [] };
                    } else {
                        hashCourses[course.IdSesion].docentes = hashCourses[course.IdSesion].docentes.concat(fullname);
                    }
                })
            });
            this.sessions = hashCourses;
        },
        setSessionDaily(payload) {
            const hashCourses = {};
            payload.ListaDTOHorarioAlumnoDet.forEach((course, i) => {
                if (!Boolean(hashCourses[course.IdSesion]?.exists)) {
                    hashCourses[course.IdSesion] = { exists: true, id: i };
                }
            });
            this.sessionDaily = hashCourses;
        },
        setWeekCourses(payload) {
            payload.forEach(course => {
                const index = getDay(course.DTOHorarioAlumnoCab.FechaSesion);
                if (index === 0) this.fullWeek[6] = course;
                else this.fullWeek[index - 1] = course;
            })
        }
    }
});