var express = require('express');
var router = express.Router();
const {
  getMovie,
  getMovieById,
  getRecommendation,
} = require('../controllers/movie');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Weekly Web Movie API' });
});

router.get('/movies', getMovie);
router.get('/movies/:id', getMovieById);
router.get('/recommendation/:userId', getRecommendation);

module.exports = router;
