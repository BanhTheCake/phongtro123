import React from 'react';
import {
    useController,
    FieldValues,
    FieldPath,
    Control,
    PathValue,
} from 'react-hook-form';

interface IInput<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends React.InputHTMLAttributes<HTMLInputElement> {
    [key: string]: any;
    name: TName;
    control: Control<TFieldValues>;
    text: string;
    placeholder: string;
    id: string;
    type: string;
    sizeInput?: 's' | 'm';
    direction?: 'row' | 'col',
    widthLabel?: string;
    defaultValue: PathValue<TFieldValues, TName>;
}

const Input = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
    text,
    placeholder,
    id,
    type,
    name,
    control,
    defaultValue,
    sizeInput = 'm',
    disabled,
    direction = 'col',
    widthLabel = '200px',
    ...props
}: IInput<TFieldValues, TName>) => {
    const {
        field: { value, onChange },
        fieldState: { error },
    } = useController({ name, control, defaultValue });

    const sizes = {
        m: 'p-2.5',
        s: 'p-2'
    }

    const inputClassName = ['bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full outline-none']

    const errorClassName = 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-base rounded-lg focus:ring-red-500  focus:border-red-500 block w-full'

    const disabledClassName = 'bg-slate-200 cursor-not-allowed select-none'

    if (sizeInput) {
        inputClassName.push(sizes[sizeInput])
    }

    if (error) {
        inputClassName.push(errorClassName)
    }

    if (disabled) {
        inputClassName.push(disabledClassName)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (disabled) return;
        onChange(e)
    }

    return (
        <>
            <div className={`mb-6 flex gap-2 ${direction === 'col' ? 'flex-col' : ''}`}>
                <label
                    htmlFor={id}
                    className={`pl-1.5 block text-base font-medium text-gray-900 dark:text-white max-w-full flex-shrink-0`}
                    style={direction === 'row' ? { width: widthLabel, marginTop: '10px' } : {}}
                >
                    {text}
                </label>
                <div className='w-full'>
                    <input
                        id={id}
                        type={type}
                        value={value}
                        onChange={handleChange}
                        className={inputClassName.join(' ')}
                        placeholder={placeholder}
                        disabled={disabled}
                        {...props}
                    />
                    {error && (
                        <p className="text-secondary text-sm mt-1 font-semibold pl-1.5">{error.message}</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default Input;
