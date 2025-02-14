import { useRoutes } from '../../routers/routers';
import { useState, useEffect } from 'react';
import DesktopItem from './DesktopItem';
import Avatar from '../Avatar';
const DesktopSidebar = ({ currentUser }) => {
  const routes = useRoutes();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className='
    fixed inset-y-0 left-0 z-40
    w-16 lg:w-20
    overflow-y-auto bg-[#005AE0] border-r
    flex flex-col justify-between py-4
  '
    >
      <nav className='mt-4 flex flex-col justify-between'>
        <ul role='list' className='flex flex-col items-center space-y-1'>
          <div
            onClick={() => setIsOpen(true)}
            className='
          cursor-pointer
          hover:opacity-75
          transition'
          >
            <Avatar user={currentUser} />
          </div>
          {routes.map((item) => (
            <DesktopItem
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
              active={item.active}
              onClick={item.onClick}
            />
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default DesktopSidebar;
