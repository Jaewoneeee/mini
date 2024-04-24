// Model
class TodoModel {
    constructor() {
        this.todos = [];
    }

    addTodo(task) {
        this.todos.push(task);
        return this.todos;
    }
}

// View
class TodoView {
    constructor() {
        this.addTaskButton = document.getElementById("add-task");
        this.newTaskInput = document.getElementById("new-task");
        this.taskList = document.getElementById("task-list");
    }

    addTaskHandler(handler) {
        this.addTaskButton.onclick = () => {
            const task = this.newTaskInput.value;
            if (task) {
                handler(task);
                this.newTaskInput.value = ""; // Clear input after adding
            }
        };
    }

    displayTodos(todos) {
        this.taskList.innerHTML = "";
        todos.forEach((task) => {
            const li = document.createElement("li");
            li.textContent = task;
            this.taskList.appendChild(li);
        });
    }
}

// Controller
class TodoController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.view.addTaskHandler(this.addTodo.bind(this));
    }

    addTodo(task) {
        const updatedTodos = this.model.addTodo(task);
        this.view.displayTodos(updatedTodos);
    }
}

// Application initialization
const app = new TodoController(new TodoModel(), new TodoView());
