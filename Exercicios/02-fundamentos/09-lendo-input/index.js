const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
})

readline.question('Qual a sua linguagem preferida?\n', (language)=>{
    console.log('Sua linguagem preferida é %s', language)

    if(language.toLowerCase() != 'python'){
        console.log('Mas python é melhor')
    }
    readline.close()
})