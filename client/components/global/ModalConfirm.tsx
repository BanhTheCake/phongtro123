import React, { ReactNode, useEffect } from 'react';
import Portal from './Portal';
import { GrFormPrevious } from 'react-icons/gr';

interface IModal {
    onClose?: () => void;
    isOpen: boolean;
    title: string;
    acceptText: string;
    deniedText: string;
    onAccess: () => any
}

const ModalConfirm = ({ onClose, isOpen, title, acceptText, deniedText, onAccess }: IModal) => {
    useEffect(() => {
        if (isOpen && typeof document !== 'undefined') {
            document.body.style.overflow = 'hidden';
        }
        return () => {
            if (typeof document !== 'undefined') {
                document.body.style.overflow = 'auto';
            }
        };
    }, [isOpen]);

    return (
        <Portal>
            <div
                className="fixed inset-0 z-50 flex p-8 items-center justify-center transition-all"
                style={isOpen ? { opacity: 1, visibility: 'visible' } : { opacity: 0, visibility: 'hidden' }}
            >
                <div
                    onClick={onClose}
                    className="w-full h-full bg-black bg-opacity-50 absolute inset-0 -z-10 transition-all duration-100"
                ></div>
                <div className="relative bg-white rounded-lg shadow ">
                    <button
                        type="button"
                        className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                        data-modal-hide="popup-modal"
                        onClick={onClose}
                    >
                        <svg
                            aria-hidden="true"
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="p-6 text-center">
                        <svg
                            aria-hidden="true"
                            className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                        </svg>
                        <h3 className="mb-5 text-lg font-normal text-gray-500 ">
                            {title}
                        </h3>
                        <button
                            data-modal-hide="popup-modal"
                            type="button"
                            className="text-white bg-red-600 hover:bg-red-800 font-medium rounded-md text-sm inline-flex items-center px-5 py-2.5 text-center mr-4 transition-all"
                            onClick={onAccess}
                        >
                            {acceptText}
                        </button>
                        <button
                            data-modal-hide="popup-modal"
                            type="button"
                            className="text-gray-500 bg-white hover:bg-gray-100 rounded-md border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 transition-all"
                            onClick={onClose}
                        >
                            {deniedText}
                        </button>
                    </div>
                </div>
            </div>
        </Portal>
    );
};

export default ModalConfirm;
