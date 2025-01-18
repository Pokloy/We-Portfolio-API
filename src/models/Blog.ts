import mongoose from 'mongoose';
import mongooseSequence from 'mongoose-sequence'; // Import the plugin

const AutoIncrement = mongooseSequence(mongoose); // Pass the mongoose instance here

const blogSchema = new mongoose.Schema({
    blogId: {
        type: Number, // Auto-incremented ID must be a number
        unique: true,
    },
    header: {
        type: String,
        required: [true, 'Header is Required'],
    },
    picture: {
        type: String,
        required: [true, 'Picture is Required'],
    },
    content: {
        type: String,
        required: [true, 'Content is Required'],
    },
    subInfo: [
        {
            header: {
                type: String,
                required: [true, 'Header of Info is Required'],
            },
            content: {
                type: String,
                required: [true, 'Content is Required'],
            },
            year: {
                type: String,
                required: [true, 'Year is Required'],
            },
        },
    ],
});

// Apply the AutoIncrement plugin to the schema
blogSchema.plugin(AutoIncrement, { inc_field: 'blogId' });

module.exports = mongoose.model('Blog', blogSchema);