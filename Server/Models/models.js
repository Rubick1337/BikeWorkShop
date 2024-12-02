const sequelize = require("../db")
const {DataTypes} = require('sequelize')

const User = sequelize.define("User", {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    role: {type: DataTypes.STRING, allowNull: false},
    adress: {type: DataTypes.STRING, allowNull: false},
    surname: {type: DataTypes.STRING, allowNull: false},

})
const Refresh_Token = sequelize.define("Refresh_token", {
    id_user: {type: DataTypes.INTEGER, allowNull: false,primaryKey: true,references: {model:User, key: "id"}},
    refresh_token: {type: DataTypes.STRING, allowNull: true},
})

const  TypeService = sequelize.define("TypeService", {
    id: {type: DataTypes.INTEGER, allowNull: false,primaryKey: true,autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
})
const CategoryService = sequelize.define("CategoryService", {
    id: {type: DataTypes.INTEGER, allowNull: false,primaryKey: true,autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
})
const Service = sequelize.define("Service", {
    id: {type: DataTypes.INTEGER, allowNull: false,primaryKey: true,autoIncrement: true},
    id_type_service: {type: DataTypes.INTEGER, allowNull: false,references: {model:TypeService, key: "id"}},
    id_category_service: {type: DataTypes.INTEGER, allowNull: false,references: {model:CategoryService, key: "id"}},
    name: {type: DataTypes.STRING, allowNull: false},
    price: {type: DataTypes.DECIMAL, allowNull: false},
})
const  TypePart = sequelize.define("TypePart", {
    id: {type: DataTypes.INTEGER, allowNull: false,primaryKey: true,autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
})
const CategoryPart = sequelize.define("CategoryPart", {
    id: {type: DataTypes.INTEGER, allowNull: false,primaryKey: true,autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
})
const Part = sequelize.define("Part", {
    id: {type: DataTypes.INTEGER, allowNull: false,primaryKey: true,autoIncrement: true},
    id_type_part: {type: DataTypes.INTEGER, allowNull: false,references: {model:TypePart, key: "id"}},
    id_category_part: {type: DataTypes.INTEGER, allowNull: false,references: {model:CategoryPart, key: "id"}},
    name: {type: DataTypes.STRING, allowNull: false},
    price: {type: DataTypes.DECIMAL, allowNull: false},
    model: {type: DataTypes.STRING, allowNull: false},
    brand: {type: DataTypes.STRING, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false},
    inSell: {type: DataTypes.BOOLEAN, allowNull: false},
})
const  TypeBike = sequelize.define("TypeBike", {
    id: {type: DataTypes.INTEGER, allowNull: false,primaryKey: true,autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
})
const CategoryBike = sequelize.define("CategoryBike", {
    id: {type: DataTypes.INTEGER, allowNull: false,primaryKey: true,autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
})
const Bike = sequelize.define("Bike", {
    id: {type: DataTypes.INTEGER, allowNull: false,primaryKey: true,autoIncrement: true},
    id_type_bike: {type: DataTypes.INTEGER, allowNull: false,references: {model:TypeBike, key: "id"}},
    id_category_bike: {type: DataTypes.INTEGER, allowNull: false,references: {model:CategoryBike, key: "id"}},
    name: {type: DataTypes.STRING, allowNull: false},
    price: {type: DataTypes.DECIMAL, allowNull: false},
    model: {type: DataTypes.STRING, allowNull: false},
    brand: {type: DataTypes.STRING, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false},
    inSell: {type: DataTypes.BOOLEAN, allowNull: false},
})
const Basket = sequelize.define("Basket", {
    id: {type: DataTypes.INTEGER, allowNull: false,primaryKey: true,autoIncrement: true},
    id_user: {type: DataTypes.INTEGER, allowNull: false,references: {model:User, key: "id"}},
    cost: {type: DataTypes.DECIMAL, allowNull: true},
    status: {type: DataTypes.STRING, allowNull: false},
    date: {type: DataTypes.DATE, allowNull: false},
})
const ServiceOrder = sequelize.define("ServiceOrder", {
    id: {type: DataTypes.INTEGER, allowNull: false,primaryKey: true,autoIncrement: true},
    id_service: {type: DataTypes.INTEGER, allowNull: false,references: {model:Service, key: "id"}},
    id_basket: {type: DataTypes.INTEGER, allowNull: false,references: {model:Basket, key: "id"}},
})
const PartOrder = sequelize.define("PartOrder", {
    id: {type: DataTypes.INTEGER, allowNull: false,primaryKey: true,autoIncrement: true},
    id_service: {type: DataTypes.INTEGER, allowNull: false,references: {model:Part, key: "id"}},
    id_basket: {type: DataTypes.INTEGER, allowNull: false,references: {model:Basket, key: "id"}},
})
const BikeOrder = sequelize.define("BikeOrder", {
    id: {type: DataTypes.INTEGER, allowNull: false,primaryKey: true,autoIncrement: true},
    id_service: {type: DataTypes.INTEGER, allowNull: false,references: {model:Bike, key: "id"}},
    id_basket: {type: DataTypes.INTEGER, allowNull: false,references: {model:Basket, key: "id"}},
})

User.hasOne(Refresh_Token, {foreignKey: 'id_user',sourceKey: 'id', as: 'refresh_token'});
Refresh_Token.belongsTo(User, { foreignKey: 'id_user',targetKey: 'id', as: 'user'});

TypeService.hasMany(Service, {foreignKey: 'id_type_service',sourceKey: 'id', as: 'Service'});
Service.belongsTo(TypeService, { foreignKey: 'id_type_service',targetKey: 'id', as: 'TypeService' });

CategoryService.hasMany(Service, {foreignKey: 'id_category_service',sourceKey: 'id', as: 'Service'});
Service.belongsTo(CategoryService, { foreignKey: 'id_category_service',targetKey: 'id', as: 'CategoryService' });

TypePart.hasMany(Part, {foreignKey: 'id_type_part',sourceKey: 'id', as: 'Part'});
Part.belongsTo(TypePart, { foreignKey: 'id_type_part',targetKey: 'id', as: 'TypePart' });

CategoryPart.hasMany(Part, {foreignKey: 'id_category_part',sourceKey: 'id', as: 'Part'});
Part.belongsTo(CategoryPart, { foreignKey: 'id_category_part',targetKey: 'id', as: 'CategoryPart' });

TypeBike.hasMany(Bike, {foreignKey: 'id_type_bike',sourceKey: 'id', as: 'Bike'});
Bike.belongsTo(TypeBike, { foreignKey: 'id_type_bike',targetKey: 'id', as: 'TypeBike' });

CategoryBike.hasMany(Bike, {foreignKey: 'id_category_bike',sourceKey: 'id', as: 'Bike'});
Bike.belongsTo(CategoryBike, { foreignKey: 'id_category_bike',targetKey: 'id', as: 'CategoryBike' });

Service.hasMany(ServiceOrder, {foreignKey: 'id_service',sourceKey: 'id', as: 'ServiceOrder'});
ServiceOrder.belongsTo(Service, { foreignKey: 'id_service',targetKey: 'id', as: 'Service' });

Part.hasMany(PartOrder, {foreignKey: 'id_part',sourceKey: 'id', as: 'PartOrder'});
PartOrder.belongsTo(Part, { foreignKey: 'id_part',targetKey: 'id', as: 'Part' });

Bike.hasMany(BikeOrder, {foreignKey: 'id_bike',sourceKey: 'id', as: 'BikeOrder'});
BikeOrder.belongsTo(Bike, { foreignKey: 'id_bike',targetKey: 'id', as: 'Bike' });

User.hasMany(Basket, {foreignKey: 'id_user',sourceKey: 'id', as: 'Basket'});
Basket.belongsTo(User, { foreignKey: 'id_user',targetKey: 'id', as: 'User' });

Basket.hasMany(ServiceOrder, {foreignKey: 'id_basket',sourceKey: 'id', as: 'ServiceOrder'});
ServiceOrder.belongsTo(Basket, { foreignKey: 'id_basket',targetKey: 'id', as: 'Basket' });

Basket.hasMany(PartOrder, {foreignKey: 'id_basket',sourceKey: 'id', as: 'PartOrder'});
PartOrder.belongsTo(Basket, { foreignKey: 'id_basket',targetKey: 'id', as: 'Basket' });

Basket.hasMany(BikeOrder, {foreignKey: 'id_basket',sourceKey: 'id', as: 'BikeOrder'});
BikeOrder.belongsTo(Basket, { foreignKey: 'id_basket',targetKey: 'id', as: 'Basket' });

module.exports = {
    User,
    Refresh_Token,
    Basket,
    ServiceOrder,
    PartOrder,
    BikeOrder,
    TypeBike,
    TypePart,
    TypeService,
    CategoryPart,
    CategoryBike,
    CategoryService,
    Bike,
    Part,
    Service,
}