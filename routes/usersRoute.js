import bcrypt from 'bcryptjs';
import express from 'express';
import jwt from 'jsonwebtoken';
import authMiddleware from '../middleware/authMiddleware.js';
import User from '../models/user.js';
const router = express.Router();

// user registration

router.post('/register', async (req, res) => {
	try {
		//check if user already exists
		const userExists = await User.findOne({ email: req.body.email });
		if (userExists) {
			return res.status(200).send({ message: 'Foydalanuvchi allaqachon mavjud', success: false });
		}

		//hash password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(req.body.password, salt);
		req.body.password = hashedPassword;

		//create new user
		const newUser = new User(req.body);
		await newUser.save();
		res.send({
			message: 'Foydalanuvchi muvaffaqiyatli yaratildi',
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

// user login

router.post('/login', async (req, res) => {
	try {
		//check if user exists
		const user = await User.findOne({ email: req.body.email });
		if (!user) {
			return res.status(200).send({ message: 'Foydalanuvchi mavjud emas', success: false });
		}

		// check password
		const validPassword = await bcrypt.compare(req.body.password, user.password);
		if (!validPassword) {
			return res.status(200).send({ message: 'Yaroqsiz parol', success: false });
		}

		const token = jwt.sign(
			{
				userId: user._id,
			},
			process.env.JWT_SECRET,
			{ expiresIn: '1d' }
		);

		res.send({
			message: 'Foydalanuvchi muvaffaqiyatli tizimga kirdi',
			success: true,
			data: token,
		});
	} catch (error) {
		res.status(500).send({
			message: error.message,
			data: error,
			success: false,
		});
	}
});

//get user info

router.post('/get-user-info', authMiddleware, async (req, res) => {
	try {
		const user = await User.findById(req.body.userId);
		res.send({
			message: 'Foydalanuvchi maʼlumotlari muvaffaqiyatli olindi',
			success: true,
			data: user,
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
