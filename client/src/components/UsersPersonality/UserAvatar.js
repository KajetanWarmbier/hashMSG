const UserAvatar = (props) => {
  return (
    <div className='h-[70px] w-[70px] rounded-xl bg-gray-200 bg-opacity-50 hover:bg-opacity-70 flex items-center justify-center cursor-pointer'>
      <img
        width='60px'
        height='60px'
        src={`https://avatars.dicebear.com/api/bottts/${props.userProfileData.friendUsername}.svg`}
        alt={`${props.userProfileData} Avatar`}
      ></img>
    </div>
  );
};

export default UserAvatar;
