const fs = require('fs')

console.log('Início')

fs.writeFile('arquivo.txt', 'Escrito com writeFile()', (err)=>{
    setTimeout(()=>{
        console.log('Arquivo criado')
    }, 3000)
})

console.log('Fim')