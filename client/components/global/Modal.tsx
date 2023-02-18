import React, { ReactNode, useEffect } from 'react';
import Portal from './Portal';
import { GrFormPrevious } from 'react-icons/gr';

interface IModal {
    onClose?: () => void;
    children: ReactNode;
    isOpen: boolean;
    title: string,
}

const Modal = ({ onClose, children, isOpen, title }: IModal) => {

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
                className="fixed inset-0 z-50 flex p-8"
                style={
                    isOpen
                        ? { display: 'flex' }
                        : { display: 'none' }
                }
            >
                <div
                    onClick={onClose}
                    className="w-full h-full bg-black bg-opacity-50 absolute inset-0 -z-10 transition-all duration-100"
                ></div>
                <div
                    className="bg-white m-auto rounded-lg w-[700px] max-w-full relative transition-all max-h-full flex flex-col"
                >
                    <GrFormPrevious
                        onClick={onClose}
                        className="absolute top-0 left-0 mt-3 ml-2 cursor-pointer"
                        size={30}
                    />
                    <h4 className="text-center p-3 border-b border-slate-300 text-lg font-semibold">
                        {title}
                    </h4>
                    {children}
                </div>
            </div>
        </Portal>
    );
};

export default Modal;
