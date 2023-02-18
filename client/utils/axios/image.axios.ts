import axios, { AxiosError } from 'axios';
export const uploadImage = (formData: FormData) => {
    return new Promise<string>(async (resolve, reject) => {
        try {
            const res = await axios({
                method: 'Post',
                data: formData,
                url: process.env.NEXT_PUBLIC_CLOUD_URL,
            });
            const resData = res.data as { url: string };
            resolve(resData.url);
        } catch (error) {
            console.log('Error: ' + error);
            const errT = error as AxiosError;
            reject(errT.message);
        }
    });
};
