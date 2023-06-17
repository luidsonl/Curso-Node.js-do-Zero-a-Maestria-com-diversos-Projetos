import Sequelize from 'sequelize'
import db_conf from '../db_conf.mjs'

const sequelize = new Sequelize(
    ...db_conf
)

try{
    sequelize.authenticate()
    console.log('Conexão feita com sucesso')

} catch(err){
    console.log('Erro na conexão', err)
}

export default sequelize