import conn from '../db/conn.mjs'

const {Schema} = conn

const Order = conn.model(
    'Order',
    new Schema(
        {
            pot: {
                type: Schema.Types.ObjectId,
                ref: 'Pot',
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

export default Order