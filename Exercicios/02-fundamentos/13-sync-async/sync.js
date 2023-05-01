const fs = require('fs')

console.log('Início')

fs.writeFileSync('arquivo.txt', 'Escrito com writeFileSync()')

console.log('Fim')