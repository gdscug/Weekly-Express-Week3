const model = require('../model');
const Movie = require('../models/movie');

exports.getMovie = async (req, res, next) => {
  try {
    const movie = await Movie.find().limit(20);

    if (!movie) {
      res.status(404).json({ message: 'Movies not found!' });
    }

    res.status(200).json({ message: 'Movies found!', movies: movie });
  } catch (error) {
    next(error);
  }
};

exports.getMovieById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const movie = await Movie.findOne({ movie_id: Number(id) });

    if (!movie) {
      res.status(404).json({ message: 'Movies not found!' });
    }

    res.status(200).json({ message: 'Movies found!', movie: movie });
  } catch (error) {
    next(error);
  }
};

exports.getRecommendation = async (req, res, next) => {
  try {
    const { userId } = req.params;

    if (Number(userId > 943) || Number(userId < 0)) {
      res.status(500).json({
        message: 'User Id cannot be greater than 943 or less than 0!',
      });
    }

    const recommendedMovie = await model.recommend(userId);

    if (!recommendedMovie) {
      res.status(404).json({ message: 'Recommended movies not found!' });
    }

    res.status(200).json({
      message: 'Recommendations found',
      recommendations: recommendedMovie,
    });
  } catch (error) {
    next(error);
  }
};
