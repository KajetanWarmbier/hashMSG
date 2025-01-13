import { useNavigate, useLocation } from 'react-router-dom';
import { MdArrowBack, MdSend } from 'react-icons/md';
import UserAvatar from '../UsersPersonality/UserAvatar';
import MessageFriend from './MessageFriend';
import MessageUser from './MessageUser';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Conversation = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { friendUsername, friendPublicKey } = state;
  const friend = {
    friendUsername: friendUsername,
    friendPublicKey: friendPublicKey,
  };

  const scrollRef = useRef();

  const [listOfMessages, setListOfMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [post_type, setpost_type] = useState('');
  const userData = useSelector((state) => state.userData);

  const backToHome = () => navigate('/home', { replace: true });

  const sendMessage = (event) => {
    event.preventDefault();

    axios
      .post('http://localhost:4567/messages/send_message', {
        mnemonics: userData.data.mnemonics,
        message: message,
        post_type: post_type,
        friendPublicKey: friend.friendPublicKey,
      })
      .then(() => setMessage(''))
      .catch((error) => console.error(error));
  };

  const getListOfMessages = (post_type_text) => {
    axios
      .post('http://localhost:4567/messages/get_messages', {
        mnemonics: userData.data.mnemonics,
        address: userData.data.address,
        post_type: post_type_text,
      })
      .then((response) => {
        setpost_type(post_type_text);
        if (listOfMessages.reverse() !== response.data.messages) {
          let messagesArray = response.data.messages;
          setListOfMessages(messagesArray.reverse());
          scrollRef.current.scrollIntoView();
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    const post_type_array = [
      userData.data.username.toLowerCase(),
      friend.friendUsername.toLowerCase(),
    ];
    post_type_array.sort();
    const post_type_text = post_type_array[0] + '_' + post_type_array[1];

    getListOfMessages(post_type_text);

    const interval = setInterval(() => {
      getListOfMessages(post_type_text);
    }, 3500);

    return () => clearInterval(interval);

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            {listOfMessages.map((message) => {
              if (message.sender === userData.data.address) {
                return <MessageUser messageContent={message.message} />;
              } else {
                return <MessageFriend messageContent={message.message} />;
              }
            })}
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
