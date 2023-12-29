import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const news = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		images: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Image',
			},
		],
		category: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Category',
		},
		content: {
			type: String,
			required: true,
		},
		author: {
			type: String,
		},
		date: {
			type: Date,
		},
	},
	{ timestamps: true }
);

const News = mongoose.model('News', news);
export default News;
