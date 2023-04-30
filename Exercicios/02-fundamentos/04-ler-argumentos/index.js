console.log(process.argv);

const args = process.argv.slice(2);
/**Cria um novo array chamado args que contém somente os argumentos passados para o programa a partir do 
 * terceiro elemento da matriz process.argv, que são os argumentos de linha de comando fornecidos ao 
 * processo Node.js. */

console.log(args);

const value1 = args[0].split("=")[1];
/**Obtém o valor da parte direita de uma string que contém um sinal de igual ("=") na primeira posição do 
 * primeiro elemento do array args e o atribui à variável value. */
const value2 = args[1].split("=")[1]; // Pega o valor do segundo argumento

console.log(value1);
console.log(value2);