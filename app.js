// Model
class EmployeeModel {
    constructor() {
        this.employees = [
            { id: 1, name: "John Doe", position: "Manager", age: 42 },
            { id: 2, name: "Jane Smith", position: "Developer", age: 32 },
            { id: 3, name: "Sam Johnson", position: "Designer", age: 28 },
        ];
    }

    getEmployeeById(empId) {
        return this.employees.find((emp) => emp.id === empId);
    }
}

// View
class EmployeeView {
    constructor() {
        this.orgList = document.getElementById("orgList");
        this.employeeInfo = document.getElementById("employeeInfo");
        this.empName = document.getElementById("empName");
        this.empPosition = document.getElementById("empPosition");
        this.empAge = document.getElementById("empAge");
    }

    init(controller) {
        this.orgList.addEventListener("click", (event) => {
            if (event.target.tagName === "LI") {
                controller.handleEmployeeClick(parseInt(event.target.dataset.empId));
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

// Controller
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
const app = new EmployeeController(new EmployeeModel(), new EmployeeView());
