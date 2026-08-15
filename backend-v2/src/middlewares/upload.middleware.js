import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const uniqueFileName = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueFileName + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Only images are accepted."), false);
    }
};

export const upload = multer({ storage, fileFilter }); 