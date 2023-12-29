import mongoose from 'mongoose';

const { Schema } = mongoose;

const videoSchema = new Schema({
	name: String,
	url: String,
	cloudinary_id: String,
});

const Video = mongoose.model('Video', videoSchema);

export default Video;
