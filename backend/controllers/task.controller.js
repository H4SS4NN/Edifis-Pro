const Task = require("../models/Task");
const User = require("../models/User");

// CRUD identique à `users`
exports.createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getTaskById = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (!task) return res.status(404).json({ message: "Tâche non trouvée" });
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (!task) return res.status(404).json({ message: "Tâche non trouvée" });

        await task.update(req.body);
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (!task) return res.status(404).json({ message: "Tâche non trouvée" });

        await task.destroy();
        res.json({ message: "Tâche supprimée" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



// Assigner une tâche à un ouvrier
exports.assignTask = async (req, res) => {
    try {
        const { taskId, userId } = req.body;

        if (!taskId || !userId) {
            return res.status(400).json({ message: "L'ID de la tâche et de l'utilisateur sont requis" });
        }

        const task = await Task.findByPk(taskId);
        if (!task) return res.status(404).json({ message: "Tâche non trouvée" });

        const user = await User.findByPk(userId);
        if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

        task.user_id = userId;
        await task.save();

        res.json({ message: "Tâche assignée avec succès", task });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};