const sequelize = require("../config/database");
const User = require("./User");
const Role = require("./Role");
const Task = require("./Task");
const Timesheet = require("./Timesheet");
const ConstructionSite = require("./ConstructionSite");
const Competence = require("./Competence");

// Associations

// Un utilisateur appartient à un rôle
User.belongsTo(Role, { foreignKey: "role_id" });
Role.hasMany(User, { foreignKey: "role_id" });

// Un utilisateur peut être assigné à plusieurs tâches
User.hasMany(Task, { foreignKey: "user_id" });
Task.belongsTo(User, { foreignKey: "user_id" });

// Un chantier peut contenir plusieurs tâches
ConstructionSite.hasMany(Task, { foreignKey: "construction_site_id" });
Task.belongsTo(ConstructionSite, { foreignKey: "construction_site_id" });

// Un utilisateur peut avoir plusieurs feuilles de temps (timesheets)
User.hasMany(Timesheet, { foreignKey: "user_id" });
Timesheet.belongsTo(User, { foreignKey: "user_id" });

// Un chantier peut être associé à plusieurs feuilles de temps
ConstructionSite.hasMany(Timesheet, { foreignKey: "construction_site_id" });
Timesheet.belongsTo(ConstructionSite, { foreignKey: "construction_site_id" });

// Relation N-N entre `users` et `competences`
User.belongsToMany(Competence, { through: "user_competences", foreignKey: "user_id" });
Competence.belongsToMany(User, { through: "user_competences", foreignKey: "competence_id" });

module.exports = { sequelize, User, Role, Task, Timesheet, ConstructionSite, Competence };