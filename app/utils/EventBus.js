class EventBus {
    constructor() {
        this.events = this.events || new Object();
    }
}

EventBus.prototype.emit = function (type, ...args) {
    let e;
    e = this.events[type];
    if (Array.isArray(e)) {
        for (let i = 0; i < e.length; i++) {
            e[i].apply(this, args);
        }
    } else {
        e[0].apply(this, args);
    }
};

EventBus.prototype.addListener = function (type, fun) {
    const e = this.events[type];

    if (!e) {
        this.events[type] = [fun];
    } else {
        e.push(fun);
    }
};
const eventBus = new EventBus();

export default eventBus;