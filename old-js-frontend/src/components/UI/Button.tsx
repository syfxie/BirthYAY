import React from 'react'

type ButtonProps = {
  color?: string;
  // hierarchy:
  //   | 'primary'
  //   | 'secondary'
  //   | 'tertiary'
  //   | 'quaternary'
  //   | 'quinary'
  //   | 'senary';
  // route?: string;
  // link?: string;
  onClick?: () => void;
  font?: string;
  bg?: string;
  padding?: string;
  border?: string;
  hover?: string;
  hoverColor?: string;
  hoverBg?: string;
  icon?: React.ReactNode;
  iconPosition?: string;
  disabled?: boolean;
  classes?: string;
  children: React.ReactNode;
};

export default function Button({
  // type,
  // hierarchy,
  // route,
  // link,
  onClick,
  color,
  font,
  bg,
  padding = 'px-5 py-3',
  border,
  hover,
  icon,
  iconPosition = 'right-5',
  disabled,
  classes,
  children,
}: ButtonProps) {
  let buttonClasses = `transition-300 relative inline-block text-center rounded-full 
                       ${font} ${color} ${bg} ${padding} ${border} ${hover} 
                       ${disabled ? 'opacity-60 cursor-auto' : 'cursor-pointer'} ${classes}`;

  // if (hierarchy === 'primary') {
  //   buttonClasses += ' bg-gradient text-black';
  // } else if (hierarchy === 'secondary') {
  //   buttonClasses += ' bg-blue2 text-black hover:bg-blue1';
  // } else if (hierarchy === 'tertiary') {
  //   buttonClasses +=
  //     ' border border-blue2 text-blue2 hover:border-blue1 hover:text-blue1';
  // } else if (hierarchy === 'quaternary') {
  //   buttonClasses +=
  //     ' border border-white text-white hover:bg-grey3 hover:bg-opacity-80';
  // } else if (hierarchy === 'quinary') {
  //   buttonClasses +=
  //     ' border border-grey1 text-grey1 hover:bg-grey3 hover:bg-opacity-80';
  // } else if (hierarchy === 'senary') {
  //   buttonClasses +=
  //     ' border border-grey2 text-grey1 hover:bg-grey3 hover:bg-opacity-80';
  // }

  const buttonIcon = icon ? (
    <div className={`absolute top-1/2 -translate-y-1/2 ${iconPosition}`}>
      {icon}
    </div>
  ) : null;

  return (
    <button
    onClick={disabled ? () => {} : onClick}
    disabled={disabled}
    className={buttonClasses}
  >
    {buttonIcon}
    {children}
  </button>
  );

  // switch (type) {
  //   case 'route':
  //     return (
  //       <Link href={disabled ? '' : route || '/'} className={buttonClasses}>
  //         {buttonIcon}
  //         {children}
  //       </Link>
  //     );
  //   case 'link':
  //     return (
  //       <a
  //         href={disabled ? '' : link || 'https://investrack.app'}
  //         target='_blank'
  //         rel='noopener noreferrer'
  //         className={buttonClasses}
  //       >
  //         {buttonIcon}
  //         {children}
  //       </a>
  //     );
  //   case 'button':
  //     return (
  //       <button
  //         onClick={disabled ? () => {} : onClick}
  //         disabled={disabled}
  //         className={buttonClasses}
  //       >
  //         {buttonIcon}
  //         {children}
  //       </button>
  //     );
  //   case 'submit':
  //     return (
  //       <button type='submit' disabled={disabled} className={buttonClasses}>
  //         {buttonIcon}
  //         {children}
  //       </button>
  //     );
  //   default:
  //     return <></>;
  // }
}
