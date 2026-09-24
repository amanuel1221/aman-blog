const { uploadImage } = require("./cloudinaryService");

const uploadContentImage = async (file) => {
    if (!file) {
        throw new Error("Image file is required");
    }

    const result = await uploadImage(
        file,
        "aman-blog/content"
    );

    if (!result?.url || !result?.public_id) {
        throw new Error("Image upload failed. Please try again.");
    }

    return result;
};

module.exports = {
    uploadContentImage,
};