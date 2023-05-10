// módulos externos
import inquirer from "inquirer";
import chalk from "chalk";

//módulos internos
import fs from 'fs';

//main
operation()

//Funções
//Menu principal
function operation(){
    inquirer.prompt([{
        type: 'list',
        name: 'action',
        message: 'O que você deseja fazer?',
        choices: [
            'Criar Conta',
            'Consultar Saldo',
            'Depositar',
            'Sacar',
            'Sair'
        ]
    }])
    .then((answer)=>{
        const action = answer['action']

        if(action === 'Criar Conta'){
            createAccount()

        }else if(action === 'Consultar Saldo'){
            getAccountBalance()

        }else if(action === 'Depositar'){
            addTransation('deposit')

        }else if(action === 'Sacar'){
            addTransation('withdraw')

        }else if(action === 'Sair'){
            console.log(chalk.blue('Até logo!'))
            process.exit()
        }
    })
    .catch((err)=>{console.log(err)})
}
// create account
function createAccount(){
    console.log(chalk.green('Obrigado por usar o nosso banco!'))
    console.log(chalk.green('Vamos configurar a sua conta:'))

    buildAccount()
}

function buildAccount(){
    inquirer
    .prompt([
        {
            name:'accountName',
            message: 'Digite um nome para a sua conta:',
        }
    ])
    .then((answer)=>{
        const accountName = answer['accountName']

        if (!fs.existsSync('accounts')) {
            fs.mkdir('accounts', (err) => {
                if (err) {
                    console.error('Erro ao criar o diretório "accounts":', err);
                    return
                }
                console.log('O diretório "accounts" foi criado com sucesso.');
            });
        }
        if(accountExists(accountName)){
            console.log(chalk.red('Este nome já é usado, tente novamente!'))
            return buildAccount()// Loop recursivo
        }
        fs.writeFileSync(
            `accounts/${accountName}.json`, 
            '{"balance": 0}',
            (err)=>{
                console.log(err)
            }
        )

        console.log(chalk.green('Parabéns, sua conta foi criada!'))
        operation()
          
    })
    .catch((err)=>console.log(err))
}

//Execute a transaction(deposit or withdraw)
function addTransation(action){
    let mensagem = ''

    if (action ==='deposit'){
        mensagem ='Informe o valor do depósito'
    } else if(action ==='withdraw'){
        mensagem ='Informe o valor que será sacado'
    }

    inquirer
    .prompt([
        {
            name: 'accountName',
            message:'Informe o nome da conta'
        }
    ])
    .then((answer)=>{
        const accountName = answer['accountName']

        if(!accountExists(accountName)){
            console.log(chalk.red('Conta não encontrada, tente novamente'))
            return addTransation(action)
        }

        inquirer
        .prompt([
            {
                name: 'amount',
                message: mensagem
            }
        ])
        .then((answer)=>{
            const amount = answer['amount']

            if(!processTransaction(accountName, amount, action)){
                return addTransation(action)
            }

            operation()
        })
        .catch((err)=>{
            console.log(err)
        })
    })
    .catch((err)=>{
        console.log(err)
    })

}

function processTransaction(accountName, amount, action){
    const accountData = getAccount(accountName)
    if(amount){
        let mensagem = ''

        if(action ==='deposit'){
            accountData.balance += parseFloat(amount)
            mensagem = `Depósito de R$ ${amount} feito com sucesso!`

        }else if(action ==='withdraw'){
            accountData.balance -= parseFloat(amount)
            if(accountData.balance < amount){
                console.log(chalk.red('Valor indisponível'))
                return true
            }
            mensagem = `Saque de R$ ${amount} feito com sucesso!`

        }else{
            console.log('Erro na validação do tipo de transação')
            return false
        }

        fs.writeFileSync(
            `accounts/${accountName}.json`,
            JSON.stringify(accountData),
            (err)=>console.log(err)
            )
        console.log(chalk.green(mensagem))
        return true


    }else{
        console.log(chalk.red('Ocorreu um erro, tente novamente.'))
        return false
    }
}

function getAccount(accountName){
    const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
        encoding: 'utf-8',
        flag: 'r'
    })
    
    return JSON.parse(accountJSON)
}
//show account balance
function getAccountBalance(){
    inquirer
    .prompt([
        {
            name:'accountName',
            message:'Informe o nome da sua conta.'
        }
    ])
    .then((answer)=>{
        const accountName = answer['accountName']

        if(!accountExists(accountName)){
            console.log(chalk.red('Conta não encontrada, tente novamente.'))
            return getAccountBalance()
        }
        const accountData = getAccount(accountName)

        console.log(chalk.green(`Olá, ${accountName}, o saldo da sua conta é de R$ ${accountData.balance}`))

        operation()
    })
    .catch(err => console.log(err))
}


// verify account existence
function accountExists(accountName){
    if(fs.existsSync(`accounts/${accountName}.json`)){
        return true
    }else{
        return false
    }
}