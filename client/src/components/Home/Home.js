// import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { MdOutlineSettings, MdLogout, MdSearch } from 'react-icons/md';
import userData from '../../redux/userData';
import UserAvatar from '../UsersPersonality/UserAvatar';
import UserConversation from '../UsersPersonality/UserConversation';

const Home = () => {
  let navigate = useNavigate();

  const Logout = () => {
    navigate('/login', { replace: true });
  };

  const gotoSettings = () => {
    navigate('/settings', { replace: true });
  };

  return (
    <div className='text-white'>
      <div>
        <div className='px-8 my-8 grid grid-cols-2'>
          <h1 className='font-bold text-3xl'>#Contacts</h1>
          <div className='flex justify-end items-center gap-2'>
            <MdOutlineSettings
              className='h-[30px] w-[30px] cursor-pointer'
              onClick={gotoSettings}
            />
            <MdLogout
              className='h-[30px] w-[30px] cursor-pointer'
              onClick={Logout}
            />
          </div>
        </div>

        <div className='px-8 my-9 grid grid-flow-col auto-cols-max grid-rows-1 gap-5 overflow-hidden'>
          <UserAvatar userProfileData={'Kai'} />
          <UserAvatar userProfileData={'Agnieszka'} />
          <UserAvatar userProfileData={'Michał'} />
          <UserAvatar userProfileData={'Krzysztof'} />
        </div>

        <hr className='mx-8 my-8 opacity-20' />

        <div className='flex justify-start items-center bg-white bg-opacity-20 mx-8 h-[34px] rounded-[44px]'>
          <MdSearch className='text-2xl ml-2 opacity-50' />
          <h1 className='text-lg ml-2 opacity-50'>Search</h1>
        </div>

        <div className='px-8 mt-8 grid grid-cols-1 auto-rows-max grid-flow-row gap-8'>
          <UserConversation userProfileData={'Kai'} />
          <UserConversation userProfileData={'Agnieszka'} />
          <UserConversation userProfileData={'Michał'} />
          <UserConversation userProfileData={'Krzysztof'} />
        </div>
      </div>
    </div>
  );
};

export default Home;