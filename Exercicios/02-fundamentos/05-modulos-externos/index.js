const minimist = require("minimist");

const args = minimist(process.argv.slice(2));


const nome = args['nome'];// Vai buscar o valor do índice nome dos argumentos
const idade = args['idade'];
const profissao = args['profissao'];

console.log(`O nome dele é ${nome}, ele tem ${idade} anos e é ${profissao}`);