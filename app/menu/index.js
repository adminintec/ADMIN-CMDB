const menu = require("inquirer-menu");

const chalk = require('chalk');
const clear = require('clear');


const initialMenu = (fnCreate, fnManage) => {
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