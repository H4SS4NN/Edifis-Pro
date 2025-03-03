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
const isAdmin = (req, res, next) => {
    if (req.user.role !== 1) {
        return res.status(403).json({ message: "Accès refusé. Seul un Responsable peut créer un utilisateur" });
    }
    next();
};

module.exports = { protect, isAdmin };