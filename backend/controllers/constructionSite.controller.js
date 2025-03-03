const ConstructionSite = require("../models/ConstructionSite");
const User = require("../models/User");


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


// Assigner un chantier à un chef de chantier
exports.assignConstructionSite = async (req, res) => {
    try {
        const { siteId, chefId } = req.body;

        if (!siteId || !chefId) {
            return res.status(400).json({ message: "L'ID du chantier et du chef de chantier sont requis" });
        }

        const site = await ConstructionSite.findByPk(siteId);
        if (!site) return res.status(404).json({ message: "Chantier non trouvé" });

        const chef = await User.findByPk(chefId);
        if (!chef || chef.role_id !== 2) {
            return res.status(400).json({ message: "L'utilisateur spécifié n'est pas un chef de chantier" });
        }

        site.chef_id = chefId;
        await site.save();

        res.json({ message: "Chantier assigné avec succès", site });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};