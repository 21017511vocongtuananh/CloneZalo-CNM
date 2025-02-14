import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import Avatar from '@/components/Avatar';
import ApiService from '../../services/apis';
import useOtherUser from '../../hooks/useOtherUser';

const ConversationBox = ({ data, selected }) => {
  const otherUser = useOtherUser(data);
  console.log(otherUser);
  const navigate = useNavigate();
  const [phone, setPhone] = useState();

  // Chuyển trang khi click vào ConversationBox
  const handleClick = useCallback(() => {
    navigate(`/conversations/${data.id}`);
  }, [data.id, navigate]);

  // Lấy tin nhắn cuối cùng
  const lastMessage = useMemo(() => {
    return (
      data.messages?.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      )[0] || null
    );
  }, [data.messages]);

  // Lấy số điện thoại của user đăng nhập
  useEffect(() => {
    const fetchPhoneNumber = async () => {
      try {
        const response = await ApiService.getPhoneLogin();
        setPhone(response.user.phoneNumber || '');
      } catch (error) {
        console.error('Error fetching phone number:', error);
      }
    };

    fetchPhoneNumber();
  }, []);

  const userNumPhone = useMemo(() => {
    return phone;
  }, [phone]);

  const hasSeen = useMemo(() => {
    if (!lastMessage || !userNumPhone) {
      return false;
    }
    return (
      lastMessage.seenUsers?.some(
        (user) => user.phoneNumber === userNumPhone
      ) || false
    );
  }, [userNumPhone, lastMessage]);

  // Nội dung hiển thị của tin nhắn cuối
  const lastMessageText = useMemo(() => {
    if (!lastMessage) return 'Start a conversation';
    const senderName = lastMessage.sender?.name || 'Someone';
    if (lastMessage.image) return `${senderName} sent an image`;
    return `${senderName}: ${lastMessage.body}`;
  }, [lastMessage]);

  return (
    <div
      onClick={handleClick}
      className={clsx(
        'w-full relative flex items-center space-x-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer',
        selected ? 'bg-neutral-100' : 'bg-white'
      )}
    >
      <Avatar user={otherUser} />
    </div>
  );
};

export default ConversationBox;
