import Sidebar from '../Sidebar/Sidebar';

const UserLayout = ({ children }) => {
  return (
    <Sidebar>
      <div className='h-full'>{children}</div>
    </Sidebar>
  );
};

export default UserLayout;
