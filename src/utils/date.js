Date.prototype.isSameDayOrBefore = function (newDate) {
    if (this.getTime() <= newDate.getTime()) {
        return true;
    } else return false
}

Date.prototype.isSameOrBefore = function (newDate) {
    if (this <= newDate) return true;
    else return false;
}

Date.prototype.isSameOrAfter = function (newDate) {
    if (this >= newDate) return true;
    else return false;
}

Date.prototype.isBefore = function (newDate) {
    if (this < newDate) return true;
    else return false;
}

Date.prototype.isAfter = function (newDate) {
    if (this > newDate) return true;
    else return false;
}

Date.prototype.isSame = function (newDate) {
    if (
        this.getFullYear() === newDate.getFullYear() &&
        this.getMonth() === newDate.getMonth() &&
        this.getDate() === newDate.getDate() &&
        this.getHours() === newDate.getHours() &&
        this.getMinutes() === newDate.getMinutes() &&
        this.getSeconds() === newDate.getSeconds()
    ) {
        return true;
    } else {
        return false;
    }
}


Date.prototype.set = function (key, value) {
    switch (key) {
        case "year":
            this.setFullYear(this.getFullYear() + parseInt(value));
            return this;
        case "month":
            this.setMonth(this.getMonth() + parseInt(value));
            return this;
        case "day":
            this.setDate(this.getDate() + parseInt(value));
            return this;
        case "hour":
            this.setHours(this.getHours() + parseInt(value));
            return this;
        case "minute":
            this.setMinutes(this.getMinutes() + parseInt(value));
            return this;
        case "second":
            this.setSeconds(this.getSeconds() + parseInt(value));
            return this;
    }
}

Date.prototype.DMYYYY = function () {
    let day = this.getDate();
    let month = this.getMonth() + 1;
    let year = this.getFullYear();
    return `${day}-${month}-${year}`
}

Date.prototype.DDMMYYYY = function () {
    let day = this.getDate();
    let month = this.getMonth() + 1;
    let year = this.getFullYear();
    return `${day > 9 ? day : `0${day}`}-${month > 9 ? month : `0${month}`}-${year}`
}

Date.prototype.YYYYMMDD = function () {
    let day = this.getDate();
    let month = this.getMonth() + 1;
    let year = this.getFullYear();
    return `${year}-${month > 9 ? month : `0${month}`}-${day > 9 ? day : `0${day}`}`
}

Date.prototype.DDMM = function () {
    let day = this.getDate();
    let month = this.getMonth() + 1;
    let year = this.getFullYear();
    return `${day > 9 ? day : `0${day}`}-${month > 9 ? month : `0${month}`}`
}

Date.prototype.HHMMSS = function () {
    let h = this.getHours();
    let m = this.getMinutes();
    let s = this.getSeconds();
    return `${h > 9 ? h : `0${h}`}:${m > 9 ? m : `0${m}`}:${s > 9 ? s : `0${s}`}`
}

Date.prototype.HHH = function () {
    let h = this.getHours();
    let m = this.getMinutes();
    let s = this.getSeconds();
    return `${h > 9 ? h : `0${h}`}:00:00`;
}

Date.prototype.getObject = function () {
    return { day: this.getDate(), month: this.getMonth() + 1, year: this.getFullYear() }
}

const months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
]

Date.prototype.getMonthName = function () {
    return months[this.getMonth()];
}

export const getDateByObject = function (obj = { day: 1, month: 1, year: 1900 }) {
    return new Date(`${obj.year}-${obj.month}-${obj.day}`);
}

// const months = [
//     'January',
//     'February',
//     'March',
//     'April',
//     'May',
//     'June',
//     'July',
//     'August',
//     'September',
//     'October',
//     'November',
//     'December'
// ]