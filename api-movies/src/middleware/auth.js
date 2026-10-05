const jwt = require("jsonwebtoken");
const AppError = require("../errors/AppError");

function verifyToken(req, res, next) {
    const header = req.headers.authorization;

    if (!header?.startsWith("Bearer ")) {
        throw new AppError(
            401,
            `UNAUTHORIZED_ACCESS`,
            `Authentification required`
        );
    }

    // Récupération du token
    const token = header.split(" ")[1];

    // Vérification du token
    try {
        const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET); // Rejette les tokens manquants, invalides ou expirés avant d'exécuter une route protégée.
        req.auth = {
            netizenId: payload.id,
            role: payload.role,
        };

        return next();
    } catch {
        throw new AppError(
            401,
            `UNAUTHORIZED_ACCESS`,
            `Authentification required`
        );
    }
}

module.exports = verifyToken;