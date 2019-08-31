const menu = require('inquirer-menu');
const chalk = require('chalk');
const figlet = require('figlet');
const clear = require('clear');

// TODO: Create manage menu
const initialMenu = (fnCreate, fnUpgrade, fnDeprecate, fnListAll, fnListBy) => {
  console.log(
    chalk.yellow(
      figlet.textSync('CMDB', { horizontalLayout: 'full' })
    )
  );

  const objMenu = {
    message: 'What you want to do?',
    choices: {
      Create: () => fnCreate,
      UpgradeCI: () => fnUpgrade,
      DeprecateCI: () => fnDeprecate,
      ListDependenciesByCI: () => fnListBy,
      ListAllCI: () => fnListAll,
    }
  }
  return menu(objMenu)
}


module.exports = {
  initialMenu,
}

