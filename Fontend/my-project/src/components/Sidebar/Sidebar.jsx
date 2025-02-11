import React from 'react';
import DesktopSidebar from './DesktopSidebar';

const Sidebar = ({ children }) => {
  return (
    <div className='h-full'>
      <DesktopSidebar />
      <main className='lg:pl-20 h-full'>{children}</main>
    </div>
  );
};

export default Sidebar;
