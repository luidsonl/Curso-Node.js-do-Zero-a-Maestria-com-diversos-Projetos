import conn from '../db/conn.mjs'

const {Schema} = conn

const Card = conn.model(
    'Card',
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
            featured_image:{
                type: String
            },
            gallery:{
                type: [{ type: String }]
            },
            tags:{
                type: [{ type: String }]
            },
            available: {
                type: Boolean,
                required: true,
            },
            artisan: {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            },
            owner:{
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            }
        },{
            timestamps: true
        }
    )
)

export default Card