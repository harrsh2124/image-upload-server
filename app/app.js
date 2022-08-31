const compression = require("compression");
const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const upload = require("./middleware/multer");
const cloudinary = require("./utils/cloudinary.config");
const { env } = require("./utils/env");

const { json, urlencoded } = express;
const app = express();
const PORT = env.app.port;

app.use(json());
app.disable("x-powered-by");

app.use(
    urlencoded({
        extended: false,
    })
);
app.use(cors());
app.use(helmet());
app.use(compression());

app.get("/", async (req, res) => {
    return res.status(200).json({
        status: true,
        message: "Server is up and running!",
    });
});

app.post("/upload", upload.single("profilePhotoFile"), async (req, res) => {
    try {
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "image-uploader",
            });
            return res.status(200).json({
                status: true,
                message: "Photo added!",
                data: {
                    public_id: result.public_id,
                    secure_url: result.secure_url,
                },
            });
        }
        return res.status(400).json({
            status: true,
            message: "Photo not added.",
        });
    } catch (error) {
        console.log(error.message);

        return res.status(500).json({
            status: false,
            message: "Internal server error.",
        });
    }
});

app.get("/delete", async (req, res) => {
    try {
        const public_ids = [];
        const images = (
            await cloudinary.api.resources({
                prefix: "image-uploader",
                type: "upload",
            })
        ).resources;

        const today = new Date().getTime();

        for (const image of images) {
            const createdAt = new Date(image.created_at).getTime();
            if (createdAt + 1 * 24 * 60 * 60 * 1000 < today) {
                public_ids.push(image.public_id);
            }
        }

        let deletedImages = {};
        if (public_ids.length)
            deletedImages = await cloudinary.api.delete_resources(public_ids, {
                public_ids: public_ids,
            });

        return res.status(200).json({
            status: true,
            message: "Photo deleted successfully.",
            data: {
                deletedImages,
            },
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            status: false,
            message: "Internal server error.",
        });
    }
});

app.listen(PORT, () => console.log(`App listening at port ${PORT}...`));

module.exports = () => app;
