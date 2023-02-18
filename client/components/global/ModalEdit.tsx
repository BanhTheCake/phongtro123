import React, { ReactNode, useEffect } from 'react';
import Portal from './Portal';

interface IModal {
    onClose?: () => void;
    children: ReactNode;
    isOpen: boolean;
    title: string,
}

const ModalEdit = ({ onClose, children, isOpen, title }: IModal) => {

    useEffect(() => {
        if (isOpen && typeof document !== 'undefined') {
            document.body.style.overflow = 'hidden';
        }
        return () => {
            if (typeof document !== 'undefined') {
                document.body.style.overflow = 'auto';
            }
        }
    }, [isOpen])

    return (
        <Portal>
            <div
                className="fixed inset-0 z-50 flex p-4 transition-all"
                style={isOpen ? { opacity: 1, visibility: 'visible' } : { opacity: 0, visibility: 'hidden' }}
            >
                <div
                    onClick={onClose}
                    className="w-full h-full bg-black bg-opacity-50 absolute inset-0 -z-10 transition-all duration-100"
                ></div>
                <div
                    className="bg-white m-auto rounded-lg w-[1000px] max-w-full relative transition-all overflow-y-auto h-full p-6 py-2"
                >
                    <h4 className="border-b pt-2 pb-3 border-slate-300 font-semibold text-2xl capitalize">
                        {title}
                    </h4>
                    <div className=''>
                        {children}
                    </div>
                </div>
            </div>
        </Portal >
    );
};

export default ModalEdit;
