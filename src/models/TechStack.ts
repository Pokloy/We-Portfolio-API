import mongoose from "mongoose";
import mongooseSequence from 'mongoose-sequence';

const AutoIncrement = mongooseSequence(mongoose);

const techStackSchema = new mongoose.Schema({
    techStackId: {
        type: Number,
        unique: true,
    },
    header: {
        type: String, 
        required: [true, 'Header is Required']
    },
    subHeader: {
        type: String,
        required: [true, 'Sub Header is Required']
    },
    content: {
        type: String, 
        required: [true, 'Content is Required']
    },
    picture: {
        type: String,
        required: [true, 'Picture is Required']
    }, 
    date: {
        type: String, 
        required: [true, 'Date is Required']
    }
});

techStackSchema.plugin(AutoIncrement, { inc_field: 'techStackId' })
module.exports = mongoose.model('TechStack', techStackSchema);