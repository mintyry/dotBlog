const router = require('express').Router();
const apiRoutes = require('./api');

//prepend all api routes with /api
router.use('/api', apiRoutes);

//in case user hits a route that doesnt exist
router.use((req, res) => {
  res.send("<h1>Route does not exist.</h1>")
});

module.exports = router;