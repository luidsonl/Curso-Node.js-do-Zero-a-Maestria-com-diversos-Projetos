// mais de um valor
const x =10
const y = 'string'
const z = [1,2,3]

//contagem de impressões
console.count('contagem') // a impressão será contatenada com ': 1' 
console.count('contagem') // a impressão será contatenada com ': 2' e assim por diante 
console.count('contagem')
console.count('contagem')

// Interpolação de strings
nome = 'Irineu'

console.log('Olá, %s', nome)

// limpar o console após 3 segundos

setTimeout(()=>{
    console.clear()
},3000)
 
