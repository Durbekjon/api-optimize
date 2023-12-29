import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import Connection from '../models/connection.js';

const router = express.Router();

// Add a new connection
router.post('/add', authMiddleware, async (req, res) => {
	try {
		const newConnection = new Connection(req.body);
		const savedConnection = await newConnection.save();
		return res.status(201).json(savedConnection);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: 'Server xatosi' });
	}
});

// Get all connections with image populated
router.get('/get-all-connections', async (req, res) => {
	try {
		const connections = await Connection.find().populate('image');
		return res.status(200).json(connections);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: 'Server xatosi' });
	}
});

// Get a connection by ID with image populated
router.get('/:id', async (req, res) => {
	try {
		const connection = await Connection.findById(req.params.id).populate('image');
		if (!connection) {
			return res.status(404).json({ message: 'Connection topilmadi' });
		}
		return res.status(200).json(connection);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: 'Server xatosi' });
	}
});

// Edit a connection by ID
router.put('/:id', authMiddleware, async (req, res) => {
	try {
		const updatedConnection = await Connection.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		if (!updatedConnection) {
			return res.status(404).json({ message: 'Connection topilmadi' });
		}
		return res.status(200).json(updatedConnection);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: 'Server xatosi' });
	}
});

// Delete a connection by ID
router.delete('/:id', authMiddleware, async (req, res) => {
	try {
		const deletedConnection = await Connection.findByIdAndRemove(req.params.id);
		if (!deletedConnection) {
			return res.status(404).json({ message: 'Connection topilmadi' });
		}
		return res.status(200).json({ message: "Connection o'chirildi" });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: 'Server xatosi' });
	}
});

export default router;
