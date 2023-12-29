import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const organization = new Schema(
	{
		company: {
			type: String,
			required: true,
		},
		address: {
			type: String,
		},
		officeTel: {
			type: String,
		},
		leader: {
			type: String,
		},
		telOne: {
			type: String,
		},
		deputyLeader: {
			type: String,
		},
		telTwo: {
			type: String,
		},
		headMaster: {
			type: String,
		},
		methodist: {
			type: String,
		},
		manager: {
			type: String,
		},
		deputyManager: {
			type: String,
		},
		chief: {
			type: String,
		},
		Director: {
			type: String,
		},
		deputyForEducation: {
			type: String,
		},
		headEngineer: {
			type: String,
		},
		headSpecialist: {
			type: String,
		},
		leadingExpert: {
			type: String,
		},
		departmentHead: {
			type: String,
		},
		organizationTel: {
			type: String,
		},
		headAdviser: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

const Organization = mongoose.model('Organization', organization);
export default Organization;
