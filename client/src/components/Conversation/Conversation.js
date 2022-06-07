import { useNavigate, useLocation } from 'react-router-dom';
import { MdArrowBack, MdSend } from 'react-icons/md';
import UserAvatar from '../UsersPersonality/UserAvatar';
import MessageFriend from './MessageFriend';
import MessageUser from './MessageUser';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

const Conversation = (props) => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { friendUsername, friendPublicKey } = state;
  const friend = {
    friendUsername: friendUsername,
    friendPublicKey: friendPublicKey,
  };

  const scrollRef = useRef();

  const [message, setMessage] = useState('');
  const userData = useSelector((state) => state.userData);

  const backToHome = () => {
    navigate('/home', { replace: true });
  };

  const sendMessage = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    scrollRef.current.scrollIntoView();
  }, []);

  return (
    <div className='text-white grid grid-cols-1 grid-flow-row auto-rows-max'>
      <button className='m-3 px-8' onClick={backToHome}>
        <MdArrowBack className='h-[30px] w-[30px] cursor-pointer' />
      </button>

      <div className='px-8 mt-4 grid grid-cols-1 auto-rows-max grid-flow-row gap-8'>
        <div className='grid grid-cols-4 items-center'>
          <UserAvatar userProfileData={friend} className='col-span-1' />
          <h1 className='cols-span-3 text-left text-2xl'>
            {friend.friendUsername}
          </h1>
        </div>

        <hr className='mx-8 opacity-20' />

        <div className='overflow-hidden'>
          <div className='h-[510px] overflow-scroll scrollbar-hide scroll-smooth grid grid-cols-1 auto-rows-max gap-4'>
            <MessageFriend />
            <MessageUser />
            <MessageUser />
            <MessageFriend />
            <MessageUser />
            <div ref={scrollRef} className='display-none'></div>
          </div>
        </div>

        <form
          className='grid grid-cols-6 p-1 bg-black bg-opacity-60 rounded-2xl'
          onSubmit={sendMessage}
        >
          <input
            type='text'
            placeholder='Type here...'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className='col-span-5 bg-black p-3 bg-opacity-0 h-[30px] rounded-2xl outline-none'
          ></input>
          <button type='submit' className='col-span-1 justify-self-center'>
            <MdSend className='h-[25px] w-[25px] opacity-70' />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Conversation;
