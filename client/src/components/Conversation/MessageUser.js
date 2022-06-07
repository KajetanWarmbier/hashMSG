const MessageUser = (props) => {
  return (
    <div className='bg-black bg-opacity-60 min-h-[45px] max-w-fit rounded-t-2xl rounded-bl-2xl justify-self-end'>
      <div className='flex items-center'>
        <h1 className='text-white m-3'>{props.messageContent}</h1>
      </div>
    </div>
  );
};

export default MessageUser;
