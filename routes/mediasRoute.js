import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import Media from '../models/media.js';
const router = express.Router();

// Add a new media
router.post('/add', authMiddleware, async (req, res) => {
	try {
		const { link, video, description } = req.body;

		if ((!link && !video) || (link && video)) {
			return res.status(400).json({ error: 'Faqat link yoki video kiritishingiz kerak' });
		}

		const newMedia = new Media({ link, video, description });
		const savedMedia = await newMedia.save();
		return res.status(201).json(savedMedia);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: 'Server xatosi' });
	}
});

// Get all medias
router.get('/get-all-medias', async (req, res) => {
	try {
		const medias = await Media.find().populate('video');
		return res.status(200).json(medias);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: 'Server xatosi' });
	}
});

// Get a media by ID
router.get('/:id', async (req, res) => {
	try {
		const media = await Media.findById(req.params.id).populate('video');
		if (!media) {
			return res.status(404).json({ message: 'Media topilmadi' });
		}
		return res.status(200).json(media);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: 'Server xatosi' });
	}
});

// Edit a media by ID
router.put('/:id', authMiddleware, async (req, res) => {
	try {
		const updatedMedia = await Media.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		if (!updatedMedia) {
			return res.status(404).json({ message: 'Media topilmadi' });
		}
		return res.status(200).json(updatedMedia);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: 'Server xatosi' });
	}
});

// Delete a media by ID
router.delete('/:id', authMiddleware, async (req, res) => {
	try {
		const deletedMedia = await Media.findByIdAndRemove(req.params.id);
		if (!deletedMedia) {
			return res.status(404).json({ message: 'Media topilmadi' });
		}
		return res.status(200).json({ message: "Media o'chirildi" });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: 'Server xatosi' });
	}
});

export default router;
