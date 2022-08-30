const multer = require("multer");

const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

/**
 * @description Upload photo with multer.
 * @author      Harrsh Patel <me@harrsh.com>
 * @accept      JPEG or PNG photos of size lesser than 5MB.
 */
const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
    fileFilter,
});

module.exports = upload;
