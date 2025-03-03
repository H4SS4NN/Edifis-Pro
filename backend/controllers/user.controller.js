const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

// Inscription (Création de compte avec JWT)
exports.createUser = async (req, res) => {
    try {
        // Seul un Responsable (role_id = 1) peut créer un utilisateur
        if (req.user.role !== 1) {
            return res.status(403).json({ message: "Accès refusé. Seul un Responsable peut créer un utilisateur" });
        }

        const { firstname, lastname, email, password, role_id } = req.body;

        if (!firstname || !lastname || !email || !password || !role_id) {
            return res.status(400).json({ message: "Tous les champs sont requis" });
        }

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "Cet email est déjà utilisé" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            firstname,
            lastname,
            email,
            password: hashedPassword,
            role_id
        });

        res.status(201).json({ message: "Utilisateur créé avec succès", user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Connexion (Login)
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email et mot de passe requis" });
        }

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: "Utilisateur non trouvé" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Mot de passe incorrect" });
        }

        // Générer un token JWT
        const token = jwt.sign(
            { userId: user.user_id, role: user.role_id },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.json({ message: "Connexion réussie", token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Récupérer tous les utilisateurs (sans afficher le mot de passe)
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ["password"] }
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Récupérer un utilisateur par ID (sans afficher le mot de passe)
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, {
            attributes: { exclude: ["password"] }
        });
        if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Mettre à jour un utilisateur (avec hash si le mdp est modifié)
exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

        const { firstname, lastname, email, password, role_id } = req.body;

        if (password) {
            req.body.password = await bcrypt.hash(password, 10);
        }

        await user.update(req.body);
        res.json({ message: "Utilisateur mis à jour", user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Supprimer un utilisateur
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

        await user.destroy();
        res.json({ message: "Utilisateur supprimé" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
