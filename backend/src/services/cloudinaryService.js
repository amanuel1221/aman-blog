const cloudinary = require("../config/cloudinaryConfig");
const streamifier = require("streamifier");



const uploadImage = (file, folder = "aman-blog/posts") => {
  return new Promise((resolve, reject) => {
    if (!file?.buffer) return resolve(null);

    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary error:", error);
          return reject(error);
        }

        resolve({
          url: result.secure_url,
          public_id: result.public_id,
        });
      }
    );

    const bufferStream = streamifier.createReadStream(file.buffer);

    bufferStream.on("error", reject);
    stream.on("error", reject);

    bufferStream.pipe(stream);
  });
};


const deleteCloudinaryImage = async (publicId) => {
  if (!publicId) return;

  await cloudinary.uploader.destroy(publicId);
};

module.exports = {
  uploadImage,
  deleteCloudinaryImage,
};