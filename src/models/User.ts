import mongoose from "mongoose";
import mongooseSequence from 'mongoose-sequence';

const AutoIncrement = mongooseSequence(mongoose);

const userSchema = new mongoose.Schema({
    userId: {
        type: Number, // Auto-incremented ID must be a number
        unique: true,
    }, 
    username:{
		type: String,
		required: [true, 'Email is Required']	
	},
	password: {
		type: String,
		required: [true, 'Password is Required']	
	},
});

// Apply the AutoIncrement plugin to the schema
userSchema.plugin(AutoIncrement, { inc_field: 'userId' });

module.exports = mongoose.model('Users', userSchema);