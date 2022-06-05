const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const aleph = require('aleph-js');

const User = require('../models/user');

exports.user_sign_up = (req, res, next) => {
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (!user) {
        bcrypt
          .hash(req.body.password, 10)
          .then((hash) => {
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
          })
          .catch((error) => {
            console.log(error);
            res.status(500).json({ message: 'Something went wrong.' });
          });
      } else {
        res
          .status(403)
          .json({ message: 'Cannot create user with this username.' });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: 'Something went wrong.' });
    });
};

exports.user_login = (req, res, next) => {
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: 'Unauthorized. Invalid authentication credentials.',
        });
      } else {
        bcrypt
          .compare(req.body.password, user.password)
          .then((result) => {
            if (!result) {
              return res.status(401).json({
                message: 'Unauthorized. Invalid authentication credentials.',
              });
            } else {
              const userData = {
                _id: user._id,
                username: user.username,
                private_key: user.private_key,
                public_key: user.public_key,
                mnemonics: user.mnemonics,
                address: user.address,
                friends_list: user.friends_list,
              };

              return res.status(200).json({ message: 'Logged in', userData });
            }
          })
          .catch((error) => {
            console.log(error);
            res.status(500).json({ message: 'Something went wrong.' });
          });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: 'Something went wrong.' });
    });
};

exports.user_add_friend = (req, res, next) => {
  User.findOne({ username: req.body.username })
    .then((user) => {
      User.findOne({ username: req.body.friendUsername })
        .then((friend) => {
          if (!friend) {
            return res
              .status(401)
              .json({ message: "User with this username doesn't exist." });
          } else {
            var friendCredits = {
              friendUsername: friend.username,
              friendPublicKey: friend.public_key,
            };

            User.updateOne(
              { username: req.body.username },
              { $push: { friends_list: friendCredits } }
            ).then(() => {
              res.status(201).json({
                message: 'User added to friends list.',
              });
            });
          }
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
