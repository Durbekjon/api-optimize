import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import Organization from '../models/organization.js';
const router = express.Router();

// add company

router.post('/add', authMiddleware, async (req, res) => {
	try {
		//check if company already exists
		const companyExists = await Organization.findOne({ company: req.body.company });
		if (companyExists) {
			return res.status(200).send({ message: 'Tashkilot allaqachon mavjud', success: false });
		}
		const newCompany = new Organization(req.body);
		await newCompany.save();
		return res.send({
			data: newCompany,
			message: 'Tashkilot muvaffaqiyatli qoʼshildi',
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

// get all company
router.get('/get-all-companies', async (req, res) => {
	try {
		const companies = await Organization.find({});
		res.send({
			message: 'Tashkilotlar muvaffaqiyatli olindi',
			data: companies,
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

// get company by id
router.get('/:id', async (req, res) => {
	try {
		const company = await Organization.findById(req.params.id);
		return res.send({
			message: 'Tashkilot muvaffaqiyatli olindi',
			data: company,
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

//edit company by id
router.put('/:id', authMiddleware, async (req, res) => {
	try {
		const company = await Organization.findByIdAndUpdate(req.params.id, req.body, { new: true });
		return res.send({
			data: company,
			message: 'Tashkilot muvaffaqiyatli tahrirlandi',
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

//delete company by id
router.delete('/:id', authMiddleware, async (req, res) => {
	try {
		await Organization.findByIdAndDelete(req.params.id);
		res.send({
			message: 'Tashkilot muvaffaqiyatli oʻchirildi',
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
