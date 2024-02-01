import { defineStore } from 'pinia';
import type { HorarioData } from './../types/cursos.types';
export const scheduleState = defineStore('scheduleState', {
  state: () => ({
    day: 0,
    filter: {} as any,
    dataStatus: false,
    selectedCourse: 'Todos',
    fullWeek: Array(7).fill({ empty: true }),
  }),
  actions: {
    setDay (payload: any) {
      this.day = payload;
    },
    setWeekCourses (payload: any) {
      payload.forEach((course: any) => {
        const index = Number(course.horario.diaNumero);
        this.fullWeek[index] = course;
      });
    },
    setFilter (payload: HorarioData[]) {
      payload?.forEach((item) => {
        item.detalleHorario.forEach((course) => {
          this.filter[course.codMateria as keyof typeof this.filter] = {
            DescEspecialCurso: course.descripMateria,
            CodCurso: course.codMateria,
          };
        });
      });
    },
    handleFilter (payload: string) {
      this.selectedCourse = payload;
    },
    setDataStatus (payload: boolean) {
      this.dataStatus = payload;
    },
  },
});
