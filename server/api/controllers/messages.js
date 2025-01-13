const aleph = require('aleph-js');

exports.send_message = (req, res, next) => {
  const message = req.body.message;
  const post_type = req.body.post_type;
  const friendPublicKey = req.body.friendPublicKey;

  const channel = 'CONVERSATIONS';
  const api_server = 'https://api2.aleph.im';

  aleph.ethereum
    .import_account({ mnemonics: req.body.mnemonics })
    .then((account) => {
      aleph.encryption
        .encrypt(friendPublicKey, message, {
          curve: 'secp256k1',
        })
        .catch((error) => {
          console.error(error);
          res.status(500).json({ message: 'Something went wrong.' });
        })
        .then((messageForFriend) => {
          aleph.encryption
            .encrypt_for_self(account, message)
            .then((messageForUser) => {
              aleph.posts
                .submit(
                  account.address,
                  post_type,
                  {
                    receiver_message: messageForFriend,
                    sender_message: messageForUser,
                  },
                  {
                    api_server: api_server,
                    account: account,
                    channel: channel,
                  }
                )
                .catch((error) => {
                  console.error(error);
                  res.status(500).json({ message: 'Something went wrong.' });
                })
                .then(res.status(201).json({ message: 'Message sent!' }))
                .catch((error) => {
                  console.error(error);
                  res.status(500).json({ message: 'Something went wrong.' });
                });
            });
        });
    });
};

exports.get_messages = (req, res, next) => {
  const post_type = req.body.post_type;
  const api_server = 'https://api2.aleph.im';
  const userAddress = req.body.address;
  const messages = [];

  aleph.ethereum
    .import_account({ mnemonics: req.body.mnemonics })
    .then((account) => {
      aleph.posts
        .get_posts(post_type, api_server)
        .then((result) => {
          for (const post of result.posts) {
            if (post.sender === userAddress) {
              const sender_user = post.sender;
              aleph.encryption
                .decrypt(account, post.content.sender_message)
                .then((decryptedMessage) => {
                  messages.push({
                    sender: sender_user,
                    message: decryptedMessage,
                  });
                })
                .catch((error) => {
                  console.error(error);
                  res.status(500).json({ message: 'Something went wrong.' });
                });
            } else if (post.sender !== userAddress) {
              const sender_friend = post.sender;
              aleph.encryption
                .decrypt(account, post.content.receiver_message)
                .then((decryptedMessage) => {
                  messages.push({
                    sender: sender_friend,
                    message: decryptedMessage,
                  });
                })
                .catch((error) => {
                  console.error(error);
                  res.status(500).json({ message: 'Something went wrong.' });
                });
            }
          }
        })
        .then(() => res.status(201).json({ messages: messages }))
        .catch((error) => {
          console.error(error);
          res.status(500).json({ message: 'Something went wrong.' });
        });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: 'Something went wrong.' });
    });
};
