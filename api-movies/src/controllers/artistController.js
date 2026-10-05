const makeCrudController = require('./genericController');
const artistRepository = require('../repositories/artistRepository');
const Artist = require('../models/Artist');
const escapeRegex = require('../utils/utils');
const AppError = require("../errors/AppError");

const artistController = makeCrudController({
    repository: artistRepository,
    resourceName: 'Artist'
})

artistController.publicGetAll = async (req, res, next )=> {
    try {
        const {search, realisators } = req.query;

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

        // Vérifier qu'un film est présent dans movieId
        switch(realisators) {
            case "yes": // Afficher que les réalisateurs
                filter.movieId = { // Vérification que movieId est non null
                    $exists: true,
                    $ne: null
                }
                break;

            case "no": // Afficher que les non-réalisateurs
                filter.movieId = { // Vérification que movieId est null
                    $exists: false
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
            selectFields = "-_id -__v -createdAt -updatedAt -movieId"
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



module.exports = artistController;