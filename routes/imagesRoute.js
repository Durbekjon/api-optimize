import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import upload from '../middleware/multer.js';
import Image from '../models/image.js';
import cloudinary from '../utils/cloudinary.js';
const router = express.Router();
// upload image
router.post('/upload', authMiddleware, upload.single('image'), function (req, res) {
	cloudinary.uploader.upload(req.file.path, async function (err, result) {
		if (err) {
			console.log(err);
			return res.status(500).json({
				success: false,
				message: 'Error',
			});
		}

		const image = await Image.create({
			url: result.secure_url,
			public_id: result.public_id,
		});
		res.status(200).json({
			success: true,
			message: 'Uploaded!',
			data: result,
		});
	});
});

// Delete image by ID
router.delete('/delete/:id', authMiddleware, async (req, res) => {
	try {
		const imageId = req.params.id;

		// Ma'lumotlar bazasidan rasmni topish
		const image = await Image.findById(imageId);

		if (!image) {
			return res.status(404).json({ success: false, message: 'Rasm topilmadi' });
		}

		// Cloudinary dan rasmni o'chirish
		await cloudinary.uploader.destroy(image.public_id);

		// Ma'lumotlar bazasidan rasmni o'chirish
		await Image.findByIdAndRemove(imageId);

		return res.status(200).json({ success: true, message: "Rasm o'chirildi" });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ success: false, error: 'Server xatosi' });
	}
});

export default router;
