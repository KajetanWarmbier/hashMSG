import UserAvatar from './UserAvatar';

const UserConversation = (props) => {
  return (
    <div className='h-[70px] flex justify-start gap-4 cursor-pointer rounded-xl hover:bg-white hover:bg-opacity-10'>
      <UserAvatar userProfileData={props.userProfileData} />
      <div className='grid grid-cols-1 w-[240px] h-[70px]'>
        <div className='h-[25px] ml-1'>
          <h1 className='text-base'>{props.userProfileData.friendUsername}</h1>
        </div>
        <div className='flex bg-white bg-opacity-50 rounded-xl h-[45px]  items-center justify-start '>
          <h1 className='ml-2'>Some random text</h1>
        </div>
      </div>
    </div>
  );
};

export default UserConversation;
