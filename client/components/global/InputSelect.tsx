import React, { useEffect } from 'react';
import Select from 'react-select';
import {
    useController,
    FieldValues,
    FieldPath,
    Control,
    PathValue,
} from 'react-hook-form';

export interface IInputSelectItem {
    value: string;
    label: string;
}

interface IInputSelect<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
    [key: string]: any;
    name: TName;
    control: Control<TFieldValues>;
    text: string;
    placeholder: string;
    defaultValue: PathValue<TFieldValues, TName>;
    options: IInputSelectItem[] | undefined;
}

const InputSelect = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
    text,
    placeholder,
    name,
    control,
    defaultValue,
    options,
}: IInputSelect<TFieldValues, TName>) => {
    const {
        field: { value, onChange },
        fieldState: { error },
    } = useController({ name, control });
    return (
        <div>
            <label htmlFor={name} className="mb-2 font-semibold pl-1 flex w-full">
                {text}
            </label>
            <Select
                value={
                    (options && options.find((item) => item.value === value)) ||
                    ''
                }
                onChange={(item: any) => onChange(item.value)}
                options={options}
                isDisabled={!options}
                placeholder={placeholder}
                instanceId={name}
            />
            {error && (
                <p className="text-sm text-secondary pl-1.5 pt-1.5 font-semibold">
                    {error.message}
                </p>
            )}
        </div>
    );
};

export default InputSelect;
