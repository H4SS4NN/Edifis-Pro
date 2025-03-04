const ConstructionSite = require("../models/ConstructionSite");

// Créer un chantier
exports.createConstructionSite = async (req, res) => {
    try {
        const site = await ConstructionSite.create(req.body);
        res.status(201).json(site);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Récupérer tous les chantiers
exports.getAllConstructionSites = async (req, res) => {
    try {
        const sites = await ConstructionSite.findAll();
        res.json(sites);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Récupérer un chantier par ID
exports.getConstructionSiteById = async (req, res) => {
    try {
        const site = await ConstructionSite.findByPk(req.params.id);
        if (!site) return res.status(404).json({ message: "Chantier non trouvé" });
        res.json(site);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Mettre à jour un chantier
exports.updateConstructionSite = async (req, res) => {
    try {
        const site = await ConstructionSite.findByPk(req.params.id);
        if (!site) return res.status(404).json({ message: "Chantier non trouvé" });

        await site.update(req.body);
        res.json(site);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Supprimer un chantier
exports.deleteConstructionSite = async (req, res) => {
    try {
        const site = await ConstructionSite.findByPk(req.params.id);
        if (!site) return res.status(404).json({ message: "Chantier non trouvé" });

        await site.destroy();
        res.json({ message: "Chantier supprimé" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
