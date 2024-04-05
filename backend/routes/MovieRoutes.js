import express from "express";

const router = express.Router();

//controllers

import {
  getAllMovies,
  createMovie,
  updateMovie,
  getSpecificMovie,
  movieReview,
  deleteMovie,
  deleteReview,
  getNewMovies,
  getTopMovies,
  getRandomMovies,
} from "../controllers/movieController.js";
// middlewares

import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

import checkId from "../middlewares/checkId.js";

// public routes

router.get("/specific-movie/:id", getSpecificMovie);
router.get("/all-movies", getAllMovies);

// RTK Query Endpoints

router.get("/new-movies", getNewMovies);

router.get("/top-movies", getTopMovies);
router.get("/random-movies", getRandomMovies);

//restricted routes

router.post("/:id/reviews", authenticate, checkId, movieReview);

// router.delete('/:id/')

//Admin Routes

router.post("/create-movie", authenticate, authorizeAdmin, createMovie);
router.put("/update-movie/:id", authenticate, authorizeAdmin, updateMovie);
router.delete("/delete-movie/:id", authenticate, authorizeAdmin, deleteMovie);
router.delete("/delete-review", authenticate, authorizeAdmin, deleteReview);

export default router;
