import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const neighbourhood = new Schema(
	{
		neighbourhood: {
			type: String,
			required: true,
		},
		career: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		dateOfBirth: {
			type: String,
		},
		address: {
			type: String,
		},
		contact: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

const Neighbourhood = mongoose.model('Neighbourhood', neighbourhood);
export default Neighbourhood;
