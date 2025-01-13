import React from 'react';

const Button = ({children, bg, style, type, handler}) => {
    return (
        <button type={type} onClick={handler} className={`px-4 py-2 rounded-md text-white ${bg ? bg : 'bg-yellow-400 hover:bg-yellow-500'} ${style}`}>
          {children}
        </button>
    );
};

export default Button;