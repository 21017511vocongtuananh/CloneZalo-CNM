import { useParams } from 'react-router-dom';
import { useMemo } from 'react';

const useConversation = () => {
  const { conversationId } = useParams(); // Lấy conversationId từ URL

  const isOpen = useMemo(() => !!conversationId, [conversationId]);

  return useMemo(
    () => ({
      isOpen,
      conversationId: conversationId || '' // Tránh lỗi undefined
    }),
    [isOpen, conversationId]
  );
};

export default useConversation;
