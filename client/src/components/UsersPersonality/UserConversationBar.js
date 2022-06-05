import UserAvatar from './UserAvatar';

const UserConversationBar = (props) => {
  return (
    <div className='h-[90px] w-[70px]'>
      <UserAvatar userProfileData={props.userProfileData} />
      <h1 className='w-[70px] text-center'>
        {props.userProfileData.friendUsername}
      </h1>
    </div>
  );
};

export default UserConversationBar;
