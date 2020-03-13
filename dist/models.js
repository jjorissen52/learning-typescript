"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
//@ts-nocheck
const sequelize_1 = require("sequelize");
class User extends sequelize_1.Model {
}
const sequelize = new sequelize_1.Sequelize('sqlite:db.sqlite3');
class Project extends sequelize_1.Model {
}
class Address extends sequelize_1.Model {
}
Project.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    ownerId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    name: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    }
}, {
    sequelize,
    tableName: 'projects',
});
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    },
    preferredName: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: true
    }
}, {
    tableName: 'users',
    sequelize: sequelize,
});
Address.init({
    // userId: {
    //   type: DataTypes.INTEGER.UNSIGNED,
    // },
    address: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    }
}, {
    tableName: 'address',
    sequelize: sequelize,
});
// Here we associate which actually populates out pre-declared `association` static and other methods.
User.hasMany(Project, {
    sourceKey: 'id',
    foreignKey: 'ownerId',
    as: 'projects' // this determines the name in `associations`!
});
Address.belongsTo(User, { targetKey: 'id' });
User.hasOne(Address, { sourceKey: 'id' });
function stuff() {
    return __awaiter(this, void 0, void 0, function* () {
        // Please note that when using async/await you lose the `bluebird` promise context
        // and you fall back to native
        const newUser = yield User.create({
            name: 'Johnny',
            preferredName: 'John',
        });
        console.log(newUser.id, newUser.name, newUser.preferredName);
        const project = yield newUser.createProject({
            name: 'first!',
        });
        const ourUser = yield User.findByPk(1, {
            include: [User.associations.projects],
            rejectOnEmpty: true,
        });
        console.log(ourUser.projects[0].name); // Note the `!` null assertion since TS can't know if we included
        // the model or not
    });
}
exports.default = {
    User,
    Address,
    Project,
    sequelize
};
//# sourceMappingURL=models.js.map