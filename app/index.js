const menu = require("./menu")
const Question = require("./Question")
const clear  = require('clear');

const handleCreate = () => {
    Question.askConfigurationItem().then(v=> {
      const { name, description, version } = v;
        console.log(`
          Created:
          |
          |
          |___Name: ${name}
          |
          |___Description: ${description}
          |
          |___Version: ${version}
        `)
        setTimeout(() => {
          clear();
          menu.initialMenu(handleCreate, null);
        }, 3000);
    })
}

menu.initialMenu(handleCreate, null)

