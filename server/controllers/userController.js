const db = require('../models/userModels');

const userController = {};

userController.createUser = async (req, res, next) => {
  const { username, password, email } = req.body;
  console.log(req.body);
  if (!username || !password) {
    return next({
      log: 'Error in userController.createUser: username or password not provided',
      status: 403,
      message: { err: 'username and pw not provided' },
    });
  }
  try {
    const user = db.User.build({
      username,
      password,
      email,
    });
    await user.save();
    return next();
  } catch (error) {
    return next({
      log: 'Error in userController.createUser: error creating user',
      message: { err: error },
    });
  }
};

userController.login = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return next({
      log: 'Error in userController.login: username and password not provided',
      status: 403,
      message: { err: 'username and pw not provided' },
    });
  }
  try {
    const user = await db.User.findAll({
      where: {
        username,
      },
    });
    if (user[0].password === password) {
      res.locals.user = user[0].username;
      return next();
    }
    return res.status(403).send('Incorrect username or password');
  } catch (error) {
    return res.status(403).send('Incorrect username or password');
  }
};

module.exports = userController;
