import { useEffect, useState, useMemo } from 'react';
import ApiService from '../services/apis';

const useOtherUser = (conversation) => {
  const [phone, setPhone] = useState('');

  // Lấy số điện thoại từ API khi component mount
  useEffect(() => {
    const fetchPhoneNumber = async () => {
      try {
        const response = await ApiService.getPhoneLogin();
        setPhone(response?.user?.phoneNumber || '');
      } catch (error) {
        console.error('Error fetching phone number:', error);
      }
    };

    fetchPhoneNumber();
  }, []);

  // Xác định người dùng khác trong cuộc hội thoại
  const otherUsers = useMemo(() => {
    if (!phone || !Array.isArray(conversation.users)) return []; // Kiểm tra nếu dữ liệu hợp lệ
    return conversation.users.filter((user) => user.phoneNumber !== phone); // Lấy tất cả người khác
  }, [phone, conversation.users]);

  return otherUsers;
};

export default useOtherUser;
