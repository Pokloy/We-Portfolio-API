import mongoose from 'mongoose';
import mongooseSequence from 'mongoose-sequence'; // Import the plugin

const AutoIncrement = mongooseSequence(mongoose); // Pass the mongoose instance here

const jobSchema = new mongoose.Schema({
    jobsId: {
        type: Number,
        unique: true,
    },
    timeline: {
        type: String,
        required: [true, 'Job Experience Header of Info is Required'],
    },
    company: {
        type: String,
        required: [true, 'Job Experience Company of Info is Required'],
    }
});

jobSchema.plugin(AutoIncrement, { inc_field: 'jobsId' });

module.exports = mongoose.model('Jobs', jobSchema);