import conn from '../db/conn.mjs'

const {Schema} = conn

const User = conn.model(
    'User',
    new Schema(
        {
            status: {
                type: String,
                enum: ['active', 'inactive', 'pending', 'banned'],
                default: 'pending'
            },
            role:{
                type: String,
                enum: ['regular', 'super'],
                default: 'regular'
            },
            name:{
                type: String,
                required: true
            },
            email:{
                type: String,
                required: true
            },
            password:{
                type: String,
                required: true
            },
            profilePicture:{
                type: Schema.Types.ObjectId,
                ref: 'Media'
            },
            alchemy:{
                type: Number,
                default: 0,
                validate:{
                    validator : Number.isInteger
                }
            },
            phone:{
                type: String
            }
        },{
            timestamps: true
        }
    )
)

export default User