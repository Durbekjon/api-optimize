import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import Education from '../models/education.js';

const router = express.Router();

// Add a new education
router.post('/add', authMiddleware, async (req, res) => {
	try {
		const newEducation = new Education(req.body);
		const savedEducation = await newEducation.save();
		return res.status(201).json(savedEducation);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: 'Server xatosi' });
	}
});

// Get all educations
router.get('/get-all-educations', async (req, res) => {
	try {
		const educations = await Education.find().populate('image');
		return res.status(200).json(educations);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: 'Server xatosi' });
	}
});

// Get an education by ID
router.get('/:id', async (req, res) => {
	try {
		const education = await Education.findById(req.params.id).populate('image');
		if (!education) {
			return res.status(404).json({ message: 'Education topilmadi' });
		}
		return res.status(200).json(education);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: 'Server xatosi' });
	}
});

// Edit an education by ID
router.put('/:id', authMiddleware, async (req, res) => {
	try {
		const updatedEducation = await Education.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		if (!updatedEducation) {
			return res.status(404).json({ message: 'Education topilmadi' });
		}
		return res.status(200).json(updatedEducation);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: 'Server xatosi' });
	}
});

// Delete an education by ID
router.delete('/:id', authMiddleware, async (req, res) => {
	try {
		const deletedEducation = await Education.findByIdAndRemove(req.params.id);
		if (!deletedEducation) {
			return res.status(404).json({ message: 'Education topilmadi' });
		}
		return res.status(200).json({ message: "Education o'chirildi" });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: 'Server xatosi' });
	}
});

export default router;
