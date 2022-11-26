// save request
const db = require('../models/userModels');

const requestController = {};

requestController.saveRequest = async (req, res, next) => {
  const { username, code, translation } = req.body;
  // query db to find correct user
  // create new request model
  // add code and translation to request model
  // add connection between user and request with association -> user.hasMany(request)
};

// get all requests of a user
requestController.getRequests = async (req, res, next) => {
  const { username } = req.body;
  // query db to find correct user
  // query db to find all requests in request table associated with user
  // add json object to res.locals with all requests
};

// delete request of a user
requestController.deleteRequest = async (req, res, next) => {
  const { username, code, translation } = req.body;
  // query db to find request with code and/or translation provided
  // delete that request
};

module.exports = requestController;
