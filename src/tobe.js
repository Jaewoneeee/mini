// Observer Interface
class Observer {
    update(subject) {
        // To be implemented by concrete observers
    }
}

// Subject Class
class Subject {
    constructor() {
        this.observers = [];
    }

    addObserver(observer) {
        this.observers.push(observer);
    }

    removeObserver(observer) {
        this.observers = this.observers.filter((obs) => obs !== observer);
    }

    notifyObservers() {
        this.observers.forEach((observer) => observer.update(this));
    }
}

// Model Class
class EmployeeModel extends Subject {
    constructor() {
        super();
        this.employees = [
            { id: 1, name: "John Doe", position: "Manager", age: 42 },
            { id: 2, name: "Jane Smith", position: "Developer", age: 32 },
            { id: 3, name: "Sam Johnson", position: "Designer", age: 28 },
            { id: 3, name: "Sam Johnson", position: "Designer", age: 28 },
            { id: 3, name: "Sam Johnson", position: "Designer", age: 28 },
        ];
    }

    getEmployeeById(empId) {
        return this.employees.find((emp) => emp.id === empId);
    }
}

// View Class
class EmployeeView extends Observer {
    constructor() {
        super();
        this.orgList = document.getElementById("orgList");
        this.employeeInfo = document.getElementById("employeeInfo");
        this.empName = document.getElementById("empName");
        this.empPosition = document.getElementById("empPosition");
        this.empAge = document.getElementById("empAge");
    }

    init(controller) {
        this.orgList.addEventListener("click", (event) => {
            if (event.target.tagName === "LI") {
                controller.handleEmployeeClick(
                    parseInt(event.target.dataset.empId)
                );
            }
        });
    }

    displayEmployee(emp) {
        if (emp) {
            this.empName.textContent = emp.name;
            this.empPosition.textContent = emp.position;
            this.empAge.textContent = emp.age;
            this.employeeInfo.classList.remove("hidden");
        } else {
            this.employeeInfo.classList.add("hidden");
        }
    }

    addEmployeeToList(emp) {
        const li = document.createElement("li");
        li.textContent = emp.name;
        li.dataset.empId = emp.id;
        this.orgList.appendChild(li);
    }

    renderList(employees) {
        employees.forEach((emp) => this.addEmployeeToList(emp));
    }
}

// Controller Class
class EmployeeController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.init();
    }

    init() {
        const employees = this.model.employees;
        this.view.renderList(employees);
        this.view.init(this);
    }

    handleEmployeeClick(empId) {
        const employee = this.model.getEmployeeById(empId);
        this.view.displayEmployee(employee);
    }
}

// Application Initialization
const model = new EmployeeModel();
const view = new EmployeeView();
model.addObserver(view);
const controller = new EmployeeController(model, view);
