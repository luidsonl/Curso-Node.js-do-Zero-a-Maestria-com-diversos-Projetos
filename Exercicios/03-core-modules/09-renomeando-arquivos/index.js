const fs = require('fs')

const nomeAntigo = 'arquivo.txt'
const nomeNovo = 'novo.txt'

fs.rename(nomeAntigo, nomeNovo, (err)=>{
    
    if(err){
        console.log(err)
        return
    }
    
    console.log('%s renomeado para %s',nomeAntigo, nomeNovo)
})