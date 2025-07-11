import conn from '../db/conn.mjs'

const {Schema} = conn

const Media = conn.model(
    'Media',
    new Schema(
        {
            name:{
                type: String,
                required: true
            },
            uploadedBy:{
                type: Schema.Types.ObjectId,
                ref: 'User',
                require: true
            },
            mimetype:{
                type: String,
                required: true
            },
            filePath:{
                type: String,
                required: true
            },
            size:{
                type: Number,
                validate:{
                    validator : Number.isInteger
                }
            }
        },{
            timestamps: true
        }
    )
)

export default Media;