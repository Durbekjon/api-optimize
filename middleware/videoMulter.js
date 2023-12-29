import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
	let ext = path.extname(file.originalname);
	if (ext !== '.mp4' && ext !== '.mkv' && ext !== '.jpeg' && ext !== '.jpg' && ext !== '.png') {
		cb(new Error('File type is not supported'), false);
		return;
	}
	cb(null, true);
};

const upload = multer({ storage, fileFilter });

export default upload;
