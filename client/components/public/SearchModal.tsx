import { ChangeEvent } from "react";

export interface IItem {
    value: string;
    code: string;
}

interface IInput {
    [key: string]: any;
    menu: IItem[];
    name: string,
    value: { code: string, value: string },
    onChange: (value: IItem | undefined) => void,
    onClickItem?: () => void
}

const SearchModal = ({ menu, name, value, onChange, onClickItem }: IInput) => {

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        const currentValue = menu.find(item => item.code === e.target.value)
        onChange(currentValue)
    }
    return (
        <>
            <div className="p-3 px-4 overflow-y-auto flex-1">
                {menu &&
                    menu.map((item) => {
                        return (
                            <div
                                key={item.code}
                                className="flex items-center py-2 border-b last:border-none"
                            >
                                <input
                                    id={item.code + name}
                                    type="radio"
                                    value={item.code}
                                    name={name}
                                    checked={item.code === value.code}
                                    onChange={onChangeInput}
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                                    onClick={onClickItem}
                                />
                                <label
                                    htmlFor={item.code + name}
                                    className="ml-2  font-medium text-gray-900 dark:text-gray-300"
                                >
                                    {item.value}
                                </label>
                            </div>
                        );
                    })}
            </div>
        </>
    );
};

export default SearchModal;
