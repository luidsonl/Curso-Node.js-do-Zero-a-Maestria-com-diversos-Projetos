const { MongoClient } = require('mongodb')

const uri = 'mongodb://localhost:27017'

const client = new MongoClient(uri)

async function run(){
    try{
        console.log('Conectando ao MongoDB')
        await client.connect()
    }catch(err){
        console.log(err)
    }
}

run()

module.exports = client.db('bodemongo')