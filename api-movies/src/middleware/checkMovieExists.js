const Movie = require("../models/Movie")
const AppError = require("../errors/AppError");

const checkMovieExists = async (req, res, next) => {
    try {
        const movieId = req.params.id;
        const movie = await Movie.findById(movieId);

        if(!movie){
            throw new AppError(
                404,
                `MOVIE_NOT_FOUND`,
                `Movie not found`
            ); 
        }

        next();
    } catch(err) {
        next(err);
    }
};

module.exports = checkMovieExists;