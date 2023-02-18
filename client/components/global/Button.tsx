import Link from 'next/link';
import React from 'react';

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    icon?: JSX.Element;
    primary?: boolean;
    secondary?: boolean;
    full?: boolean;
    href?: string;
    className?: string;
    place?: 'center' | 'start' | 'end';
    minW?: string;
    customBg?: string;
    customText?: string;
    custom?: boolean;
    isUnderline?: boolean;
}

const Button = ({
    children,
    icon,
    primary = false,
    secondary = false,
    full = false,
    href = '',
    disabled = false,
    className = '',
    place = 'center',
    minW = '100px',
    customBg = 'tomato',
    customText = 'white',
    custom = false,
    isUnderline = true,
    ...propsData
}: IButton) => {
    let Component = href ? Link : 'button';
    let props: any = { ...propsData };

    if (href) {
        Component = Link;
        props.href = href;
    }

    if (disabled) {
        Object.keys(props).forEach((prop) => {
            if (prop.startsWith('on')) {
                delete props[prop];
            }
        });
    }

    const classComponent = {
        primary: 'bg-secondary text-white',
        secondary: 'bg-primary text-white',
        full: 'w-full',
    };

    const classNameComponent = [
        `group flex items-center justify-${place} rounded-[5px] p-2 min-w-[${minW}] gap-1.5`,
    ];

    if (primary) {
        classNameComponent.push(classComponent['primary']);
    }

    if (secondary) {
        classNameComponent.push(classComponent['secondary']);
    }

    if (full) {
        classNameComponent.push(classComponent['full']);
    }

    if (className) {
        classNameComponent.push(className);
    }

    const classNameText = ['flex text-base'];

    if (isUnderline) {
        classNameText.push('group-hover:underline');
    }

    return (
        <Component
            className={classNameComponent.join(' ')}
            disabled={disabled}
            style={custom ? { backgroundColor: customBg, color: customText } : {}}
            {...props}
        >
            {icon && <div className="flex text-[20px]">{icon}</div>}
            <div className={classNameText.join(' ')}>{children}</div>
        </Component>
    );
};

export default Button;
