const { initializeTasks, createTaskElement } = require('./app');


const tasks = [
    {
        title: "Task 1",
        description: "Description 1",
        assignee: "Assignee 1",
        status: "To Do"
    },
    {
        title: "Task 2",
        description: "Description 2",
        assignee: "Assignee 2",
        status: "In Progress"
    }
];


describe("initializeTasks function", () => {
    
    test("should render tasks correctly", () => {
   
        document.body.innerHTML = `
            <div id="todo"></div>
            <div id="in-progress"></div>
            <div id="done"></div>
        `;
        
   
        initializeTasks(tasks);


        expect(document.querySelectorAll("#todo .task").length).toBe(1); // Check for task 1
        expect(document.querySelectorAll("#in-progress .task").length).toBe(1); // Check for task 2
    });
});
