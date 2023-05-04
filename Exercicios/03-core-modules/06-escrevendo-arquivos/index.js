const http = require('http')
const fs = require('fs')
const url = require('url')

const port = 3000

const server = http.createServer((req, res)=>{

    const urlInfo = url.parse(req.url, true)
    /** Essa linha de código está utilizando o módulo url do Node.js para fazer o parsing (análise) da URL presente na requisição HTTP representada pela variável req.url.
        O método url.parse() é utilizado para extrair informações relevantes da URL, como o nome do protocolo, o nome do host, a porta, a query string e outros. O segundo argumento true indica que a query string será convertida em um objeto JavaScript.
        O resultado do parsing é armazenado na variável urlInfo, que será um objeto contendo as informações extraídas da URL. Isso permite que essas informações sejam utilizadas posteriormente na lógica do programa para determinar como lidar com a requisição.*/

    const name = urlInfo.query.name

    if(!name){
        fs.readFile('mensagem.html', (err,data)=>{
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.write(data)
            return res.end()
        })
    }else{
        fs.writeFile("arquivo.txt", name, (err, data)=>{
            res.writeHead(302,{
                Location: '/',
            })
            return res.end()
        })
    }
})

server.listen(port,()=>{
    console.log('Servidor rodando na porta: %s', port)
})