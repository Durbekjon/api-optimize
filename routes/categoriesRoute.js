import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import Category from '../models/category.js';
const router = express.Router();

// add category

router.post('/add', authMiddleware, async (req, res) => {
	try {
		//check if category already exists
		const categoryExists = await Category.findOne({ name: req.body.name });
		if (categoryExists) {
			return res.status(200).send({ message: 'Kategoriya allaqachon mavjud', success: false });
		}
		const newCategory = new Category(req.body);
		await newCategory.save();
		return res.send({
			data: newCategory,
			message: 'Kategoriya muvaffaqiyatli qoʼshildi',
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

// get all categories
router.get('/get-all-categories', async (req, res) => {
	try {
		const categories = await Category.find({});
		res.send({
			message: 'Kategoriyalar muvaffaqiyatli olindi',
			data: categories,
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

// get category by id
router.get('/:id', async (req, res) => {
	try {
		const category = await Category.findById(req.params.id);
		return res.send({
			message: 'Kategoriya muvaffaqiyatli olindi',
			data: category,
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

//edit category by id
router.put('/:id', authMiddleware, async (req, res) => {
	try {
		const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
		return res.send({
			data: category,
			message: 'Kategoriya muvaffaqiyatli tahrirlandi',
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

//delete category by id
router.delete('/:id', authMiddleware, async (req, res) => {
	try {
		await Category.findByIdAndDelete(req.params.id);
		res.send({
			message: 'Kategoriya muvaffaqiyatli oʻchirildi',
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
