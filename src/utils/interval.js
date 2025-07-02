const moment = require('moment');

var minutesOfDay = function (m) {
    return m.minutes() + m.hours() * 60;
}

export const intervalHour = (init, end, inter) => {
    return new Promise((resolve, reject) => {
        const initHour = moment({ hour: init.hour, minute: init.minute })
        const endHour = moment({ hour: end.hour, minute: end.minute })
        const interval = inter;
        const hours = [];
        var actualHour = initHour;
        const complete = () => {
            resolve(hours);
        }

        const recursive = () => {
            // minutesOfDay(actualHour) <= minutesOfDay(endHour)
            if(actualHour.isSameOrBefore(endHour)){
                hours.push(actualHour.format('HH:mm'));
                actualHour = actualHour.add(interval, 'minute');
                recursive();
            } else {
                complete();
            }
        }

        recursive();
    })
}