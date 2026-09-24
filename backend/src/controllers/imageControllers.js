const imageService = require("../services/imageServices");

const uploadContentImage = async (req, res) => {
    try {
        const image = await imageService.uploadContentImage(req.file);

        res.status(201).json({
            success: true,
            message: "Image uploaded successfully",
            image,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    uploadContentImage,
};