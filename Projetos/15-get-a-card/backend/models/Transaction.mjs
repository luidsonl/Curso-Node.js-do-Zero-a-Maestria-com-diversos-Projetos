import conn from '../db/conn.mjs'

const {Schema} = conn

const Transaction = conn.model(
    'Transaction',
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
            offer: {
                type: Number,
                validate: {
                    validator: Number.isInteger,
                    message: '{VALUE} não é um número inteiro'
                },
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

export default Transaction