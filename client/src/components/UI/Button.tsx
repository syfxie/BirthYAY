import React from 'react'

type ButtonProps = {
    text:string;
    color?: string;
    size?:string
    onClick?: () => void;
    font?: string;
    bg?: string;
    margin?: string;
    padding?: string;
    border?: string;
    hover?: string;
    icon?: React.ReactNode;
    iconPosition?: string;
    disabled?: boolean;
    classes?: string;
};

export default function Button({
                                   onClick,
                                   text = 'button',
                                   color,
                                   font,
                                   bg,
                                   border,
                                   hover,
                                   icon,
                                   margin,
                                   size = 'h-10 w-20',
                                   padding = 'px-5',
                                   iconPosition = 'right-5',
                                   disabled = false,
                                   classes = ''
                               }: ButtonProps) {
    let buttonClasses = `relative inline-block text-center rounded-md transition-300 ${size} ${font} ${color} 
    ${bg} ${margin} ${padding} ${border} ${hover} ${disabled ? 'opacity-60 cursor-auto' : 'cursor-pointer'} ${classes}`;

    console.log('sophie button classes', buttonClasses);

    const buttonIcon = icon ? (
        <div className={`absolute top-1/2 -translate-y-1/2 ${iconPosition}`}>
            {icon}
        </div>
    ) : null;

    return (
        <button
            onClick={disabled ? () => {
            } : onClick}
            disabled={disabled}
            className={buttonClasses}
        >
            {/*{buttonIcon}*/}
            {text}
        </button>
    );
}