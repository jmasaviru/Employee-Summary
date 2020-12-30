const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


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

const team = [];

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
        team.push(employee);
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
        team.push(employee)
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
        team.push(employee)
        createEmployee()
    })
}

// Fuction to prompt the User on which employee they would like to add

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

// Decides which questions to ask based on the employee title as selected by the user
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
            return writeHTML(team);
        
    })
}

//function to write file
function generateTeam() {
    // Check synchronously in Node.js if the file or directory already exists in path or not.
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
    }
    //Prompt to create Employee/Team-member
    createEmployee();
    
}
function writeHTML(){
    console.log(team);
    fs.writeFileSync(outputPath, render(team), "UTF-8");
}

generateTeam();