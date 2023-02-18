import React, { useEffect, useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

export interface IItemSlider {
    fromValue: number | null;
    toValue: number | null;
    value: string;
}

interface ISearchModalSlider {
    menu: IItemSlider[] | undefined;
    data: IItemSlider;
    handleChangeValue: ([min, max]: (number | null)[], value: string) => void;
    handleReset: () => void;
    formatNumber: number;
    prefix: string;
}

const SearchModalSlider = ({
    menu,
    data,
    formatNumber,
    prefix,
    handleChangeValue,
    handleReset
}: ISearchModalSlider) => {
    let maxPrice = 0;
    if (menu) {
        maxPrice = (
            menu[menu.length - 1].toValue ? menu[menu.length - 1].toValue : menu[menu.length - 1].fromValue
        ) as number;
    }
    const step = 100 / maxPrice;

    const [value, setValue] = useState([0, 100]);
    const [ani, setAni] = useState(false);
    const onSlideChange = (value: any) => {
        setValue(value);
    };
    const percent = menu?.map((item) => {
        let min = 0;
        let max = 100;
        if (item.fromValue) {
            min = item.fromValue * step;
        }
        if (item.toValue) {
            max = item.toValue * step;
        }
        return [min, max];
    });

    const handleChange = (index: number) => {
        if (!percent) return;
        setValue(percent[index]);
        setAni(true);
    };

    const formatValue = ([minPercent, maxPercent]: number[]) => {
        if (!percent || !menu) return;

        const min = Math.round(((minPercent / 100) * maxPrice) / formatNumber) * formatNumber
        let max: number | null = Math.round(((maxPercent / 100) * maxPrice) / formatNumber) * formatNumber
        if (min === max) max = null

        const currentIndex = menu.findIndex((item) => item.fromValue === min && item.toValue === max)
        if (currentIndex === -1) {
            return `Từ ${Math.round(
                ((minPercent/ 100) * maxPrice) / formatNumber
            )} - ${Math.round(
                ((maxPercent / 100) * maxPrice) / formatNumber
            )} ${prefix}`;
        }
        return menu[currentIndex].value;
    };

    const handleClickButton = () => {
        if (!percent || !menu) return;
        
        const min = Math.round(((value[0] / 100) * maxPrice) / formatNumber) * formatNumber
        let max: number | null = Math.round(((value[1] / 100) * maxPrice) / formatNumber) * formatNumber
        if (min === max) max = null
        
        const currentIndex = menu.findIndex((item) => item.fromValue === min && item.toValue === max)
        let valueText: string = (currentIndex === -1 ? formatValue(value) : menu[currentIndex].value) || ''
        
        handleChangeValue([min, max], valueText)
    }

    useEffect(() => {
        let [min, max] = value
        if (data.fromValue !== null) {
            min = data.fromValue * step
        }
        if (data.toValue !== null) {
            max = data.toValue * step
        }
        setValue([min, max])
    }, [data.fromValue, data.toValue])

    return (
        <div className="px-5 py-5">
            <div className="flex pb-4 gap-2 justify-center font-bold text-secondary text-2xl">
                <p>{formatValue(value)}</p>
            </div>

            <Slider
                step={0.001}
                range
                allowCross={true}
                value={value}
                onChange={onSlideChange}
                railStyle={{ height: '6px' }}
                trackStyle={
                    ani
                        ? {
                              transition: 'left 0.5s ease, width 0.5s ease',
                              height: '6px',
                          }
                        : { height: '6px' }
                }
                handleStyle={
                    ani
                        ? {
                              transition: 'left 0.5s ease',
                              width: '26px',
                              height: '26px',
                              marginTop: '-10px',
                          }
                        : { width: '26px', height: '26px', marginTop: '-10px' }
                }
                onFocus={() => {
                    setAni(false);
                }}
            />
            <div className="my-6 gap-2 grid grid-cols-3">
                {menu &&
                    menu.map((item, index) => {
                        return (
                            <button
                                key={index}
                                onClick={() => handleChange(index)}
                                className={
                                    'col-span-1 min-w-[200px] py-1.5 rounded-md space-x-2 space-y-2 bg-primary text-white font-semibold'
                                }
                            >
                                {item.value}
                            </button>
                        );
                    })}
                <button
                    onClick={() => handleReset()}
                    className={
                        'col-span-1 min-w-[200px] py-1.5 rounded-md space-x-2 space-y-2 bg-primary text-white font-semibold'
                    }
                >
                    Xoá giá trị
                </button>
            </div>
            <button onClick={handleClickButton} className='w-full py-2 bg-yellow-400 font-semibold rounded-md'>
                Áp dụng
            </button>
        </div>
    );
};

export default SearchModalSlider;
