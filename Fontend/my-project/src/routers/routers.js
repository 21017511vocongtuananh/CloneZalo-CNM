import { lazy, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { HiChat } from 'react-icons/hi';
import { HiArrowLeftOnRectangle, HiUsers } from 'react-icons/hi2';
import useConversation from '../hooks/useConversation.jsx';
import withAuth from '../hoc/withAuth';

// Load các component động
const User = lazy(() => import('../components/users/User'));
const Login = lazy(() => import('../components/Login'));
const Register = lazy(() => import('../components/Register'));

const useRoutes = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { conversationId } = useConversation();

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Xóa token nếu có
    navigate('/login');
  };

  const routes = useMemo(
    () => [
      {
        label: 'Chat',
        href: '/conversations',
        icon: HiChat,
        active: location.pathname === '/conversations' || !!conversationId
      },
      {
        label: 'Users',
        href: '/user',
        icon: HiUsers,
        active: location.pathname === '/user'
      },
      {
        label: 'Logout',
        href: '#',
        onClick: handleLogout,
        icon: HiArrowLeftOnRectangle
      }
    ],
    [location.pathname, conversationId]
  );

  return routes;
};

// ✅ Định nghĩa danh sách route
const routers = [
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/user', component: withAuth(User) }
];

export { useRoutes, routers };
