const menu = require("inquirer-menu");
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet')

// TODO: Create manage menu, ask for Upgrade and Deprecate 
const initialMenu = (fnCreate, fnManage) => {
  clear()
  console.log(chalk.yellow(
    figlet.textSync('CMDB', { horizontalLayout: 'full' })
  ));
    const objMenu =  {
        message: 'What do you want to do, human being?',
        choices: {
          Create: () => fnCreate,
          Manage: () => fnManage
        }
      }
      return menu(objMenu)
}

module.exports = {
    initialMenu
}