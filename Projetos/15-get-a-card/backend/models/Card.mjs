import conn from '../db/conn.mjs'

const {Schema} = conn

const Card = conn.model(
    'Card',
    new Schema(
        {
            name:{
                type: String,
                required: true
            },
            description:{
                type: String,
            },
            price:{
                type: Number
            },
            featuredImage:{
                type: Schema.Types.ObjectId,
                ref: 'Media',
                required: true
            },
            gallery:{
                type: [{ 
                    type: Schema.Types.ObjectId,
                    ref: 'Media'
                 }]
            },
            tags:{
                type: [{ type: String }]
            },
            available: {
                type: Boolean,
                required: true,
            },
            owner:{
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            },
            alchemist:{
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            },
        },{
            timestamps: true
        }
    )
)

export default Card