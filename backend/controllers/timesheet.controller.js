const Timesheet = require("../models/Timesheet");

// Créer une feuille de temps
exports.createTimesheet = async (req, res) => {
    try {
        const timesheet = await Timesheet.create(req.body);
        res.status(201).json(timesheet);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Récupérer toutes les feuilles de temps
exports.getAllTimesheets = async (req, res) => {
    try {
        const timesheets = await Timesheet.findAll();
        res.json(timesheets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Récupérer une feuille de temps par ID
exports.getTimesheetById = async (req, res) => {
    try {
        const timesheet = await Timesheet.findByPk(req.params.id);
        if (!timesheet) return res.status(404).json({ message: "Timesheet non trouvé" });
        res.json(timesheet);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Mettre à jour une feuille de temps
exports.updateTimesheet = async (req, res) => {
    try {
        const timesheet = await Timesheet.findByPk(req.params.id);
        if (!timesheet) return res.status(404).json({ message: "Timesheet non trouvé" });

        await timesheet.update(req.body);
        res.json(timesheet);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Supprimer une feuille de temps
exports.deleteTimesheet = async (req, res) => {
    try {
        const timesheet = await Timesheet.findByPk(req.params.id);
        if (!timesheet) return res.status(404).json({ message: "Timesheet non trouvé" });

        await timesheet.destroy();
        res.json({ message: "Timesheet supprimé" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
