import DashboardSideNav from '@/components/DashboardSideNav/DashboardSideNav';
import React from 'react';


const layout = ({children}) => {

    return (
        <section className='flex flex-col-reverse md:flex-row justify-between min-h-screen'>
            <DashboardSideNav/>
            <div className="w-full">
            {children}
            </div>
        </section>
    );
};

export default layout;