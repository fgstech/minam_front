export class STATUS {
    static PENDING = 0;
    static DONE = 1;
    static REJECT = 2;
    static CANCEL = 3;
    static CANCEL_BY_USER = 4;
}

export class Status {

    static getStatusColor(status) {
        switch (status) {
            case STATUS.PENDING:
                return "#007bff";
            case STATUS.DONE:
                return "#1abc9c";
            case STATUS.REJECT:
                return "#e74c3c";
            case STATUS.CANCEL:
                return "#e67e22";
            case STATUS.CANCEL_BY_USER:
                return "#f39c12";
            default:
        }
    }

    static getStatusName(status) {
        switch (status) {
            case STATUS.PENDING:
                return "Pendiente";
            case STATUS.DONE:
                return "Completado";
            case STATUS.REJECT:
                return "Perdido";
            case STATUS.CANCEL:
                return "Cancelado";
            case STATUS.CANCEL_BY_USER:
                return "Cancelado por cliente";
            default:
        }
    }
}