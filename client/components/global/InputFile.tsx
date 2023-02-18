import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { BiTrash } from 'react-icons/bi';
import {
    useController,
    FieldValues,
    FieldPath,
    Control,
} from 'react-hook-form';

interface IInputFile<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
    [key: string]: any;
    name: TName;
    control: Control<TFieldValues>;
    text: string;
    id: string;
    multiple?: boolean;
}

const InputFile = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
    text,
    id,
    multiple = false,
    control,
    name,
}: IInputFile<TFieldValues, TName>) => {
    const {
        field: { value, onChange },
        fieldState: { error },
    } = useController({ name, control });

    const [images, setImages] = useState<string[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;
        const imagesUrl: string[] = [];
        const fileArray = [];
        for (let i = 0; i < files.length; i++) {
            const url = URL.createObjectURL(files[i]);
            imagesUrl.push(url);
            fileArray.push(files[i]);
        }
        onChange(fileArray);
        setImages(imagesUrl);
    };

    useEffect(() => {
        if (!value) {
            setImages([]);
            return;
        }
        const valueImage: any[] = !Array.isArray(value) ? [value] : value;
        const imagesUrl: string[] | string = [];
        for (const element of valueImage) {
            let url = element;
            if (typeof url !== 'string') {
                url = URL.createObjectURL(element);
            }
            imagesUrl.push(url);
        }
        setImages(imagesUrl);
    }, [value]);

    const handleDelete = (index: number) => {
        if (!value) return;
        onChange(value.filter((_: any, i: number) => i !== index));
    };

    return (
        <div>
            <div className={`${multiple ? '' : 'flex gap-4'}`}>
                <label
                    htmlFor={id}
                    className="flex w-full h-[180px] border-dashed border-[3px] border-slate-400 items-center justify-center flex-col text-slate-600 cursor-pointer"
                >
                    <AiOutlineCloudUpload size={60} />
                    <p>{text}</p>
                </label>
                {images.length > 0 && (
                    <>
                        <div className={`${multiple ? 'grid grid-cols-3 gap-3 mt-2.5' : 'flex-shrink-0 h-[180px] aspect-square'}`}>
                            {images.map((image, index) => {
                                return (
                                    <div key={index} className={'shadow-low w-full h-full flex flex-col'}>
                                        <div className="relative col-span-1 aspect-video rounded-t-md overflow-hidden flex-1">
                                            <Image
                                                src={image}
                                                alt={'Phòng trọ'}
                                                fill
                                                sizes="100vw"
                                                className="object-cover"
                                            />
                                        </div>
                                        <div
                                            className="bg-white flex items-center justify-center p-2 gap-1 font-semibold cursor-pointer transition-all rounded-b-md"
                                            onClick={() => handleDelete(index)}
                                        >
                                            <BiTrash size={22} />
                                            <span>Xoá</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}
            </div>
            <input
                type="file"
                id={id}
                hidden
                multiple={multiple}
                onChange={handleChange}
            />
            {error && (
                <p className="text-secondary text-sm mt-1 font-semibold pl-1.5">
                    {error.message}
                </p>
            )}
        </div>
    );
};

export default InputFile;
