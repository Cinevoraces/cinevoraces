import { v2 } from 'cloudinary';

const cloudinaryOpts = {
    cloudinary_url: process.env.CLOUDINARY_URL,
};

const avatarOpts = {
    folder: 'cinevoraces',
    tags: 'avatar',
    width: 200,
    height: 200,
    crop: 'fill',
    gravity: 'faces',
    format: 'jpeg',
};

export const cloudinaryUpload = async (filePath: string, public_id: string) => {
    v2.config(cloudinaryOpts);

    return await v2.uploader.upload(filePath, {
        ...avatarOpts,
        public_id,
    });
};

export const cloudinaryDelete = async (publicId: string) => {
    v2.config(cloudinaryOpts);
    return await v2.uploader.destroy(publicId);
};
