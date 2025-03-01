class Observer {
    constructor() {
        this.subscriptors = [];
    }

    subscribe(subscriptor) {
        this.subscriptors.push(subscriptor);
    }

    unsubscribe(subscriptor) {
        this.subscriptors = this.subscriptors.filter(e => e !== subscriptor);
    }

    onNotify(event, data) {
        this.subscriptors.forEach((e) => e.call(this, event, data));
    }
}

export default Observer