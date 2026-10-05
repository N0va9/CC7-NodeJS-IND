const makeCrudController = require('./genericController');
const movieRepository = require('../repositories/movieRepository');
const Movie = require('../models/Movie');
const Mark = require('../models/Mark');
const escapeRegex = require('../utils/utils');
const AppError = require("../errors/AppError");
const Artist = require('../models/Artist');
const Role = require('../models/Role');


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

        let selectFields = "";

        if(req.auth.role === "USER") {
            selectFields = "-_id -__v -createdAt -updatedAt"
        }

        const [movies, total] = await Promise.all([
            Movie.find(filter)
            .select(selectFields)
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


movieController.getAllRatings = async (req, res, next)=> {
    try {
        // Pagination
        const page = Math.max(Number.parseInt(req.query.page, 10) || 1, 1);
        const limit = Math.min(Math.max(Number.parseInt(req.query.limit, 10) || 10, 1), 100);


        // On récupère le film concerné et on vérifie que l'id existe
        const movieFound = await Movie.findById(req.params.id);

        if (!movieFound) { // Si film non trouvé
            throw new AppError(
                404,
                `MOVIE_NOT_FOUND`,
                `Movie not found`
            );
        };
        
        // On cherche par rapport à l'id du 
        const filter = {
            movieId: {
                $in: movieFound._id,
            },
        };

        const [marks, total] = await Promise.all([
            Mark.find(filter)
            .select("")
            .sort({ createdAt: -1})
            .skip((page - 1) * limit)
            .limit(limit)
            .lean(),
            Mark.countDocuments(filter),
        ]);

        return res.status(200).json({
            data: marks,

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


movieController.getDetails = async (req, res, next)=> {
    try {

        // On récupère le film concerné et on vérifie que l'id existe
        const movieFound = await Movie.findById(req.params.id)
            .populate({ // Afficher les infos des pays
                path: "countries",
                select: "-createdAt -updatedAt -__v"
            })
            .select("-createdAt -updatedAt -__v")
            .lean();

        if (!movieFound) { // Si film non trouvé
            throw new AppError(
                404,
                `MOVIE_NOT_FOUND`,
                `Movie not found`
            );
        };        

        // Liste des réalisateurs du film
        const artistsWhoRealisedThisMovie = await Artist.find({
            movieIds: {
                $in: req.params.id,
            }
        })
        .select("-_id -movieIds -createdAt -updatedAt -__v")
        .lean();

        movieFound.realisators = artistsWhoRealisedThisMovie;

        // Liste des artistes jouant un rôle dedans
        const artistsWithRoleInThisMovie = await Role.find({
            movieId: {
                $in: req.params.id,
            }
        })
        .populate({
            path: "artistId",
            select: "firstName lastName birthYear -_id"
        })
        .select("role -_id")
        .lean();

        // Nettoyage de la sortie pour récupérer que les données qui nous intéressent
        let cleanedList = [];
        artistsWithRoleInThisMovie.forEach(artist => {
            let actualArtist = {};
            actualArtist.firstName = artist.artistId.firstName;
            actualArtist.lastName = artist.artistId.lastName;
            actualArtist.birthYear = artist.artistId.birthYear;
            actualArtist.role = artist.role;
            cleanedList.push(actualArtist);
        });

        movieFound.artistsWithRole = cleanedList;


        // Envoi du résultat
        res.status(200).json(movieFound);


    } catch(err) {
        next(err);
    }
};



module.exports = movieController;