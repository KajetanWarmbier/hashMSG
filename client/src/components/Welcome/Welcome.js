import { useNavigate } from 'react-router-dom';
import { MdTag } from 'react-icons/md';

const Welcome = () => {
  let navigate = useNavigate();

  const LogIn = () => {
    navigate('/login', { replace: true });
  };

  const SignUp = () => {
    navigate('/register', { replace: true });
  };

  return (
    <div className='text-white grid justify-items-center items-center'>
      <div className='h-[300px] w-[300px] '>
        <div className='flex justify-center items-center mt-[70px] bg-none rounded-[44px] border-[20px] border-white'>
          <MdTag className='h-[260px] w-[260px]' />
        </div>
      </div>
      <div className='mt-20 flex justify-center items-center'>
        <h1 className='text-4xl font-bold'>#MSG</h1>
      </div>
      <div className='bg-black bg-opacity-20 rounded-[44px] w-[390px] mt-10 grid justify-center items-center h-[340px]'>
        <div className=''>
          <h1 className='text-xl'>Your secrets are safe here</h1>
          <hr className='opacity-20' />
        </div>
        <div className='grid grid-rows-2 gap-4'>
          <button
            className='bg-[#BF80E2] bg-opacity-70 rounded-3xl h-[44px]'
            onClick={LogIn}
          >
            Log in
          </button>
          <button
            className='bg-[#BF80E2] bg-opacity-70 rounded-3xl h-[44px]'
            onClick={SignUp}
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
