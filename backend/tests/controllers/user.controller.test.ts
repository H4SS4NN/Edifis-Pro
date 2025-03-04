// ca va tester les fonctions du controller user.controller.ts 
jest.mock("jsonwebtoken", () => ({
    sign: jest.fn(),
  }));
  

import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// On importe le controller et le modèle
const User = require("../../models/User");
const userController = require("../../controllers/user.controller");

describe("User Controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  describe("createUser", () => {
    it("devrait renvoyer 400 si des champs requis sont manquants", async () => {
      req.body = { firstname: "John" }; // champs incomplets
      await userController.createUser(req as Request, res as Response);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Tous les champs sont requis" });
    });

    it("devrait renvoyer 400 si l'email est déjà utilisé", async () => {
      req.body = { firstname: "John", lastname: "Doe", email: "john@example.com", password: "secret", role_id: 1 };
      // Simuler un utilisateur existant
      User.findOne = jest.fn().mockResolvedValue({ id: 1, email: "john@example.com" });

      await userController.createUser(req as Request, res as Response);
      expect(User.findOne).toHaveBeenCalledWith({ where: { email: "john@example.com" } });
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Cet email est déjà utilisé" });
    });

    it("devrait créer un utilisateur et renvoyer un token et un status 201", async () => {
      const userInput = { firstname: "John", lastname: "Doe", email: "john@example.com", password: "secret", role_id: 1 };
      req.body = userInput;
      // Aucun utilisateur existant
      User.findOne = jest.fn().mockResolvedValue(null);
      
      // Simuler le hash du mot de passe
      const hashedPassword = "hashedSecret";
      (jest.spyOn(bcrypt, "hash") as unknown as jest.Mock).mockResolvedValue(hashedPassword);
      
      // Simuler la création d'un utilisateur
      const createdUser = { user_id: 1, ...userInput, password: hashedPassword };
      User.create = jest.fn().mockResolvedValue(createdUser);
      
      // Simuler la génération du token JWT
      const fakeToken = "fake.jwt.token";
      (jwt.sign as jest.Mock).mockReturnValue(fakeToken);

      await userController.createUser(req as Request, res as Response);

      expect(User.findOne).toHaveBeenCalledWith({ where: { email: "john@example.com" } });
      expect(bcrypt.hash).toHaveBeenCalledWith("secret", 10);
      expect(User.create).toHaveBeenCalledWith({ 
        firstname: "John",
        lastname: "Doe",
        email: "john@example.com",
        password: hashedPassword,
        role_id: 1
      });
      expect(jwt.sign).toHaveBeenCalledWith(
        { userId: createdUser.user_id, role: createdUser.role_id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ message: "Utilisateur créé", token: fakeToken, user: createdUser });
    });

    it("devrait renvoyer 500 en cas d'erreur lors de la création", async () => {
      const error = new Error("Création échouée");
      req.body = { firstname: "John", lastname: "Doe", email: "john@example.com", password: "secret", role_id: 1 };
      User.findOne = jest.fn().mockResolvedValue(null);
      User.create = jest.fn().mockRejectedValue(error);

      await userController.createUser(req as Request, res as Response);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: error.message });
    });
  });

  describe("login", () => {
    it("devrait renvoyer 400 si email ou mot de passe est manquant", async () => {
      req.body = { email: "john@example.com" }; // mot de passe manquant
      await userController.login(req as Request, res as Response);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Email et mot de passe requis" });
    });

    it("devrait renvoyer 401 si l'utilisateur n'est pas trouvé", async () => {
      req.body = { email: "john@example.com", password: "secret" };
      User.findOne = jest.fn().mockResolvedValue(null);

      await userController.login(req as Request, res as Response);
      expect(User.findOne).toHaveBeenCalledWith({ where: { email: "john@example.com" } });
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: "Utilisateur non trouvé" });
    });

    it("devrait renvoyer 401 si le mot de passe est incorrect", async () => {
      req.body = { email: "john@example.com", password: "secret" };
      // Simuler un utilisateur trouvé avec un mot de passe stocké
      const userFound = { user_id: 1, role_id: 1, password: "hashedSecret" };
      User.findOne = jest.fn().mockResolvedValue(userFound);
      
      // Simuler bcrypt.compare retournant false
      ((jest.spyOn(bcrypt, "compare") as unknown) as jest.Mock).mockResolvedValue(false);

      await userController.login(req as Request, res as Response);
      expect(bcrypt.compare).toHaveBeenCalledWith("secret", "hashedSecret");
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: "Mot de passe incorrect" });
    });

    it("devrait connecter l'utilisateur et renvoyer un token en cas de succès", async () => {
      req.body = { email: "john@example.com", password: "secret" };
      const userFound = { user_id: 1, role_id: 1, password: "hashedSecret" };
      User.findOne = jest.fn().mockResolvedValue(userFound);
      
      // Simuler un bcrypt.compare réussi
      ((jest.spyOn(bcrypt, "compare") as unknown) as jest.Mock).mockResolvedValue(true);
      
      // Simuler la génération du token JWT
      const fakeToken = "fake.jwt.token";
      (jwt.sign as jest.Mock).mockReturnValue(fakeToken);

      await userController.login(req as Request, res as Response);
      expect(bcrypt.compare).toHaveBeenCalledWith("secret", "hashedSecret");
      expect(jwt.sign).toHaveBeenCalledWith(
        { userId: userFound.user_id, role: userFound.role_id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );
      expect(res.json).toHaveBeenCalledWith({ message: "Connexion réussie", token: fakeToken });
    });

    it("devrait renvoyer 500 en cas d'erreur lors du login", async () => {
      const error = new Error("Login error");
      req.body = { email: "john@example.com", password: "secret" };
      User.findOne = jest.fn().mockRejectedValue(error);

      await userController.login(req as Request, res as Response);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: error.message });
    });
  });

  describe("getAllUsers", () => {
    it("devrait renvoyer la liste de tous les utilisateurs sans le mot de passe", async () => {
      const users = [{ id: 1, firstname: "John" }, { id: 2, firstname: "Jane" }];
      User.findAll = jest.fn().mockResolvedValue(users);

      await userController.getAllUsers(req as Request, res as Response);
      expect(User.findAll).toHaveBeenCalledWith({ attributes: { exclude: ["password"] } });
      expect(res.json).toHaveBeenCalledWith(users);
    });

    it("devrait renvoyer 500 en cas d'erreur lors de la récupération", async () => {
      const error = new Error("Retrieval error");
      User.findAll = jest.fn().mockRejectedValue(error);

      await userController.getAllUsers(req as Request, res as Response);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: error.message });
    });
  });

  describe("getUserById", () => {
    it("devrait renvoyer l'utilisateur sans le mot de passe si trouvé", async () => {
      const user = { id: 1, firstname: "John" };
      req.params = { id: "1" };
      User.findByPk = jest.fn().mockResolvedValue(user);

      await userController.getUserById(req as Request, res as Response);
      expect(User.findByPk).toHaveBeenCalledWith("1", { attributes: { exclude: ["password"] } });
      expect(res.json).toHaveBeenCalledWith(user);
    });

    it("devrait renvoyer 404 si l'utilisateur n'est pas trouvé", async () => {
      req.params = { id: "1" };
      User.findByPk = jest.fn().mockResolvedValue(null);

      await userController.getUserById(req as Request, res as Response);
      expect(User.findByPk).toHaveBeenCalledWith("1", { attributes: { exclude: ["password"] } });
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Utilisateur non trouvé" });
    });

    it("devrait renvoyer 500 en cas d'erreur lors de la récupération par ID", async () => {
      const error = new Error("Find error");
      req.params = { id: "1" };
      User.findByPk = jest.fn().mockRejectedValue(error);

      await userController.getUserById(req as Request, res as Response);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: error.message });
    });
  });

  describe("updateUser", () => {
    it("devrait mettre à jour l'utilisateur et hasher le mot de passe s'il est modifié", async () => {
      const userFound = {
        id: 1,
        firstname: "John",
        update: jest.fn().mockResolvedValue({ id: 1, firstname: "John Updated" }),
      };
      req.params = { id: "1" };
      req.body = { firstname: "John Updated", password: "newsecret" };
      User.findByPk = jest.fn().mockResolvedValue(userFound);

      const hashedPassword = "hashedNewSecret";
      (jest.spyOn(bcrypt, "hash") as unknown as jest.Mock).mockResolvedValue(hashedPassword);

      await userController.updateUser(req as Request, res as Response);
      expect(User.findByPk).toHaveBeenCalledWith("1");
      // Vérification que le mot de passe a bien été hashé et intégré dans req.body
      expect(bcrypt.hash).toHaveBeenCalledWith("newsecret", 10);
      expect(userFound.update).toHaveBeenCalledWith({ firstname: "John Updated", password: hashedPassword });
      expect(res.json).toHaveBeenCalledWith({ message: "Utilisateur mis à jour", user: userFound });
    });

    it("devrait renvoyer 404 si l'utilisateur n'est pas trouvé pour mise à jour", async () => {
      req.params = { id: "1" };
      req.body = { firstname: "John Updated" };
      User.findByPk = jest.fn().mockResolvedValue(null);

      await userController.updateUser(req as Request, res as Response);
      expect(User.findByPk).toHaveBeenCalledWith("1");
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Utilisateur non trouvé" });
    });

    it("devrait renvoyer 500 en cas d'erreur lors de la mise à jour", async () => {
      const error = new Error("Update error");
      req.params = { id: "1" };
      req.body = { firstname: "John Updated" };
      User.findByPk = jest.fn().mockRejectedValue(error);

      await userController.updateUser(req as Request, res as Response);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: error.message });
    });
  });

  describe("deleteUser", () => {
    it("devrait supprimer l'utilisateur si trouvé", async () => {
      const userFound = { id: 1, destroy: jest.fn().mockResolvedValue(undefined) };
      req.params = { id: "1" };
      User.findByPk = jest.fn().mockResolvedValue(userFound);

      await userController.deleteUser(req as Request, res as Response);
      expect(User.findByPk).toHaveBeenCalledWith("1");
      expect(userFound.destroy).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith({ message: "Utilisateur supprimé" });
    });

    it("devrait renvoyer 404 si l'utilisateur n'est pas trouvé pour suppression", async () => {
      req.params = { id: "1" };
      User.findByPk = jest.fn().mockResolvedValue(null);

      await userController.deleteUser(req as Request, res as Response);
      expect(User.findByPk).toHaveBeenCalledWith("1");
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Utilisateur non trouvé" });
    });

    it("devrait renvoyer 500 en cas d'erreur lors de la suppression", async () => {
      const error = new Error("Deletion error");
      req.params = { id: "1" };
      User.findByPk = jest.fn().mockRejectedValue(error);

      await userController.deleteUser(req as Request, res as Response);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: error.message });
    });
  });
});
