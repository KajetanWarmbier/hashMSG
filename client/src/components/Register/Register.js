import { useState } from 'react';
import { MdArrowBack } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  let navigate = useNavigate();

  const backToWelcome = () => {
    navigate('/', { replace: true });
  };

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password === repeatPassword) {
      axios
        .post('http://localhost:4567/users/signup', {
          username: username,
          password: password,
        })
        .then((response) => {
          setPassword('');
          setRepeatPassword('');
          console.log(response);
          alert('Account has been created');
          navigate('/login', { replace: true });
        })
        .catch((error) => {
          console.log(error);
          alert('Auth failed.');
        });
      setPassword('');
      setRepeatPassword('');
    } else {
      alert("Passwords don't match");
    }
  };

  return (
    <div className='text-white grid grid-cols-1 grid-flow-row auto-rows-max'>
      <div className='mt-3 px-8'>
        <MdArrowBack
          className='h-[30px] w-[30px] cursor-pointer'
          onClick={backToWelcome}
        />
      </div>

      <div className='h-[130px] flex justify-center items-center'>
        <h1 className='text-7xl font-bold'>#MSG</h1>
      </div>

      <div className='h-[625] mt-[50px] pb-[155px] bg-black bg-opacity-20 rounded-[44px] grid justify-center items-center'>
        <form
          className='grid justify-center items-center gap-5 mt-[120px]'
          onSubmit={handleSubmit}
        >
          <input
            type='text'
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='bg-white bg-opacity-80 rounded-2xl text-black text-lg p-4 h-[45px] w-[310px]'
          ></input>
          {/* <input
            type='text'
            placeholder='Email'
            className='bg-white bg-opacity-80 rounded-2xl text-black text-lg p-4 h-[45px] w-[310px]'
          ></input> */}
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='bg-white bg-opacity-80 rounded-2xl text-black text-lg p-4 h-[45px] w-[310px]'
          ></input>
          <input
            type='password'
            placeholder='Repeat password'
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            className='bg-white bg-opacity-80 rounded-2xl text-black text-lg p-4 h-[45px] w-[310px]'
          ></input>

          <button
            type='submit'
            value='logIn'
            className='bg-black bg-opacity-20 rounded-2xl mt-16 text-lg p-4 h-[45px] w-[310] flex items-center justify-center'
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
