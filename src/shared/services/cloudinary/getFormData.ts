const getFormData = (selectedTaskFileImg: File) => {
  const presetName = import.meta.env.VITE_APP_CLOUDINARY_PRESET_NAME;

  const formData = new FormData();
  formData.append('file', selectedTaskFileImg);
  formData.append('upload_preset', presetName);

  return formData;
};

export default getFormData;
