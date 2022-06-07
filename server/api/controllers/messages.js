const aleph = require('aleph-js');

exports.send_message = (req, res, next) => {
  var message = req.body.message;
  var post_type = req.body.post_type;
  var friendPublicKey = req.body.friendPublicKey;

  var channel = 'CONVERSATIONS';
  var api_server = 'https://api2.aleph.im';

  aleph.ethereum
    .import_account({ mnemonics: req.body.mnemonics })
    .then((account) => {
      aleph.encryption
        .encrypt(friendPublicKey, message, {
          curve: 'secp256k1',
        })
        .catch((error) => {
          console.log(error);
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
                  console.log(error);
                  res.status(500).json({ message: 'Something went wrong.' });
                })
                .then(res.status(201).json({ message: 'Message sent!' }))
                .catch((error) => {
                  console.log(error);
                  res.status(500).json({ message: 'Something went wrong.' });
                });
            });
        });
    });
};

exports.get_messages = (req, res, next) => {
  var post_type = req.body.post_type;
  var api_server = 'https://api2.aleph.im';
  var userAddress = req.body.address;
  var messages = [];

  aleph.ethereum
    .import_account({ mnemonics: req.body.mnemonics })
    .then((account) => {
      aleph.posts
        .get_posts(post_type, api_server)
        .then((result) => {
          for (var post of result.posts) {
            if (post.sender === userAddress) {
              var sender_user = post.sender;
              aleph.encryption
                .decrypt(account, post.content.sender_message)
                .then((decryptedMessage) => {
                  console.log(sender_user);
                  messages.push({
                    sender: sender_user,
                    message: decryptedMessage,
                  });
                })
                .catch((error) => {
                  console.log(error);
                  res.status(500).json({ message: 'Something went wrong.' });
                });
            } else if (post.sender !== userAddress) {
              var sender_friend = post.sender;
              aleph.encryption
                .decrypt(account, post.content.receiver_message)
                .then((decryptedMessage) => {
                  console.log(sender_friend);
                  messages.push({
                    sender: sender_friend,
                    message: decryptedMessage,
                  });
                })
                .catch((error) => {
                  console.log(error);
                  res.status(500).json({ message: 'Something went wrong.' });
                });
            }
          }
        })
        .then(() => {
          console.log(messages);
          res.status(201).json({ messages: messages });
        })
        .catch((error) => {
          console.log(error);
          res.status(500).json({ message: 'Something went wrong.' });
        });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: 'Something went wrong.' });
    });
};
