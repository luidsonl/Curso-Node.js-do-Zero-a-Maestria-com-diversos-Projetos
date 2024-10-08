import conn from '../db/conn.mjs'

const {Schema} = conn

const Pot = conn.model(
    'Pot',
    new Schema(
        {
            title:{
                type: String,
                required: true
            },
            description:{
                type: String,
            },
            price:{
                type: Number,
                required: true
            },
            stock:{
                type: Number,
                required: true
            },
            featured_image:{
                type: String
            },
            gallery:{
                type: [{ type: String }]
            },
            tags:{
                type: [{ type: String }]
            },
            artisan: Object
        },{
            timestamps: true
        }
    )
)

export default Pot