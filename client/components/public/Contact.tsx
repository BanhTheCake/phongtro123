import Image from "next/image";
import React from "react";
import PATH from "../../constants/path";
import Button from "../global/Button";

const text = {
    title: 'Liên hệ với chúng tôi nếu bạn cần hỗ trợ:',
    attr: [
        { title: 'HỖ TRỢ THANH TOÁN', phone: '0917686101', zalo: '0917686101' },
        { title: 'HỖ TRỢ ĐĂNG TIN', phone: '0902657123', zalo: '0902657123' },
        { title: 'HOTLINE 24/7', phone: '0917686101', zalo: '0917686101' },
    ]
}

const Contact = () => {
    return <div className="mt-6 bg-white shadow-md rounded-md p-10 text-center space-y-5 border-dashed border-[4px]">
        <div className="relative w-full h-[150px]">
            <Image src={'https://phongtro123.com/images/support-bg.jpg'} alt="Support" fill className="object-contain" />
        </div>
        <p>{text.title}</p>
        <div className="flex items-center justify-around gap-2">
            {text.attr.map(item => {
                return <div key={item.title} className='text-center'>
                    <p className="font-bold text-secondary mb-2">{item.title}</p>
                    <p className="font-semibold text-xl">Điện thoại: {item.phone}</p>
                    <p className="font-semibold text-xl">Zalo: {item.zalo}</p>
                </div>
            })}
        </div>
        <Button href={PATH.CONTACT} secondary className="px-6 m-auto font-semibold">Gửi liên hệ</Button>
    </div>;
};

export default Contact;
