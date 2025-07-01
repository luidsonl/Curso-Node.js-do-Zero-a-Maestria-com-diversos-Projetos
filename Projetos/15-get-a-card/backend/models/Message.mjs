import conn from '../db/conn.mjs'

const {Schema} = conn

const Message = conn.model(
    'Message',
    new Schema(
        {
            content:{
                type: String,
                
            },
            viewed:{
                type: Boolean,
            },
            sender: {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            },
            receiver: {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            },
        },{
            timestamps: true
        }
    )
)

export default Message