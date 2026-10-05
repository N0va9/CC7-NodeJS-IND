// Middleware s'exécutant après verifyToken 
// Va nous permettre de vérifier le rôle de l'utilisateur connecté et voir s'il a les droits pour cette ressource
const AppError = require("../errors/AppError");

const authorizeNetizenRoles = (...allowedRoles) => {
    return (req, res, next) => {
        // On vérifie si le rôle de l'utilisateur actuel est dans la liste de ceux autorisés
        // pour accéder à la route
        if (!allowedRoles.includes(req.auth.role)) {
            throw new AppError(
                403,
                `FORBIDDEN_ACCESS`,
                `You don't have the right to access at this resource`
            );
        }
        return next();
    }
}

module.exports = authorizeNetizenRoles;