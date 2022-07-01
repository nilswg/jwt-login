// @ts-check

/**
 * users
 */
const users = [
  {
    user: 'tony',
    age: 18,
    password: '123',
  },
  {
    user: 'amy',
    age: 18,
    password: '456',
  },
  {
    user: 'nilson',
    age: 18,
    password: '9510',
  },
];

/**
 * Model 提供SQL語法或driver 存取資料庫內容。
 */
export class Model {
  connDataBase(userinfo) {
    console.log('與資料庫建立連接...');

    return new Promise((resolve, reject) => {
      /** conn to database with user info */

      resolve(true);
    });
  }

  async queryUser(userinfo) {
    const success = await this.connDataBase(userinfo);

    if (!success) {
      console.error('連線失敗');
      return;
    }

    return new Promise((resolve, reject) => {
      /** query database and get users data */

      resolve(
        users.filter(
          (user) =>
            user.username === userinfo.username &&
            user.password === userinfo.password
        )
      );
    });
  }
}
