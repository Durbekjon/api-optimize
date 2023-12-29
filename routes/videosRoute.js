import express from 'express';
import upload from '../middleware/videoMulter.js';
import Video from '../models/video.js';
import cloudinary from '../utils/cloudinary.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// upload video
router.post('/upload', authMiddleware, upload.single('file'), async (req, res) => {
	try {
		const uploadResult = await cloudinary.uploader.upload(req.file.path, {
			resource_type: 'video',
			folder: 'video',
		});

		console.log(uploadResult);

		const video = new Video({
			name: req.file.originalname,
			url: uploadResult.secure_url,
			cloudinary_id: uploadResult.public_id,
		});

		const savedVideo = await video.save();

		return res.status(200).send(savedVideo);
	} catch (err) {
		console.error(err);
		return res.status(500).send(err);
	}
});

// Delete video by ID
router.delete('/delete/:id', authMiddleware, async (req, res) => {
	try {
		const videoId = req.params.id;

		// Ma'lumotlar bazasidan videoni topish
		const video = await Video.findById(videoId);

		if (!video) {
			return res.status(404).json({ message: 'Video topilmadi' });
		}

		// Cloudinary dan videoni o'chirish
		await cloudinary.uploader.destroy(video.cloudinary_id);

		// Ma'lumotlar bazasidan videoni o'chirish
		await Video.findByIdAndRemove(videoId);

		return res.status(200).json({ message: "Video o'chirildi" });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: 'Server xatosi' });
	}
});

export default router;
