const fs = require('fs')

if(!fs.existsSync('./minhapasta')){
    console.log('Diretório não existe')
    fs.mkdirSync('./minhapasta')
}else{
    console.log('Diretório existe')
}