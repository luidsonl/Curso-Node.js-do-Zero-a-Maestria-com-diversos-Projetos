import mongoose from "mongoose"

const conn = mongoose

async function main(){
    await conn.connect('mongodb://localhost:27017/getapot')
    console.log('Successful connection')
}

main().catch((e)=>console.log(e))

export default conn