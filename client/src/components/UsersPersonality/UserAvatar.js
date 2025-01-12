const UserAvatar = (props) => {
  return (
    <div className='h-[70px] w-[70px] rounded-xl bg-gray-200 bg-opacity-50 hover:bg-opacity-70 flex items-center justify-center cursor-pointer'>
      <img
        width='60px'
        height='60px'
        src={`https://api.dicebear.com/9.x/bottts/svg?seed=${props.userProfileData.friendUsername}`}
        alt={`${props.userProfileData} Avatar`}
      ></img>
    </div>
  );
};

export default UserAvatar;
