import React from 'react';
import { AiTwotoneStar } from 'react-icons/ai';

interface IStar {
    number: number;
    size?: number;
}

const Star = ({ number, size = 20 }: IStar) => {
    return (
        <>
            {number ?
                Array(number)
                    .fill(0)
                    .map((_, i) => {
                        return (
                            <AiTwotoneStar
                                key={i}
                                size={size}
                                color={'#f1c40f'}
                                className="inline-flex -mt-1 last:mr-1"
                            />
                        );
                    }) : ''}
        </>
    );
};

export default Star;
