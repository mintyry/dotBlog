const router = require('express').Router();
const apiRoutes = require('./api');
const htmlRoutes = require('./htmlRoutes')

//prepend all api routes with /api
router.use('/api', apiRoutes);

//prepend all pages for html site
router.use('/', htmlRoutes);

//in case user hits a route that doesnt exist
router.use((req, res) => {
  res.send("<h1>Route does not exist.</h1>")
});

module.exports = router;