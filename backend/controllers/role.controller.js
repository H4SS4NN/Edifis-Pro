const Role = require("../models/Role");

const User = require("../models/User");

// Mettre à jour le rôle d'un utilisateur (Seul un Responsable peut le faire)
exports.updateUserRole = async (req, res) => {
    try {
        // Vérifie si l'utilisateur connecté est Responsable
        if (req.user.role !== 1) {
            return res.status(403).json({ message: "Accès refusé. Seul un Responsable peut modifier un rôle" });
        }

        const { userId, newRoleId } = req.body;

        if (!userId || !newRoleId) {
            return res.status(400).json({ message: "L'ID utilisateur et le nouveau rôle sont requis" });
        }

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        // Mise à jour du rôle
        await user.update({ role_id: newRoleId });

        res.json({ message: "Rôle mis à jour avec succès", user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
