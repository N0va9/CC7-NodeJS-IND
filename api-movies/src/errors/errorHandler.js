function errorHandler(err, req, res, next) {
    let status = err.statusCode || 500;
    let code = err.code || "INTERNAL_SERVER_ERROR";
    let message = err.message || "Internal server error";

    // Erreur Mongoose avec ID invalide
    if (err.name == "CastError") {
        status = 400;
        code = "INVALID_ID";
        message = "Invalid ID"
    }

    // Erreur Mongoose, erreur de schéma
    if (err.name == "ValidationError") {
        status = 400;
        code = "VALIDATION_ERROR";
        message = "Invalid data"
    }

    // Erreur MongoDB avec valeur unique déjà existante
    if (err.code == 11000) {
        status = 409;
        code = "DUPLICATE_KEY";
        message = "The key already exists";
    }

    res.status(status).json({
        status,
        code,
        message,
    });

}

module.exports = errorHandler;