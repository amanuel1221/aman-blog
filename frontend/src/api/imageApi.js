import axios from "axios";

const uploadContentImage = (file) => {
  const formData = new FormData();

  formData.append("image", file);

  return axios.post(
    `${import.meta.env.VITE_API_URL}/api/images`,
    formData,
    {
      withCredentials: true,
    }
  );
};

export { uploadContentImage };