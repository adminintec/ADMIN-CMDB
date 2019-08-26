const inquirer = require('inquirer');
const clear = require('clear');

const { isValidVersionFormat, getUpdatedData } = require("../Utils");

const askConfigurationDetail = () => {
  const questions = [
    /* Pass your questions in here */
    {
      name: 'name',
      type: 'input',
      message: 'Enter the name of the configuration item.',
      validate: (value) => {
        if (!value) {
          return 'Enter a valid value.';
        }
        return true;
      }
    },
    {
      name: 'description',
      type: 'input',
      message: 'Enter the description of the configuration item.',
      validate: (value) => {
        if (!value) {
          return 'Enter a valid value.';
        }
        return true;
      }
    },
    {
      name: 'version',
      type: 'input',
      message: 'Enter the version of the configuration item.',
      validate: (value) => {
        if (isValidVersionFormat(value)) {
          return true;
        } else {
          return "Please enter a valid version format #.#.#";
        }
      },
    },
    {
      name: 'dependencies',
      type: 'confirm',
      message: 'Add dependencies?',
    },
  ];
  clear();
  return inquirer.prompt(questions);
};

const askDependencies = (data) => {
  const choicesDependencies = Object.values(data).map((dt, index) => {
    return `${index} ${dt.name}`
  })
  const questions = [
    /* Pass your questions in here */
    {
      name: 'dependenciesSelected',
      type: 'checkbox',
      message: 'Select dependencies',
      choices: choicesDependencies,

    },
  ];
  clear();
  return inquirer.prompt(questions);
}

const askToSelectOneDependencies = (data) => {
  const choicesDependencies = Object.values(data).map((dt, index) => {
    return `${index} ${dt.name}`
  })
  const questions = [
    /* Pass your questions in here */
    {
      name: 'dependenciesSelected',
      type: 'list',
      message: 'Select what dependencies you want to work with?',
      choices: choicesDependencies,

    },
  ];
  return inquirer.prompt(questions);
}

const askWhatTypeOfVersionWant = () => {
  const versionUpdateType = ["Major", "Minor", "Patch"]
  const questions = [
    /* Pass your questions in here */
    {
      name: 'typeVersion',
      type: 'list',
      message: 'Select what type of version you want?',
      choices: versionUpdateType,
    },
    {
      name: 'numberVersion',
      type: 'input',
      message: 'What is the number of the new version?',
      validate: (value) => {
        if (value.match(/[0-9]/)) {
          return true;
        }
        return 'Enter a numer'
      }
    },
  ];
  return inquirer.prompt(questions);
}


module.exports = {
  askConfigurationDetail,
  askDependencies,
  askToSelectOneDependencies,
  askWhatTypeOfVersionWant
}
