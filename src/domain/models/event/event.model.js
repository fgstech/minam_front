import { Status } from "../../../insfrastructure/helpers/status/status.helper";


// { id: 1, title: 'Cita con Dr. López', date: '2024-09-28T10:00:00', duration: 60, resourceId: '1', color: "#1abc9c", desc: "Servicio 1" },

class Event {
    constructor(id, title, desc, date, duration, resourceId, isBlocked = false, status = 0) {
        this.id = id;
        this.title = title;
        this.desc = desc;
        this.date = date;
        this.duration = duration;
        this.resourceId = resourceId;
        this.status = status;
        this.isBlocked = isBlocked;
        this.color = Status.getStatusColor(status);
        this.statusName = Status.getStatusName(status);
    }

    toMap() {
        return {
            id: this.id,
            title: this.title,
            desc: this.desc,
            date: this.date,
            duration: this.duration,
            resourceId: this.resourceId,
            isBlocked: this.isBlocked,
            status: this.status,
            color: this.color,
            statusName: this.statusName,
        };
    }


    static fromMap({ _id, serviceName, clientName, date, duration, profesionalId, isBlocked, status }) {
        return new Event(_id, serviceName, clientName, new Date(date), duration, profesionalId, isBlocked, status);
    }
}


export default Event;