// import asyncHandler from "../middlewares/asyncHandler.js";
import Movie from "../models/Movie.js";

export const getAllMovies = async (req, res) => {
  try {
    const allMovies = await Movie.find();
    res.json(allMovies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createMovie = async (req, res) => {
  try {
    const newMovie = new Movie(req.body);
    const savedMovie = await newMovie.save();

    res.json(savedMovie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSpecificMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id);
    if (!movie) {
      res.status(404).json({ error: "Movie not found" });
    }
    res.json(movie);
  } catch (error) {
    res.json({ error: error.message });
  }
};

export const updateMovie = async (req, res) => {
  try {
    // const {
    //   name,
    //   image,
    //   year,
    //   genre,
    //   detail,
    //   cast,
    //   reviews,
    //   numReviews,
    //   createdAt,
    // } = req.body;
    const { id } = req.params;

    const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updateMovie) {
      res.status(404).json("Movie not found");
    }
    // (movie.name = name),
    //   (movie.image = image),
    //   (movie.year = year),
    //   (movie.genre = genre),
    //   (movie.detail = detail),
    //   (movie.cast = cast),
    //   (movie.reviews = reviews),
    //   (movie.numReviews = numReviews),
    //   (movie.createdAt = createdAt);
    // const updatedMovie = await movie.save();
    res.json(updatedMovie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const movieReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const movie = await Movie.findById(req.params.id);

    if (movie) {
      const alreadyReviewed = movie.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );

      if (alreadyReviewed) {
        res.status(400);
        throw new Error("Movie already reviewed");
      }

      const review = {
        name: req.user.username,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };
      movie.reviews.push(review);
      movie.numReviews = movie.reviews.length;

      movie.rating =
        movie.reviews.length > 0
          ? movie.reviews.reduce((acc, item) => item.rating + acc, 0) /
            movie.reviews.length
          : 0;
      await movie.save();
      res.status(201).json({ message: "Review Added" });
    } else {
      res.status(404);
      throw new Error("Movie not found");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findByIdAndDelete(id);

    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    res.json(`${movie.name} deleted successfully`);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const { movieId, reviewId } = req.body;
    const movie = await Movie.findById(movieId);

    if (!movie) {
      res.status(404);
      throw new Error("Movie not found");
    }

    const reviewIndex = movie.reviews.findIndex(
      (r) => r._id.toString() === reviewId
    );

    if (reviewIndex === -1) {
      res.status(404);
      throw new Error("Review not found");
    }

    movie.reviews.splice(reviewIndex, 1);
    movie.numReviews = movie.reviews.length;

    movie.rating =
      movie.reviews.length > 0
        ? movie.reviews.reduce((acc, item) => item.rating + acc, 0) /
          movie.reviews.length
        : 0;
    await movie.save();
    res.json({ message: "Review deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getNewMovies = async (req, res) => {
  try {
    const newMovies = await Movie.find().sort({ year: -1 }).limit(10);

    res.json(newMovies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTopMovies = async (req, res) => {
  try {
    const topRatedMovies = await Movie.find()
      .sort({ numReviews: -1 })
      .limit(10);

    res.json(topRatedMovies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getRandomMovies = async (req, res) => {
  try {
    const randomMovies = await Movie.aggregate([{ $sample: { size: 10 } }]);

    res.json(randomMovies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
