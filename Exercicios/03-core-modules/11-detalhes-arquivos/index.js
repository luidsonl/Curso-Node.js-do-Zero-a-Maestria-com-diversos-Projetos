const fs = require('fs')

fs.stat('arquivo.txt', (err, stats)=>{
    if(err){
        console.log(err)
        return
    }
    console.log('arquivo.txt')
    console.log(stats.isFile())
    console.log(stats.isDirectory())
    console.log(stats.isSymbolicLink())
    console.log(stats.size)
    console.log(stats.ctime)
})

fs.stat('pasta', (err, stats)=>{
    if(err){
        console.log(err)
        return
    }
    console.log('pasta')
    console.log(stats.isFile())
    console.log(stats.isDirectory())
    console.log(stats.isSymbolicLink())
    console.log(stats.size)
    console.log(stats.ctime)
})