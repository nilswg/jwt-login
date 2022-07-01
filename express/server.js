// @ts-check

import express from 'express';
import jwt from 'jsonwebtoken';
import { config } from './config.js';
import { Model } from './model.js';

const model = new Model();

const app = express();

app.use(express.json());

app.post('/ping', (req, res) => {
  res.status(200).json({ message: 'pong' });
});

app.post('/login', async(req, res) => {
  /**
   * 登入驗證使用者的有效性，成功則頒發新的token
   */
  const userInfo = {
    username: req.body.username,
    password: req.body.password,
  };

  console.log(userInfo);

  const users = await model.queryUser(userInfo);
  if (!users.length && !users[0]){
    console.error("獲取使用者失敗")
  }

  const user = users[0] ?? '';

  const accessToken = jwt.sign(user, config.ACCESS_TOKEN_SECRET, {
    expiresIn: '15s',
  });

  const refreshToken = jwt.sign(user, config.REFRESH_TOKEN_SECRET); // for permant

  res
    .status(200)
    .json({ accessToken: accessToken, refreshToken: refreshToken });

});

// app.post('/post', authenticationMiddleware, async (req, res) => {
//   /**
//    * 通過 JWT 的驗證後，可以對使用者的請求進行處理。
//    */
//   const userInfo = {
//     username: req.body.username,
//     password: req.body.password,
//   };

//   const user = (await model.queryUser(userInfo))[0];

//   res.status(200).json(user);
// });

// function authenticationMiddleware(req, res, next) {
//   const token = req.headers['authorization'].split(' ')[1] ?? '';
//   const secret = config.ACCESS_TOKEN_SECRET;

//   /**
//    * 透過 jwt驗證，secret是私鑰可用來解碼。
//    * token 當使用者發送請求時，會連同cookie一起附上，並送至後端。
//    */
//   jwt.verify(token, secret, (err, decoded) => {
//     if (err) {
//       console.error(err);
//     }

//     req.user = decoded;
//     next();
//   });
// }

app.listen(3002);
console.log('start server');
