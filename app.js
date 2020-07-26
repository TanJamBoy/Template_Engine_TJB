const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let employeeArr = [];

function anotherEmployee(){
    inquirer
        .prompt([
            {
                type: "list",
                message: "Do you want to add another employee?",
                name: "addEmployee",
                choices: ["Yes", "No"],
            },
        ])
        .then(e => {
            if(e.addEmployee === "Yes"){
                addEmployee();
            }else{
                writeHTML();
            };
        });
};

function addEmployee(){
    inquirer
        .prompt([
            {
                type: "list",
                message: "Do you want to add an Intern or Engineer?",
                name: "intOrEng",
                choices: ["Intern", "Engineer"],
            },
        ])
        .then(e => {
            if(e.intOrEng === "Intern"){
                addIntern();
            }else{
                addEngi();
            };
        });
};

function addIntern(){
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is the name of your intern?",
                name: "intName",
            },
            {
                type: "input",
                message: "What is the id of your intern?",
                name: "intId",
            },
            {
                type: "input",
                message: "What is the email of your intern?",
                name: "intEmail",
            },
            {
                type: "input",
                message: "What is the name of your intern's school?",
                name: "intSchool",
            },
        ])
        .then(e => {
            let newInt = new Intern(e.intName, e.intId, e.intEmail, e.intSchool);
            employeeArr.push(newInt);
            anotherEmployee();
        });
};

function addEngi(){
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is the name of your engineer?",
                name: "engiName",
            },
            {
                type: "input",
                message: "What is the id of your engineer?",
                name: "engiId",
            },
            {
                type: "input",
                message: "What is the email of your engineer?",
                name: "engiEmail",
            },
            {
                type: "input",
                message: "What is the Github username of your engineer?",
                name: "engiGit",
            },
        ])
        .then(e => {
            let newEngi = new Engineer(e.engiName, e.engiId, e.engiEmail, e.engiGit);
            employeeArr.push(newEngi);
            anotherEmployee();
        });
};

function addMana(){
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is the name of your manager?",
                name: "manaName",
            },
            {
                type: "input",
                message: `What is the id of your manager?`,
                name: "manaId",
            },
            {
                type: "input",
                message: "What is the email of your manager?",
                name: "manaEmail",
            },
            {
                type: "number",
                message: "What is the office number of your manager?",
                name: "manaOffice",
            },
        ])
        .then(e => {
            let manager = new Manager(e.manaName, e.manaId, e.manaEmail, e.manaOffice);
            employeeArr.push(manager);
            anotherEmployee();
        });
};

function writeHTML(){
    let employeeHTML = render(employeeArr);

    fs.writeFile(outputPath, employeeHTML, (err) => {
        if (err) throw err;
    });
};

addMana();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
