const { PORT = 3000, NOTES = 'http://notes:3001' } = process.env;

module.exports.CONFIG = {
  port: PORT,
  devSecret: 'very-very-very-ohhhhh-so-very-secret-key',
  notesService: NOTES,
};
