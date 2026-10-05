const makeCrudController = require('./genericController');
const artistRepository = require('../repositories/artistRepository');
const Artist = require('../models/Artist');
const Movie = require('../models/Movie');
const escapeRegex = require('../utils/utils');
const AppError = require("../errors/AppError");
const Role = require('../models/Role');

const artistController = makeCrudController({
    repository: artistRepository,
    resourceName: 'Artist'
})

artistController.publicGetAll = async (req, res, next )=> {
    try {
        // Recherche optionnelle
        const {search, realisators } = req.query;

        // Pagination
        const page = Math.max(Number.parseInt(req.query.page, 10) || 1, 1);
        const limit = Math.min(Math.max(Number.parseInt(req.query.limit, 10) || 10, 1), 100);


        const filter = {};

        if (search) {
            const searchValue = escapeRegex(search);

            filter.$or = [ // "i" pour ignorer majuscules/minuscules
                {firstName: { $regex: searchValue, $options: "i"}}, 
                {lastName: { $regex: searchValue, $options: "i"}},
            ]
        }

        // Vérifier qu'un film est présent dans movieIds
        switch(realisators) {
            case "yes": // Afficher que les réalisateurs
                filter.movieIds = { // Vérification que movieIds est non null
                    $exists: true,
                    $ne: [] // vérifie que c'est différent de la liste vide
                }
                break;

            case "no": // Afficher que les non-réalisateurs
                filter.movieIds = { // Vérification que movieIds est vide
                    $exists: true,
                    $eq: []
                }
                break;

            case "all": // Afficher les artistes (réalisateurs et non-réalisateurs)
                break;
            
            default: // Non reconnu -> erreur
                throw new AppError(
                    400,
                    `VALIDATION_ERROR`,
                    `Invalid state: realisators must be 'yes', 'no' or 'all'`
                );
        }


        let selectFields = "";

        if(req.auth.role === "USER") {
            selectFields = "-_id -__v -createdAt -updatedAt -movieIds"
        }

        const [artists, total] = await Promise.all([
            Artist.find(filter)
            .select(selectFields)
            .sort({ createdAt: -1})
            .skip((page - 1) * limit)
            .limit(limit)
            .lean(),
            Artist.countDocuments(filter),
        ])

        return res.status(200).json({
            data: artists,

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



artistController.getAllMoviesRealised = async (req, res, next)=> {
    try {
        // Pagination
        const page = Math.max(Number.parseInt(req.query.page, 10) || 1, 1);
        const limit = Math.min(Math.max(Number.parseInt(req.query.limit, 10) || 10, 1), 100);


        // On récupère l'artiste concerné
        const artistFound = await Artist.findById(req.params.id)
            .select("movieIds")
            .lean();

        if (!artistFound) { // Si artiste non trouvé
            throw new AppError(
                404,
                `ARTIST_NOT_FOUND`,
                `Artist not found`
            );
        };
        

        if (!artistFound?.movieIds?.length){
            // Si la liste est vide, on renvoie une liste vide
            return res.status(200).json({
                data: [],
                pagination: {
                    page,
                    limit,
                    total: 0, 
                    totalPages: 0,
                    hasNextPages: false,
                    hasPreviousPage: false,
                },
            });

        }

        const filter = {
            _id: {
                $in: artistFound.movieIds,
            },
        };

        const [movies, total] = await Promise.all([
            Movie.find(filter)
            .select("")
            .sort({ createdAt: -1})
            .skip((page - 1) * limit)
            .limit(limit)
            .lean(),
            Movie.countDocuments(filter),
        ]);

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


artistController.getDetails = async (req, res, next)=> {
    try {

        // On récupère l'artiste concerné et on vérifie que l'id existe
        const artistFound = await Artist.findById(req.params.id)
            .populate({ // Afficher les infos des films réalisés
                path: "movieIds",
                select: "-createdAt -updatedAt -__v -_id"
            })
            .select("-createdAt -updatedAt -__v -_id")
            .lean();

        if (!artistFound) { // Si artiste non trouvé
            throw new AppError(
                404,
                `ARTIST_NOT_FOUND`,
                `Artist not found`
            );
        };

        //Changement de nom de clé pour que ce soit plus clair
        artistFound.moviesRealised = artistFound.movieIds;
        delete artistFound.movieIds;

        // Liste des films dans lesquels il a joué
        const moviesPlayedList = await Role.find({
            artistId: {
                $in: req.params.id,
            }
        })
        .populate({
            path: "movieId",
            select: "title year genre resume countries -_id"
        })
        .select("role")
        .lean();



        // Nettoyage de la sortie pour récupérer que les données qui nous intéressent
        let cleanedList = [];
        moviesPlayedList.forEach(movie => {
            let actualMovie = {};
            actualMovie.title = movie.movieId.title;
            actualMovie.year = movie.movieId.year;
            actualMovie.genre = movie.movieId.genre;
            actualMovie.resume = movie.movieId.resume;
            actualMovie.countries = movie.movieId.countries;
            actualMovie.role = movie.role;
            cleanedList.push(actualMovie);
        });

        // On ajoute notre liste propre à notre élément
        artistFound.moviesPlayed = cleanedList;


        // Envoi du résultat
        res.status(200).json(artistFound);


    } catch(err) {
        next(err);
    }
};




module.exports = artistController;