import conn from '../db/conn.mjs'

const {Schema} = conn

const Media = conn.model(
    'Media',
    {
        name:{
            type: String,
            required: true
        },
        uploadedBy:{
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        extension:{
            type: String,
            required: true
        },
        path:{
            type: String,
            required: true
        },
        size:{
            type: Number,
            validate:{
                validator : Number.isInteger
            }
        }
    }
)

export default Media;