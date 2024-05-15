export class Subject {
    constructor() {
        this.observers = [];
    }

    addObserver(observer) {
        // TODO: 이걸 실행했을때 그 initializeDetails()가 실행되야할듯?
        this.observers.push(observer);
    }

    removeObserver(observer) {
        this.observers = this.observers.filter((obs) => obs !== observer);
    }

    // TODO: 얘가 이제 온클릭 이벤트일때 그게 되야하네ㅇㅇ..
    notifyObservers() {
        console.log("3. Subject에서 notify 실행");
        this.observers.forEach((observer) => observer.update(this));
    }
}
