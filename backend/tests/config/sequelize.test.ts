import initDB from "../../config/sequelize";
import sequelize from "../../config/database";

// Simulation du module database pour contrôler les méthodes authenticate et sync
jest.mock("../../config/database", () => ({
    authenticate: jest.fn(),
    sync: jest.fn(),
  }));
  
// Simulation du module des modèles pour éviter de charger des dépendances inutiles
jest.mock("../../models/index", () => ({}));

describe("Initialisation de la BDD dans sequelize.js", () => {
  const originalExit = process.exit;
  let consoleLogSpy: jest.SpyInstance;
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    consoleLogSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    // On remplace process.exit pour empêcher l'arrêt du process pendant le test
    process.exit = jest.fn() as any;
  });

  afterAll(() => {
    process.exit = originalExit;
  });

  it("devrait authentifier et synchroniser la base de données avec succès", async () => {
    // On simule une authentification et synchronisation réussies
    (sequelize.authenticate as jest.Mock).mockResolvedValue(undefined);
    (sequelize.sync as jest.Mock).mockResolvedValue(undefined);

    await initDB();

    expect(sequelize.authenticate).toHaveBeenCalled();
    expect(sequelize.sync).toHaveBeenCalledWith({ force: true });
    expect(consoleLogSpy).toHaveBeenCalledWith(" Connexion à la base de données réussie !");
    expect(consoleLogSpy).toHaveBeenCalledWith("Synchronisation des modèles Sequelize réussie !");
    expect(process.exit).not.toHaveBeenCalled();
  });

  it("devrait enregistrer l'erreur et appeler process.exit en cas d'échec de l'authentification", async () => {
    const error = new Error("Authentication failed");
    (sequelize.authenticate as jest.Mock).mockRejectedValue(error);

    await initDB();

    expect(sequelize.authenticate).toHaveBeenCalled();
    expect(consoleErrorSpy).toHaveBeenCalledWith(" Erreur de connexion à la base de données :", error);
    expect(process.exit).toHaveBeenCalledWith(1);
  });
});
