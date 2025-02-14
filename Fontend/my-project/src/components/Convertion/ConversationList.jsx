import React, { useEffect, useState } from 'react';
import { MdOutlineGroupAdd } from 'react-icons/md';
import clsx from 'clsx';
import { FaSearch, FaUserPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import useConversation from '../../hooks/useConversation';
import ConversationBox from './ConversationBox';

const ConversationList = ({ initialItems }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  const navigate = useNavigate();

  const { conversationId, isOpen } = useConversation();

  return (
    <aside
      className={clsx(
        'fixed inset-y-0 pb-2 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200',
        isOpen ? 'hidden' : 'block w-full left-0'
      )}
    >
      <div className='px-5'>
        <div className='flex items-center justify-between mb-4 pt-4 space-x-4'>
          <div className='flex items-center flex-1 bg-gray-100 p-2 rounded-md'>
            <FaSearch className='text-gray-400 ml-2' />
            <input
              type='text'
              placeholder='Tìm kiếm'
              className='bg-gray-100 outline-none ml-2 w-full'
            />
          </div>
          <div className='flex items-center space-x-2'>
            <div className='flex items-center justify-center p-2 text-gray-600 rounded-md cursor-pointer hover:bg-gray-200 transition'>
              <FaUserPlus size={18} />
            </div>
            <div className='flex items-center justify-center p-2 text-gray-600 rounded-md cursor-pointer hover:bg-gray-200 transition'>
              <MdOutlineGroupAdd size={18} />
            </div>
          </div>
        </div>

        {/* Menu Tất cả, Chưa đọc, Phân loại */}
        <div className='border-b border-gray-300'>
          <div className='flex space-x-3 text-gray-500 text-sm font-medium'>
            <div className='cursor-pointer text-blue-600 border-b-2 border-blue-600 pb-2'>
              Tất cả
            </div>
            <div className='cursor-pointer hover:text-blue-600 pb-2 pr-12'>
              Chưa đọc
            </div>
            <div className='cursor-pointer hover:text-blue-600 pb-2 flex items-center space-x-1'>
              <span>Phân loại</span>
              <span>▼</span>
            </div>
            <div className='cursor-pointer hover:text-blue-600 pb-2'>⋯</div>
          </div>
        </div>
        {Array.isArray(items) && items.length > 0 ? (
          items.map((item) => (
            <ConversationBox
              key={item.id}
              data={item}
              selected={conversationId === item.id}
            />
          ))
        ) : (
          <p>Không có cuộc trò chuyện nào</p> // Hoặc hiển thị loading
        )}
      </div>
    </aside>
  );
};

export default ConversationList;
