// Subject (Observable)
class EventManager {
    constructor() {
        this.listeners = [];
    }

    subscribe(listener) {
        this.listeners.push(listener);
    }

    unsubscribe(listener) {
        this.listeners = this.listeners.filter((l) => l !== listener);
    }

    notify(data) {
        this.listeners.forEach((listener) => listener.update(data));
    }
}

// Observer
class EventListener {
    constructor(name) {
        this.name = name;
    }

    update(data) {
        console.log(`${this.name} received: ${data}`);
    }
}

// Creating subjects and observers
const eventManager = new EventManager();
const listener1 = new EventListener("Listener 1");
const listener2 = new EventListener("Listener 2");

// Subscribing observers to the subject
eventManager.subscribe(listener1);
eventManager.subscribe(listener2);

// EventManager notifying observers
document.getElementById("notifyObservers").addEventListener("click", () => {
    eventManager.notify("Hello Observers!");
});

// Unsubscribing the first observer
document.getElementById("unsubscribeFirst").addEventListener("click", () => {
    eventManager.unsubscribe(listener1);
    console.log("First observer unsubscribed.");
});

// Notifying after the unsubscribe
document.getElementById("secondNotification").addEventListener("click", () => {
    eventManager.notify("Second Event");
});
