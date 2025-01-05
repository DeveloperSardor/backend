import { model, Schema, Types } from 'mongoose';


const ArticlesSchema = new Schema({
    title_en : {
        type : String
    },
    title_ru : {
        type : String
    },
    title_uz : {
        type : String
    },
    desc_en : {
        type : String
    },
    desc_ru : {
        type : String
    },
    desc_uz : {
        type : String
    },
    img : {
        type : String
    }
})


export default model('Articles', ArticlesSchema);