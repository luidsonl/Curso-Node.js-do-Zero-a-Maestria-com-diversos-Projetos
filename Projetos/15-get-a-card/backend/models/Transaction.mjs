import conn from '../db/conn.mjs'

const {Schema} = conn

const Transaction = conn.model(
    'Transaction',
    new Schema(
        {
            card: {
                type: Schema.Types.ObjectId,
                ref: 'Card',
                required: true,
            },
            seller: {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            },
            buyer: {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            },
        },{
            timestamps: true
        }
    )
)

export default Transaction