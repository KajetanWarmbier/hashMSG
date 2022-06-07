const MessageFriend = (props) => {
  return (
    <div className='bg-white bg-opacity-60 min-h-[45px] max-w-fit rounded-b-2xl rounded-tr-2xl'>
      <div className='flex items-center'>
        <h1 className='text-black m-3'>{props.messageContent}</h1>
      </div>
    </div>
  );
};

export default MessageFriend;
