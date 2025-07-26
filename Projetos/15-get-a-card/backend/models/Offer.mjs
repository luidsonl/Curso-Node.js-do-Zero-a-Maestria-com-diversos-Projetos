import conn from '../db/conn.mjs'

const {Schema} = conn

const Offer = conn.model(
    'Offer',
    new Schema(
        {
            status: {
                type: String,
                enum: ['open', 'expired', 'executed', 'canceled'],
                required: true,
                default: 'open'
            },
            card: {
                type: Schema.Types.ObjectId,
                ref: 'Card',
                required: true,
            },
            price: {
                type: Number,
                validate: {
                    validator: Number.isInteger,
                    message: '{VALUE} não é um número inteiro'
                },
                required: true,
                min: 0
            },
            due:{
                type: Date
            },
            seller: {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            },
            buyer: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
        },{
            timestamps: true
        }
    )
)

export default Offer