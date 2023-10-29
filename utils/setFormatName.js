export const getFullname = (str1, str2) => {
    let names = Boolean(str1) ? str1 : '';
    let lastname = Boolean(str2) ? str2 : '';
    if(!Boolean(names) || !Boolean(lastname)) return `${names}${lastname}`;
    
    const index = names.indexOf(' ');
    if(index === -1) return names + ' ' + lastname;
    else return names.slice(0, index) + ' ' + lastname;
}