import getFormData from './getFormData';
import SaveCloudinaryImgResponse from './models/SaveCloudinaryImgResponse';

export const saveTaskImgInCloudinary = async (selectedTaskFileImg: File) => {
  const cloudName = import.meta.env.VITE_APP_CLOUDINARY_CLOUD_NAME;

  const formData = getFormData(selectedTaskFileImg);

  console.log({ cloudNameExists: cloudName ? true : false });

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
