import { useMutation } from "@tanstack/react-query";
import api from "../api";

const uploadImageToServer = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    const res = await api.post('/upload', formData,
        {
            headers: { 'Content-Type': 'multipart/form-data' }
        }
    );
    return res.data;
};

export const useImageUpload = () => {
    return useMutation({
        mutationFn: uploadImageToServer,
    });
};