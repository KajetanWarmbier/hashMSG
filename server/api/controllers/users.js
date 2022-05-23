const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const aleph = require('aleph-js');

const User = require('../models/user');

exports.user_sign_up = (req, res, next) => {
  User.findOne({ username: req.body.username }).then((user) => {
    if (!user) {
      bcrypt.hash(req.body.password, 10).then((hash) => {
        aleph.ethereum.new_account().then((eth_account) => {
          const user = new User({
            _id: new mongoose.Types.ObjectId(),
            username: req.body.username,
            password: hash,
            private_key: eth_account.private_key,
            public_key: eth_account.public_key,
            mnemonics: eth_account.mnemonics,
            address: eth_account.address,
            friends_list: [],
          })
            .save()
            .then(() => {
              res.status(201).json({ message: 'User created' });
            })
            .catch((err) => {
              console.log(err);
              res
                .status(500)
                .json({ message: 'Server has encountered an error.' });
            });
        });
      });
    } else {
      res
        .status(403)
        .json({ message: 'Cannot create user with this username.' });
    }
  });
};

exports.user_login = (req, res, next) => {
  res.status(200).json({ message: 'Logged in' });
};

exports.user_add_friend = (req, res, next) => {
  res.status(201).json({ message: 'Added new friend' });
};
