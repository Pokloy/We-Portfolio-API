import mongoose from 'mongoose';
import mongooseSequence from 'mongoose-sequence'; 

const AutoIncrement = mongooseSequence(mongoose); 

const toolsSchema = new mongoose.Schema({
    toolsId: {
        type: Number,
        unique: true,
    },
    header: {
        type: String, 
        required: [true, 'header is Required'],
    },
    subHeader: {
        type: String, 
        required: [true, 'sub header is Required'],
    },
    content: {
        type: String, 
        required: [true, 'content is Required'],
    },
    picture: {
        type: String, 
        required: [true, 'picture is Required'],
    },
    date: {
        type: String, 
        required: [true, 'date is Required'],
    },
});

toolsSchema.plugin(AutoIncrement, { inc_field: 'toolsId' });

module.exports = mongoose.model('Tools', toolsSchema);