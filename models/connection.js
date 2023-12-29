import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const connection = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		career: {
			type: String,
			required: true,
		},
		image: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Image',
		},
		startedWorking: {
			type: String,
		},
		yearOfBirth: {
			type: String,
		},
		nation: {
			type: String,
		},
		educated: {
			type: String,
		},
		specialty: {
			type: String,
		},
		academicDegree: {
			type: String,
		},
		language: {
			type: String,
		},
		stateAward: {
			type: String,
		},
		membership: {
			type: String,
		},
		placeOfBirth: {
			type: String,
		},
		party: {
			type: String,
		},
		graduated: {
			type: String,
		},
		academicTitle: {
			type: String,
		},
		workActivity: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

const Connection = mongoose.model('Connection', connection);
export default Connection;
