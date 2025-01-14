const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    adress: { type: String, required: true },
    surname: { type: String, required: true },
});

const RefreshTokenSchema = new Schema({
    id_user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    refresh_token: { type: String, required: true },
});

const TypeServiceSchema = new Schema({
    name: { type: String, required: true },
});

const CategoryServiceSchema = new Schema({
    name: { type: String, required: true },
});

const ServiceSchema = new Schema({
    id_type_service: { type: Schema.Types.ObjectId, ref: "TypeService", required: true },
    id_category_service: { type: Schema.Types.ObjectId, ref: "CategoryService", required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    inSell: { type: Boolean, required: true },
    img: { type: String, required: true },
});

const TypePartSchema = new Schema({
    name: { type: String, required: true },
});

const CategoryPartSchema = new Schema({
    name: { type: String, required: true },
});

const PartSchema = new Schema({
    id_type_part: { type: Schema.Types.ObjectId, ref: "TypePart", required: true },
    id_category_part: { type: Schema.Types.ObjectId, ref: "CategoryPart", required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    model: { type: String, required: true },
    brand: { type: String, required: true },
    description: { type: String, required: true },
    img: { type: String, required: true },
    inSell: { type: Boolean, required: true },
});

const TypeBikeSchema = new Schema({
    name: { type: String, required: true },
});

const CategoryBikeSchema = new Schema({
    name: { type: String, required: true },
});

const BikeSchema = new Schema({
    id_type_bike: { type: Schema.Types.ObjectId, ref: "TypeBike", required: true },
    id_category_bike: { type: Schema.Types.ObjectId, ref: "CategoryBike", required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    model: { type: String, required: true },
    brand: { type: String, required: true },
    description: { type: String, required: true },
    img: { type: String, required: true },
    inSell: { type: Boolean, required: true },
});

const BasketSchema = new Schema({
    id_user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    cost: { type: Number, required: false },
    status: { type: String, required: true },
    date: { type: Date, required: true },
});

const ServiceOrderSchema = new Schema({
    id_service: { type: Schema.Types.ObjectId, ref: "Service", required: true },
    id_basket: { type: Schema.Types.ObjectId, ref: "Basket", required: true },
});

const PartOrderSchema = new Schema({
    id_part: { type: Schema.Types.ObjectId, ref: "Part", required: true },
    id_basket: { type: Schema.Types.ObjectId, ref: "Basket", required: true },
});

const BikeOrderSchema = new Schema({
    id_bike: { type: Schema.Types.ObjectId, ref: "Bike", required: true },
    id_basket: { type: Schema.Types.ObjectId, ref: "Basket", required: true },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);
const RefreshToken = mongoose.models.RefreshToken || mongoose.model("RefreshToken", RefreshTokenSchema);
const TypeService = mongoose.models.TypeService || mongoose.model("TypeService", TypeServiceSchema);
const CategoryService = mongoose.models.CategoryService || mongoose.model("CategoryService", CategoryServiceSchema);
const Service = mongoose.models.Service || mongoose.model("Service", ServiceSchema);
const TypePart = mongoose.models.TypePart || mongoose.model("TypePart", TypePartSchema);
const CategoryPart = mongoose.models.CategoryPart || mongoose.model("CategoryPart", CategoryPartSchema);
const Part = mongoose.models.Part || mongoose.model("Part", PartSchema);
const TypeBike = mongoose.models.TypeBike || mongoose.model("TypeBike", TypeBikeSchema);
const CategoryBike = mongoose.models.CategoryBike || mongoose.model("CategoryBike", CategoryBikeSchema);
const Bike = mongoose.models.Bike || mongoose.model("Bike", BikeSchema);
const Basket = mongoose.models.Basket || mongoose.model("Basket", BasketSchema);
const ServiceOrder = mongoose.models.ServiceOrder || mongoose.model("ServiceOrder", ServiceOrderSchema);
const PartOrder = mongoose.models.PartOrder || mongoose.model("PartOrder", PartOrderSchema);
const BikeOrder = mongoose.models.BikeOrder || mongoose.model("BikeOrder", BikeOrderSchema);

module.exports = {
    User,
    RefreshToken,
    TypeService,
    CategoryService,
    Service,
    TypePart,
    CategoryPart,
    Part,
    TypeBike,
    CategoryBike,
    Bike,
    Basket,
    ServiceOrder,
    PartOrder,
    BikeOrder,
};