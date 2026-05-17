import multer from "multer";

const upload = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Not an image! Please upload only images.'), false);
        }
    },
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB
})

export default upload