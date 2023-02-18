import { useState, useCallback } from 'react';
import { uploadImage } from '../utils/axios/image.axios';
const useUploadImage = (): [boolean, (images: File[]) => Promise<string[]>] => {
    const [isLoading, setIsLoading] = useState(false);

    const handleUpload = useCallback(
        async (images: File[]) => {
            setIsLoading(true);
            const formData = new FormData();
            const imagesUrl = [];
            for (const image of images) {
                try {
                    formData.append('file', image);
                    formData.append(
                        'upload_preset',
                        process.env.NEXT_PUBLIC_UPLOAD_NAME as string
                    );
                    const url = await uploadImage(formData);
                    imagesUrl.push(url);
                } catch (error) {
                    console.log(error);
                }
            }
            setIsLoading(false);
            return imagesUrl;
        },
        [isLoading]
    );

    return [isLoading, handleUpload];
};

export default useUploadImage;
