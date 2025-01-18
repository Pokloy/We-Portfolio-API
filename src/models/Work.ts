import mongoose from 'mongoose';
import mongooseSequence from 'mongoose-sequence';

const AutoIncrement = mongooseSequence(mongoose);

const workSchema = new mongoose.Schema({
    workId: {
        type: Number,
        unique:true,
    },
    type: {
        type: String,
        required: [true, 'Type is Required'],
        enum: {
            values: ['UX', 'Dynamic Web', 'Static Web'],
            message: '{VALUE} is not a valid type',
        },
    },
    header: {
        type: String, 
        required: [true, 'header is Required'],
    },
    subHeader: {
        type: String, 
        required: [true, 'sub header is Required'],
    },
    picture: {
        type: String, 
        required: [true, 'picture is Required'],
    },
    subInformation: [
        {
            client: {
                type: String,
                required: [true, 'client is Required'],
            },
            worktype: {
                type: String,
                required: [true, 'work type is Required'],
            }, 
            date: {
                type: String,
                required: [true, 'date is Required'],
            },
        },
    ],
});

workSchema.plugin(AutoIncrement, { inc_field: 'workId' });

module.exports = mongoose.model('Work', workSchema);