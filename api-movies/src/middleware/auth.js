const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
    const header = req.headers.authorization;

    if (!header?.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Authentification required" });
    }

    const token = header.slice(7);

    try {
        const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET); // Rejette les tokens manquants, invalides ou expirés avant d'exécuter une route protégée.

        req.auth = {
            netizenId: payload.sub,
            role: payload.role,
        };

        return next();
    } catch {
        return res.status(401).json({ message: "Invalid or expired token"});
    }
}

module.exports = verifyToken;