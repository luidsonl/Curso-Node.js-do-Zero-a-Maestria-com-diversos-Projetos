import conn from '../db/conn.mjs'

const {Schema} = conn

const User = conn.model(
    'User',
    new Schema(
        {
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
            image:{
                type: Schema.Types.ObjectId,
                ref: 'Media',
                required: true,
            },
            isArtisan:{
                type: Boolean,
                default: false
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