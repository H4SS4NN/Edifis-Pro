const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Accès refusé. Token manquant" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Token invalide" });
    }
};

// Middleware pour vérifier si l'utilisateur est Admin
const isAdmin = (req, res, next) => {
    if (req.user.role !== "Admin") {
        return res.status(403).json({ message: "Accès refusé. Seul un Admin peut accéder à ces options." });
    }
    next();
};

// Middleware pour vérifier si l'utilisateur est Worker
const isWorker = (req, res, next) => {
    if (req.user.role !== "Worker") {
        return res.status(403).json({ message: "Accès refusé. Seul un Worker peut accéder à ces options." });
    }
    next();
};

// Middleware pour vérifier si l'utilisateur est Manager
const isManager = (req, res, next) => {
    if (req.user.role !== "Manager") {
        return res.status(403).json({ message: "Accès refusé. Seul un Manager peut accéder à ces options." });
    }
    next();
};

module.exports = { protect, isAdmin, isWorker, isManager };
