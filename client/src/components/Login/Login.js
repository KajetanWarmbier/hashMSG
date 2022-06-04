import { MdArrowBack } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  let navigate = useNavigate();

  const backToWelcome = () => {
    navigate('/', { replace: true });
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

      <div className='h-[625] mt-[50px] pb-[125px] bg-black bg-opacity-20 rounded-[44px] grid justify-center items-center'>
        <form className='grid justify-center items-center gap-5 mt-[120px]'>
          <input
            type='text'
            placeholder='Username'
            className='bg-white bg-opacity-80 rounded-2xl text-black text-lg p-4 h-[45px] w-[310px]'
          ></input>
          <input
            type='password'
            placeholder='Password'
            className='bg-white bg-opacity-80 rounded-2xl text-black text-lg p-4 h-[45px] w-[310px]'
          ></input>

          <div className='flex justify-end items-center opacity-80 cursor-pointer'>
            <h1>Forgot Password?</h1>
          </div>

          <button
            type='submit'
            value='logIn'
            className='bg-black bg-opacity-20 rounded-2xl mt-16 text-lg p-4 h-[45px] w-[310] flex items-center justify-center'
          >
            Log in
          </button>

          <div className='flex items-center justify-start'>
            <div className='h-[30px] w-[30px] bg-black bg-opacity-20 rounded-xl'></div>
            <h1 className='opacity-80 ml-3'>Remember Me</h1>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
