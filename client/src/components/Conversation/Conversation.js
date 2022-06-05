import { useNavigate, useLocation } from 'react-router-dom';

const Conversation = (props) => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { friendUsername, friendPublicKey } = state;

  console.log(friendUsername);

  const backToHome = () => {
    navigate('/home', { replace: true });
  };

  return (
    <div>
      <button onClick={backToHome}>I want back</button>

      <h1>Hello to friend named: {friendUsername}</h1>
      <h1>Friend's public key: {friendPublicKey}</h1>
    </div>
  );
};

export default Conversation;
