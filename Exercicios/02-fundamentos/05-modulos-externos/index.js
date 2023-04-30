const minimist = require("minimist");

const args = minimist(process.argv.slice(2));

console.log(args);

const nome = args['nome'];// Vai buscar o valor do índice nome dos argumentos
const idade = args['idade'];
const profissao = args['profissao'];

console.log(nome);
console.log(profissao);
console.log(idade);