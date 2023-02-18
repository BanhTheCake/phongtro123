import React from 'react';
import {
    useController,
    FieldValues,
    FieldPath,
    Control,
    PathValue,
} from 'react-hook-form';
import TextareaAutosize from 'react-textarea-autosize';

interface IInput<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    [key: string]: any;
    name: TName;
    control: Control<TFieldValues>;
    text: string;
    placeholder: string;
    id: string;
    minRows: number;
    maxRows: number;
    defaultValue: PathValue<TFieldValues, TName>;
}

const InputTextarea = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
    text,
    placeholder,
    id,
    name,
    control,
    defaultValue,
    minRows,
    maxRows,
}: IInput<TFieldValues, TName>) => {
    const {
        field: { value, onChange },
        fieldState: { error },
    } = useController({ name, control, defaultValue });

    return (
        <div className="mb-6">
            <label
                htmlFor={id}
                className="pl-1.5 block mb-2 text-base font-medium text-gray-900 dark:text-white"
            >
                {text}
            </label>
            <TextareaAutosize
                value={value}
                onChange={onChange}
                id={id}
                className={`p-2.5 w-full text-base text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 resize-none ${error
                    ? `bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-base rounded-lg focus:ring-red-500  focus:border-red-500 block w-full`
                    : ''
                    } `}
                placeholder={placeholder}
                minRows={minRows}
                maxRows={maxRows}
            />
            {error && (
                <p className="text-secondary text-sm mt-1 font-semibold pl-1.5">
                    {error.message}
                </p>
            )}
        </div>
    );
};

export default InputTextarea;
