const mongoose = require("mongoose");
require("dotenv").config();
const UserModel = require("./model/user.js");

const testDB = async () => {
    const db_uri = process.env.DB_URI
    mongoose.set('strictQuery', false)
    try {
        // await mongoose.connect(process.env.MONGO_URI, {
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true,
        // });
        mongoose.connect(db_uri)
        
        const user = new UserModel({
            name: "Test User",
            email: "test@correo.com",
            password: "password123",
            role: "user",
            status: false,
            verificationCode: "123456"
        });

        await user.save();
        console.log("✅ Usuario de prueba creado");
        mongoose.disconnect();
    } catch (error) {
        console.error("❌ Error en testDB:", error);
    }
};

testDB();
