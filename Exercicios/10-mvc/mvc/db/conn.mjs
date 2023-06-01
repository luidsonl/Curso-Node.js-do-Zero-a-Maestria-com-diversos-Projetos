import { Sequelize } from 'sequelize'
import connection from './connection.mjs'


const sequelize = new Sequelize(
    ...connection
)

try{

    sequelize.authenticate()

    console.log('Conexão feita com sucesso!')

}catch(err){
    console.log('Não foi possível conectar ao banco de dados', err)
}

export default sequelize