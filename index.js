const inq = require("inquirer");

const fs = require("fs");

const Manager = require("./lib/Subclasses/Manager");
const Engineer = require("./lib/Subclasses/Engineer");
const Intern = require("./lib/Subclasses/Intern");

let team = [];

const EmployeeQs = [
    {
        type: "input",
        name: "name",
        message: "Input the employee's name:",
    },
    {
        type: "input",
        name: "id",
        message: "Input the employee's id:",
    },
    {
        type: "input",
        name: "email",
        message: "Input the employee's email:",
    },
    {
        type: "list",
        name: "role",
        message: "Choose this employee's role:",
        choices: ["Manager", "Engineer", "Intern"],
    },
]

function addEmployee() {
    inq.prompt(EmployeeQs).then(data1 => {

        if (data1.role === "Manager") {
            inq.prompt({
                type: "input",
                name: "officeNumber",
                message: "Input the manager's office number:",
            }).then(data2 => {
                team.push(new Manager(data1.name, data1.id, data1.email, data2.officeNumber));
                init();
            });
        }

        if (data1.role === "Engineer") {
            inq.prompt({
                type: "input",
                name: "github",
                message: "Input the engineer's GitHub username:",
            }).then(data2 => {
                team.push(new Engineer(data1.name, data1.id, data1.email, data2.github));
                init();
            })
        }

        if (data1.role === "Intern") {
            inq.prompt({
                type: "input",
                name: "school",
                message: "Input the intern's school:",
            }).then(data2 => {
                team.push(new Intern(data1.name, data1.id, data1.email, data2.school));
                init();
            })
        }
    })

}

function init() {
    inq.prompt({
        type: "list",
        name: "nextAction",
        choices: ["Add another employee", "Finish"],
    }).then(choice => {
        switch (choice.nextAction) {
            case "Add another employee":
                addEmployee();
                break;

            case "Finish":
                console.log(team);
                fs.writeFile("team.html", `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-uWxY/CJNBR+1zjPWmfnSnVxwRheevXITnMqoEIeG1LJrdI0GlVs/9cVSyPYXdcSF" crossorigin="anonymous">
                    <title>My Team</title>
                </head>
                <body class="bg-dark">
                    <div class="row m-4">
                        <h1 class="text-center text-success">My Team</h1>
                    </div>
                    <div class="row m-4 text-success">
                    <pre>${JSON.stringify(team)}</pre>
                    </div>
                    </body>
                </html>
                `, err => console.log(err))
                break;
        }
    });
}

addEmployee();