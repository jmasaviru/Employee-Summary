const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");



// Creates an empty array for the Employees to populate.
const employeeArray = [];

// Validation for name
const validateName = async (name) => {
    if (name === '') {
       return "Please enter a valid name";
    };
    return true;
 };

 // Validation for number
 const validateNumber = async (name) => {
    if (name === '') {
       return "Please enter a valid number";
    };
    return true;
 };
 
 // Validation for email
 function validateEmail(name) 
{if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(name))
  {
    return (true)
  }
    return("Please enter a valid Email Address")
}

// Welcome message for User to start building their Team
console.log("Welcome to Team Generator!");

// Quetsions asked to get information about the Manager
function askManagerQuestions() {
    
    inquirer.prompt([
        {
            type: "input",
            message: "What is your manager's name?",
            name: "name",
            validate: validateName
        },
        {
            type: "input",
            message: "What is your manager's ID?",
            name: "id",
            validate: validateNumber 
        },
        {
            type: "input",
            message: "What is your manager's email?",
            name: "email",
            validate: validateEmail
        },
        {
            type: "input",
            message: "What is your manager's office number?",
            name: "officeNumber",
            validate: validateNumber
        }
    ]).then(data => {
        let employee = new Manager(data.name, data.email, data.id, data.officeNumber);
        employeeArray.push(employee);
        createEmployee();
    });
}
// Questions asked to get information about the Engineer
function askEngineerQuestions() {

    inquirer.prompt([
        {
            type: "input",
            message: "What is your engineer's name?",
            name: "name",
            validate: validateName
        },
        {
            type: "input",
            message: "What is your engineer's id?",
            name: "id",
            validate: validateNumber
        },
        {
            type: "input",
            message: "What is your engineer's email?",
            name: "email",
            validate: validateEmail
        },
        {
            type: "input",
            message: "What is your engineer's GitHub username?",
            name: "Github",
            validate: validateName
        }
    ]).then(data =>{
        console.log(data);
        let employee = new Engineer(data.name,data.id, data.email, data.GitHub)
        employeeArray.push(employee)
        createEmployee()
    });
}
// Questions asked to get information about the Intern
function askInternQuestions() {

    inquirer.prompt([
        {
            type: "input",
            message: "What is your intern's name?",
            name: "name",
            validate: validateName
        },
        {
            type: "input",
            message: "What is your intern's id?",
            name: "id",
            validate: validateNumber
        },
        {
            type: "input",
            message: "What is your intern's email?",
            name: "email",
            validate: validateEmail 
        },
        {
            type: "input",
            message: "Please enter the name of your intern's school.",
            name: "school",
            validate: validateName
        }
    ]).then(data =>{
        console.log(data)
        let employee = new Intern(data.name, data.id, data.email, data.school)
        employeeArray.push(employee)
        createEmployee()
    });
}

// Fuction to prompt the User on which Employee they would like to add

function createEmployee() {
    inquirer.prompt([{

        type: "list",
        message: "What type of employee would you like to add?",
        choices: [
            "Manager",
            "Engineer",
            "Intern",
            "I don't want to add any more team members."
        ],

// Decides which questions to ask based on the Employee title as selected by the User
        name: "title"
    }]).then(answers => {
        if (answers.title === "Manager") {
            askManagerQuestions();
        }
        else if (answers.title === "Engineer") {
            askEngineerQuestions();
        }
        else if (answers.title === "Intern") {
            askInternQuestions();
        }
        else
            return writeHTML(employeeArray);
        
    });
}

// Function to write file
function generateTeam() {
    // Check synchronously in Node.js if the file or directory already exists in path or not.
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
    }
    // Prompt to create Employee/Team-member
    createEmployee();
    
}
function writeHTML(){
    console.log(employeeArray);
    fs.writeFileSync(outputPath, render(employeeArray), "UTF-8");
    // Success message for User to know that their Team was created
    console.log("Your team has been created!");
}

generateTeam();