const multer = require('multer');
const path =require('path')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './src/uploads/images/');
    },
    filename: function(req, file, cb) {
        const originalName = file.originalname.replace(/\s/g, '_'); // Replace spaces with underscores
        cb(null, originalName);
    }
});

const fileFilter = function(req, file, cb) {
    // Accept only certain file types
    const allowedFileTypes = ['image/jpeg', 'image/png', 'application/pdf', 'video/mp4']; // Add more file types as needed
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type'));
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10 MB file size limit
    },
    fileFilter: fileFilter
});




module.exports = upload;