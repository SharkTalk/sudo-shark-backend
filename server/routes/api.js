const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  res
    .setHeader('Access-Control-Allow-Origin', '*')
    .status(200)
    .json({ result: 'found' });
});

// ADD GET MORE CHARACTERS ROUTE HANDLER HERE

module.exports = router;
