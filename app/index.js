const menu = require("./menu")
const Question = require("./Question")

const handleCreate = () => {

    Question.askConfigurationItem().then(v=> {

        console.log(v)
    })
}

menu.initialMenu(handleCreate, null)

