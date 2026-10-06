const crypto = require("crypto");
const path = require("path");
const multer = require("multer");
const AppError = require("../errors/AppError");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/resumeDocuments");
    },

    filename: (req, file, cb) => {
        const fileExtension = path.extname(file.originalname).toLowerCase();
        const generatedName = `${Date.now()}-${crypto.randomUUID()}${fileExtension}`;

        cb(null, generatedName);
    }
});

// Fichiers autorisés
const allowed = [
    "image/jpeg",
    "image/png",
    "image/webp"
];

const fileChecker = (req, file, cb) => {
    if (!allowed.includes(file.mimetype)) {
        throw new AppError(
            415,
            `UNSUPPORTED_MEDIA`,
            `Invalid type of file. Accepted file: jpeg, png or webp`
        );
    }

    cb(null, true);
}


const uploadFile = multer({
    storage,
    fileChecker,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5 Mo
    },
});

module.exports = uploadFile;