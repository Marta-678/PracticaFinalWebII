const express = require('express')
const UserModel=require('../model/user.js')
const {validatorRegister, validatorCode, validatorLogin, validatorPersonalData,validatorCompanyData}= require("../validators/user.js")
const {registerCtrl, validationCtrl, loginCtrl, PersonalDataCtrl, CompanyDataCtrl, LogoCtrl}= require("../controllers/users.js")
const userRouter = express.Router();

userRouter.post("/register", validatorRegister, registerCtrl);
userRouter.post("/validation/:token", validatorCode, validationCtrl);
userRouter.post("/login", validatorLogin, loginCtrl);
userRouter.put("/personalData/:token", validatorPersonalData, PersonalDataCtrl);
userRouter.put("/companyData/:token", [validatorCompanyData, validatorPersonalData], CompanyDataCtrl);
userRouter.patch("/companyData/:token", validatorCompanyData, LogoCtrl);

module.exports= userRouter;