import { sequelize, User, Role, Task, Timesheet, ConstructionSite, Competence } from "../../models/index";

describe("Models Associations", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("User devrait appartenir à Role et Role devrait avoir plusieurs Users", () => {
    // Pour belongsTo, l'association sur User s'appelle "role"
    expect(User.associations).toHaveProperty("role");
    // Pour hasMany, l'association sur Role s'appelle "users"
    expect(Role.associations).toHaveProperty("users");
  });

  it("User devrait avoir plusieurs Tasks et Task devrait appartenir à User", () => {
    // L'association hasMany sur User est "Tasks"
    expect(User.associations).toHaveProperty("Tasks");
    // L'association belongsTo sur Task est "user"
    expect(Task.associations).toHaveProperty("user");
  });

  it("ConstructionSite devrait avoir plusieurs Tasks et Task devrait appartenir à ConstructionSite", () => {
    // L'association hasMany sur ConstructionSite est "Tasks"
    expect(ConstructionSite.associations).toHaveProperty("Tasks");
    // L'association belongsTo sur Task est "construction_site"
    expect(Task.associations).toHaveProperty("construction_site");
  });

  it("User devrait avoir plusieurs Timesheets et Timesheet devrait appartenir à User", () => {
    expect(User.associations).toHaveProperty("timesheets");
    expect(Timesheet.associations).toHaveProperty("user");
  });

  it("ConstructionSite devrait avoir plusieurs Timesheets et Timesheet devrait appartenir à ConstructionSite", () => {
    expect(ConstructionSite.associations).toHaveProperty("timesheets");
    expect(Timesheet.associations).toHaveProperty("construction_site");
  });

  it("User devrait appartenir à plusieurs Competences et Competence devrait appartenir à plusieurs Users", () => {
    expect(User.associations).toHaveProperty("competences");
    expect(Competence.associations).toHaveProperty("users");
  });
});
