const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    surname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    role: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

const Refresh_Token = sequelize.define('refresh_token', {
    id_user: {type: DataTypes.INTEGER, primaryKey: true, references: { model: User, key: 'id' }},
    refresh_token: {type: DataTypes.STRING, allowNull: true},
})

const Model = sequelize.define("model", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

const Type = sequelize.define("type", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

const Category = sequelize.define("category", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
});

const Bike = sequelize.define("bike", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    imgPath: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    inSell: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
});

const Service = sequelize.define("service", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
});

const Detail = sequelize.define("detail", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    imgPath: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    inSell: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
});

const Basket = sequelize.define("basket", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
});

const Order = sequelize.define("order", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    totalPrice: {
        type: DataTypes.DECIMAL(10, 2),    allowNull: false,
    },
});


// Связь User и Token (один пользователь может иметь один токенов)
User.hasOne(Refresh_Token, {foreignKey: 'userId',sourceKey: 'id'});
Refresh_Token.belongsTo(User, { foreignKey: 'userId',targetKey: 'id'});

// Связь Model и Bike (одна модель велосипеда может иметь много велосипедов)
Model.hasMany(Bike, { foreignKey: 'modelId' });
Bike.belongsTo(Model, { foreignKey: 'modelId' });

// Связь Type и Bike (один тип велосипеда может иметь много велосипедов)
Type.hasMany(Bike, { foreignKey: 'typeId' });
Bike.belongsTo(Type, { foreignKey: 'typeId' });

// Связь Category и Bike (одна категория велосипеда может иметь много велосипедов)
Category.hasMany(Bike, { foreignKey: 'categoryId' });
Bike.belongsTo(Category, { foreignKey: 'categoryId' });

// Связь Category и Service (одна категория сервиса может иметь много сервисов)
Category.hasMany(Service, { foreignKey: 'categoryId' });
Service.belongsTo(Category, { foreignKey: 'categoryId' });

// Связь Type и Service (один тип сервиса может иметь много сервисов)
Type.hasMany(Service, { foreignKey: 'typeId' });
Service.belongsTo(Type, { foreignKey: 'typeId' });

// Связь Model и Detail (одна модель детали может иметь много деталей)
Model.hasMany(Detail, { foreignKey: 'modelId' });
Detail.belongsTo(Model, { foreignKey: 'modelId' });

// Связь Type и Detail (один тип детали может иметь много деталей)
Type.hasMany(Detail, { foreignKey: 'typeId' });
Detail.belongsTo(Type, { foreignKey: 'typeId' });

// Связь Category и Detail (одна категория детали может иметь много деталей)
Category.hasMany(Detail, { foreignKey: 'categoryId' });
Detail.belongsTo(Category, { foreignKey: 'categoryId' });

// Связь User и Basket (один пользователь может иметь много корзин)
User.hasMany(Basket, { foreignKey: 'userId' });
Basket.belongsTo(User, { foreignKey: 'userId' });

// Связь Bike и Basket (один велосипед может быть в многих корзинах)
Bike.hasMany(Basket, { foreignKey: 'bikeId' });
Basket.belongsTo(Bike, { foreignKey: 'bikeId' });

// Связь Service и Basket (один сервис может быть в многих корзинах)
Service.hasMany(Basket, { foreignKey: 'serviceId' });
Basket.belongsTo(Service, { foreignKey: 'serviceId' });

// Связь Detail и Basket (одна деталь может быть в многих корзинах)
Detail.hasMany(Basket, { foreignKey: 'detailId' });
Basket.belongsTo(Detail, { foreignKey: 'detailId' });

// Связь Basket и Order (одна корзина может иметь много заказов)
Basket.hasMany(Order, { foreignKey: 'basketId' });
Order.belongsTo(Basket, { foreignKey: 'basketId' });

module.exports = { User, Token, Model, Type, Category, Bike, Service, Detail, Basket, Order };