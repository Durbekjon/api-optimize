import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const media = new Schema(
	{
		link: {
			type: String,
		},
		video: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Video',
		},
		description: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

const Media = mongoose.model('Media', media);
export default Media;
