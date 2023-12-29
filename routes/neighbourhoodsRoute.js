import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import Neighbourhood from '../models/neighbourhood.js';
const router = express.Router();

// add neighbourhood

router.post('/add', authMiddleware, async (req, res) => {
	try {
		//check if neighbourhood already exists
		const neighbourhoodExists = await Neighbourhood.findOne({
			neighbourhood: req.body.neighbourhood,
		});
		if (neighbourhoodExists) {
			return res.status(200).send({ message: 'Mahalla allaqachon mavjud', success: false });
		}
		const newNeighbourhood = new Neighbourhood(req.body);
		await newNeighbourhood.save();
		return res.send({
			data: newNeighbourhood,
			message: 'Mahalla muvaffaqiyatli qoʼshildi',
			success: true,
		});
	} catch (error) {
		res.status(500).send({
			message: error.message,
			data: error,
			success: false,
		});
	}
});

// get all neighbourhoods
router.get('/get-all-neighbourhoods', async (req, res) => {
	try {
		const neighbourhoods = await Neighbourhood.find({});
		res.send({
			message: 'Mahallalar muvaffaqiyatli olindi',
			data: neighbourhoods,
			success: true,
		});
	} catch (error) {
		res.status(500).send({
			message: error.message,
			data: error,
			success: false,
		});
	}
});

// get neighbourhood by id
router.get('/:id', async (req, res) => {
	try {
		const neighbourhood = await Neighbourhood.findById(req.params.id);
		return res.send({
			message: 'Mahalla muvaffaqiyatli olindi',
			data: neighbourhood,
			success: true,
		});
	} catch (error) {
		res.status(500).send({
			message: error.message,
			data: error,
			success: false,
		});
	}
});

//edit neighbourhood by id
router.put('/:id', authMiddleware, async (req, res) => {
	try {
		const neighbourhood = await Neighbourhood.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		return res.send({
			data: neighbourhood,
			message: 'Mahalla muvaffaqiyatli tahrirlandi',
			success: true,
		});
	} catch (error) {
		res.status(500).send({
			message: error.message,
			data: error,
			success: false,
		});
	}
});

//delete neighbourhood by id
router.delete('/:id', authMiddleware, async (req, res) => {
	try {
		await Neighbourhood.findByIdAndDelete(req.params.id);
		res.send({
			message: 'Mahalla muvaffaqiyatli oʻchirildi',
			success: true,
		});
	} catch (error) {
		res.status(500).send({
			message: error.message,
			data: error,
			success: false,
		});
	}
});
export default router;
