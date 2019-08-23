const inquirer = require("inquirer");

const askConfigurationItem = () => {
const question = [

    {
        name: "name",
        type: "input",
        message: "What's the name of the Configuration Item?"
    },

    {
        name: "version",
        type: "input",
        message: "What's the current version?"
    },

    {
        name: "description",
        type: "input",
        message: "What's the description of this CI?"
    }
]

return inquirer.prompt(question)

}

module.exports = {
    askConfigurationItem
}