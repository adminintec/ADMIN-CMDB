const inquirer = require("inquirer");
const utils = require('../Utils');

const { isValidVersionFormat } = utils;

const askConfigurationItem = () => {
const question = [

    {
      name: "name",
      type: "input",
      message: "What's the name of the Configuration Item?",
      validate: (value) => {
        if (!value) {
          return 'Enter a valid value.';
        }
        return true;
      }
    },
    {
      name: "description",
      type: "input",
      message: "What's the description of this CI?",
      validate: (value) => {
        if (!value) {
          return 'Enter a valid value.';
        }
        return true;
      }
    },
    {
      name: "version",
      type: "input",
      message: "What's the current version?",
      validate: (value) => {
        if(isValidVersionFormat(value)){
          return true;
        }
        return "Please enter a valid version format #.#.#";
      }
    },
]

return inquirer.prompt(question)

}


const manageConfigurationItem = () => {
    const question = [
        {
          name: "name",
          type: "input",
          message: "What Configuration Item do you want to upgrade?",
          validate: (value) => {
            if (!value) {
              return 'Enter a valid value.';
            }
            return true;
          }
        },
        {
          name: "type",
          type: "input",
          message: "What's the type of upgrade (Major *.0.0, Minor 0.*.0 or Patch 0.0.*?",
          validate: (value) => {
            if (!value) {
              return 'Enter a valid value.';
            }
            return true;
          }
        },
        {
          name: "version",
          type: "input",
          message: "What's the current version?",
          validate: (value) => {
            if(isValidVersionFormat(value)){
              return true;
            }
            return "Please enter a valid version format #.#.#";
          }
        },
    ]
    
    return inquirer.prompt(question)
    
}

module.exports = {
    askConfigurationItem,
    manageConfigurationItem
}

