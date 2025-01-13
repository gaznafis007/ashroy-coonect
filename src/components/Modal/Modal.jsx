import React from 'react';
import { RxCross2 } from 'react-icons/rx'

const Modal = ({children, setOpen, position}) => {
    const handleClose = () =>{
        setOpen(false)
    }
    return (
        <div className={`absolute ${position}`}>
            <div className='flex flex-col relative space-y-3 p-8 rounded-md bg-white'>
            <RxCross2 onClick={handleClose} className='text-xl text-slate-800 absolute right-8 top-8 cursor-pointer'/>
            {children}
        </div>
        </div>
    );
};

export default Modal;