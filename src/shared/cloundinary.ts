/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cloudinary = require("cloudinary").v2;

// Removed hard-coded credentials because they were leaked; rotate any live keys immediately.
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImage = async function (imagePath: any) {
  let options: any = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };

  try {
    // Upload the image
    const result = await cloudinary.uploader.upload(imagePath, options);
    // const uploadPromises = imagePaths.map(async (imagePath: any) => {

    //   return result;
    // });
    return result;
  } catch (error) {
    console.error(error);
  }
};

export default uploadImage;
