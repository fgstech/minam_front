export const getToday = () => {
    return new Date();
};

export const parseDate = (dateString) => {
    const [day, month, year] = dateString.split('-').map(Number);
    // Ajustamos el mes para que comience desde 1 (enero es 1)
    return new Date(year, month - 1, day);
};

export const getMonth = (date) => {
    return date.getMonth() + 1; // Sumar 1 para ajustar el mes de 0 a 11
};

export const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Sumar 1 para obtener el mes correcto
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};

export const isDateInRange = (date, minDate = null, maxDate = null) => {
    if (minDate && date < minDate) return false;
    if (maxDate && date > maxDate) return false;
    return true;
};

export const compareDates = (date1, date2) => {
    return (
        date1.getDate() === date2.getDate() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getFullYear() === date2.getFullYear()
    );
};

export const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
};

export const getRangeBetweenDates = (startDate, endDate) => {
    let dates = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        dates.push(new Date(currentDate));
        currentDate = addDays(currentDate, 1);
    }
    return dates;
};

export const parseTime = (timeString) => {
    const [hour, minute] = timeString.split(':');
    const date = new Date();
    date.setHours(hour);
    date.setMinutes(minute);
    return date;
};