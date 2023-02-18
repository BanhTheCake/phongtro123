import React from 'react';

interface ISearchItem {
    iconLeft: JSX.Element;
    iconRight: JSX.Element;
    onOpen: () => void,
    title: string | null,
    defaultText: string,
}

const SearchItem = ({
    iconLeft,
    iconRight,
    onOpen,
    title,
    defaultText,
    ...props
}: ISearchItem) => {
    return (
        <>
            <div
                className="w-full h-full text-slate-500 bg-white flex items-center justify-between p-1.5 px-2 rounded-[4px] gap-2"
                onClick={onOpen}
                {...props}
            >
                <div className="flex items-center gap-1.5 overflow-hidden">
                    {iconLeft}
                    <span className="flex-1 whitespace-nowrap truncate">
                        {title ? title : defaultText}
                    </span>
                </div>
                <div className="flex-shrink-0 text-xl text-slate-200 flex">
                    {iconRight}
                </div>
            </div>
        </>
    );
};

export default SearchItem;
