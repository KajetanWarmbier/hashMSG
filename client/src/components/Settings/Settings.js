import { MdArrowBack, MdSend } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Settings = () => {
  const userData = useSelector((state) => state.userData);
  const navigate = useNavigate();

  const backToHome = () => {
    navigate('/home', { replace: true });
  };

  const [friendName, setFriendName] = useState('');
  const [friendToDelete, setFriendToDelete] = useState('');
  const addFriend = (event) => {
    event.preventDefault();
    console.log(userData.data.username);
    console.log(friendName);
    axios
      .post('http://localhost:4567/users/addfriend', {
        username: userData.data.username,
        friendUsername: friendName,
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
        alert('Ups...');
      });
    setFriendName('');
  };
  const deleteFriend = (event) => {
    event.preventDefault();
    alert('Programista zasnął nim zdążył dopisać.');
    setFriendToDelete('');
  };

  return (
    <div className='text-white grid grid-cols-1 grid-flow-row auto-rows-max'>
      <button className='m-3 px-8' onClick={backToHome}>
        <MdArrowBack className='h-[30px] w-[30px] cursor-pointer' />
      </button>

      <div className='px-8 mt-4 grid grid-cols-1 auto-rows-max grid-flow-row gap-8'>
        <form
          className='grid grid-cols-6 p-1 bg-black bg-opacity-60 rounded-2xl'
          onSubmit={addFriend}
        >
          <input
            type='text'
            placeholder='Add friend by username'
            value={friendName}
            onChange={(e) => setFriendName(e.target.value)}
            className='col-span-5 bg-black p-3 bg-opacity-0 h-[30px] rounded-2xl outline-none'
          ></input>
          <button type='submit' className='col-span-1 justify-self-center'>
            <MdSend className='h-[25px] w-[25px] opacity-70' />
          </button>
        </form>

        <form
          className='grid grid-cols-6 p-1 bg-black bg-opacity-60 rounded-2xl'
          onSubmit={deleteFriend}
        >
          <input
            type='text'
            placeholder='Delete friend by username'
            value={friendToDelete}
            onChange={(e) => setFriendToDelete(e.target.value)}
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

export default Settings;
