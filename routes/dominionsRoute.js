import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import Dominion from '../models/dominion.js';

const router = express.Router();

// Add a new dominion
router.post('/add', authMiddleware, async (req, res) => {
	try {
		const newDominion = new Dominion(req.body);
		const savedDominion = await newDominion.save();
		return res.status(201).json(savedDominion);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: 'Server xatosi' });
	}
});

// Get all dominions with image population
router.get('/get-all-dominions', async (req, res) => {
	try {
		const dominions = await Dominion.find().populate('image');
		return res.status(200).json(dominions);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: 'Server xatosi' });
	}
});

// Get a dominion by ID with image population
router.get('/:id', async (req, res) => {
	try {
		const dominion = await Dominion.findById(req.params.id).populate('image');
		if (!dominion) {
			return res.status(404).json({ message: 'Dominion topilmadi' });
		}
		return res.status(200).json(dominion);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: 'Server xatosi' });
	}
});

// Edit a dominion by ID
router.put('/:id', authMiddleware, async (req, res) => {
	try {
		const updatedDominion = await Dominion.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		if (!updatedDominion) {
			return res.status(404).json({ message: 'Dominion topilmadi' });
		}
		return res.status(200).json(updatedDominion);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: 'Server xatosi' });
	}
});

// Delete a dominion by ID
router.delete('/:id', authMiddleware, async (req, res) => {
	try {
		const deletedDominion = await Dominion.findByIdAndRemove(req.params.id);
		if (!deletedDominion) {
			return res.status(404).json({ message: 'Dominion topilmadi' });
		}
		return res.status(200).json({ message: "Dominion o'chirildi" });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: 'Server xatosi' });
	}
});

export default router;
