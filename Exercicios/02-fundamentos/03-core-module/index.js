const path = require('path');// é uma convenção chamar a variável com o mesmo nome do módulo

const extension = path.extname("arquivo.php");

console.log(extension); // vai retornar a string '.php'