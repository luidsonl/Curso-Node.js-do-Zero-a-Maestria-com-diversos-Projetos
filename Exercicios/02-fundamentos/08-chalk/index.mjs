//const chalk = require('chalk') não funciona na versão atual
// também foi necessário mudar a extensão do arquivo para .mjs

import chalk from 'chalk';

const nota = 6

if(nota >= 7){
    console.log(chalk.green('Você foi aprovado, parabéns!'))
}else{
    console.log(chalk.bgRed.bold('Você foi reprovado.'))
}

