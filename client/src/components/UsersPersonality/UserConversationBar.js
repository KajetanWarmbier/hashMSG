import UserAvatar from './UserAvatar';
import { useNavigate } from 'react-router-dom';

const UserConversationBar = (props) => {
  let navigate = useNavigate();

  const openConversation = () => {
    navigate(`/conversation/${props.userProfileData.friendUsername}`, {
      replace: true,
      state: {
        friendUsername: props.userProfileData.friendUsername,
        friendPublicKey: props.userProfileData.friendPublicKey,
      },
    });
  };

  return (
    <div
      className='h-[90px] w-[70px] cursor-pointer'
      onClick={openConversation}
    >
      <UserAvatar userProfileData={props.userProfileData} />
      <h1 className='w-[70px] text-center'>
        {props.userProfileData.friendUsername}
      </h1>
    </div>
  );
};

export default UserConversationBar;
