import getFormData from './getFormData';
import SaveCloudinaryImgResponse from './models/SaveCloudinaryImgResponse';

const cloudName = import.meta.env.VITE_APP_CLOUDINARY_CLOUD_NAME;

export const saveTaskImgInCloudinary = async (selectedTaskFileImg: File) => {
  const formData = getFormData(selectedTaskFileImg);

  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    return data as SaveCloudinaryImgResponse;
  } catch (error) {
    console.log(' --- cloduinary ERROR ----');
    console.log(error);
    console.log(' --- cloduinary ERROR ----');
  }
};
