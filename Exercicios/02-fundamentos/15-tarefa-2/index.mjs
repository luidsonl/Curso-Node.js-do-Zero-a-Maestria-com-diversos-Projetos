import inquirer from "inquirer";
import chalk from "chalk";

inquirer.prompt([
    {name :'name' , message: 'Seu nome'},
    {name :'age' , message: 'Sua idade'}
])
.then((answer)=>{
    if(!answer.name || !answer.age){
        throw new Error("Informação incompleta")
    }

    const response = `Você se chama ${answer.name} e tem ${answer.age} anos`

    console.log(chalk.bgYellow.black(response))
})
.catch((err)=>{console.log(err)})