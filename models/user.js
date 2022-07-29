const bcrypt = require('bcryptjs');
const [sequelize, Sequelize] = require('../dbConfig');
const AuthError = require('../errors/AuthError');
const { ERRMSG_LOGIN_ERROR } = require('../utils/errorTexts');

const User = sequelize.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

User.findUserByCredentials = function findUserByCredentials(email, password) {
  return User.findOne({ where: { email } })
    .then((user) => {
      if (!user) throw new AuthError(ERRMSG_LOGIN_ERROR);

      return bcrypt.compare(password, user.password)
        .then((matched) => ((matched) ? user : Promise.reject(new AuthError(ERRMSG_LOGIN_ERROR))));
    });
};

sequelize.sync();

module.exports = User;
