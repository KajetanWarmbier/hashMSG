import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='flex'>
      <div>Home screen</div>
      <Link to='/login'>
        <button className='bg-gray-400 rounded-lg text-white mx-2 my-1'>
          Login
        </button>
      </Link>
    </div>
  );
};

export default Home;
