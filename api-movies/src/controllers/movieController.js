const makeCrudController = require('./genericController');
const movieRepository = require('../repositories/movieRepository');
const Movie = require('../models/Movie');
const escapeRegex = require('../utils/utils');
const AppError = require("../errors/AppError");


const movieController = makeCrudController({
    repository: movieRepository,
    resourceName: 'Movie'
})

movieController.publicGetAll = async (req, res, next )=> {
    try {
        const {search, year } = req.query;

        const page = Math.max(Number.parseInt(req.query.page, 10) || 1, 1);
        const limit = Math.min(Math.max(Number.parseInt(req.query.limit, 10) || 10, 1), 100);


        const filter = {};

        if (search) {
            const searchValue = escapeRegex(search);

            filter.$or = [ // "i" pour ignorer majuscules/minuscules
                {title: { $regex: searchValue, $options: "i"}}, 
                {genre: { $regex: searchValue, $options: "i"}},
            ]
        }

        if (year !== undefined) {
            const intYear = Number(year);
            if (!Number.isInteger(intYear)) {
                throw new AppError(
                    400,
                    `VALIDATION_ERROR`,
                    `Year must be an integer`
                );
            }

            filter.year = intYear;
        }

        const [movies, total] = await Promise.all([
            Movie.find(filter)
            .select("-_id")
            .select("-__v")
            .select("-createdAt")
            .select("-updatedAt")
            .sort({ createdAt: -1})
            .skip((page - 1) * limit)
            .limit(limit)
            .lean(),
            Movie.countDocuments(filter),
        ])

        return res.status(200).json({
            data: movies,

            pagination: {
                page,
                limit,
                total, 
                totalPages: Math.ceil(total/limit),
                hasNextPages: page * limit < total,
                hasPreviousPage: page > 1,
            },
        });
    } catch(err) {
        next(err);
    }
};



module.exports = movieController;