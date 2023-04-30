const meuModulo = require('./meu-modulo'); // Se fosse informado apenas ('meu-modulo') a sintaxe seria de um módulo core
const soma = meuModulo.soma;// soma() também dá erro

soma(100,3);
soma(6,5);

meuModulo.soma(20,20); // Se não atribuir a uma variável antes,  pode chamar direto