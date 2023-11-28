export const getDate = (date) => new Date(date).toLocaleDateString();
export const getDay = (date) => new Date(date).getDay();
export const getDateNum = (date) => new Date(date).getDate();
export const getHour = (date) => new Date(date).getHours();
export const getTime = (date) => new Date(date).getTime();
export const getMinutes = (date) => {
    const minutes = new Date(date).getMinutes();
    return minutes < 10 ? `0${minutes}` : `${minutes}`;
};
export const getHourMinutes = (date) => `${getHour(date)}:${getMinutes(date)}`;

export const getDateState = (date) => new Date() > new Date(date);
export const valiDate = (date) => {
    if(date.length === 19) return date;
    return `${date.slice(0, 11)}0${date.slice(11)}`
}
export const dayDescription = (inicioTime) => {
    return new Date(inicioTime).toLocaleDateString("es-es", {
      month: "long",
      day: "numeric",
    });
}
export const dayDescriptionDay = (inicioTime) => {
    let day = new Date(inicioTime);
    return `${dayDescription(inicioTime)}, ${day.getFullYear()}`
}

export const getAbbrDate = (date) => {
    return `${new Date(date).toLocaleDateString('es-ES', { weekday: 'short', month: 'short', day: 'numeric'})}`;
}
export const getFullTime = (date) => {
    return `${new Date(date).toLocaleTimeString([], {timeStyle: 'short', hour12: true})}`;
}

export const modalidadActual = (modalidad) => {
    if(modalidad === 'AC'){
      return 'Pregrado'
    }else {
      return 'EPE'
    } 
}

export const typePost = (type)=> {
    if(type == 'noticias' ) return 'Noticia'
    if(type == 'comunicados' ) return 'Comunicado'
    if(type == 'novedades' ) return 'Novedad'
}

export const getInitAndEndOfWeek = () => {
    const today = new Date();
    const first = new Date(today.setDate(today.getDate() - today.getDay() + 1)).toLocaleDateString().split('/').reverse().join('-');
    const last = new Date(today.setDate(today.getDate() - today.getDay() + 7)).toLocaleDateString().split('/').reverse().join('-');
    return { first, last }
}

export const eventCLayer = (action, nameContent, locationView) => {
    if(dataLayer){
        const slashAction = action === 'BarraLateral' ? '' : '/' 
        dataLayer.push({
            event: 'Click-'+ action,
            'content-name': slashAction + nameContent,
            'content-view-name':  nameContent,
            'location': locationView
        })
    }
}

export const getDayName = (numDay, short = false) => {
    const dayNames = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    const dayNamesShort = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'];
    if(short) return dayNamesShort[numDay];
    return dayNames[numDay];
}

export const getnowMarkour = (time) => {
    return getHour(time) + time.getMinutes()/60;
}