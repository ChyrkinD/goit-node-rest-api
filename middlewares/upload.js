import path from 'node:path';

import multer from 'multer';

import HttpError from '../helpers/HttpError.js';

const destination = path.resolve('temp');

const storage = multer.diskStorage({
    destination,
    filename: (req, file, cb) => {
        const uniquePrefix = `${Date.now()}_${Math.random() * 1e9}`;
        const filename = `${uniquePrefix}_${file.originalname}`;
        cb(null, filename);
    },
});

const limits = {
    fileSize: 1024 * 1024 * 10,
};

const fileFilter = (req, file, cb) => {
    const exstention = file.originalname.split('.').pop();
    if (exstention === 'exe') {
        return cb(HttpError(400, '.exe file not allow'));
    }
    cb(null, true);
};

const upload = multer({
    storage,
    limits,
    fileFilter,
});

export default upload;
