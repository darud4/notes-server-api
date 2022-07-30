const [sequelize, Sequelize] = require('../dbConfig');

const Note = sequelize.define('note', {
  title: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  text: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  isPinned: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  uid: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

sequelize.sync();

module.exports = Note;
