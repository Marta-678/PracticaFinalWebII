const { matchedData } = require("express-validator");
const { encrypt, compare } = require("../utils/handlePassword");
const  usersModel = require("../model/user.js")
const { handleHttpError , handleEmailExistError } = require("../utils/handleError");
const { tokenSign, verifyToken } = require("../utils/handleJwt.js");

const registerCtrl = async (req, res) => {
    try{
        // filtrar los datos para info no válida
        req=matchedData(req);
        console.log("Datos recibidos:", req);
        const existingUser = await usersModel.findOne({ email: req.email });
        if(existingUser){
            console.log("El email ya está registrado.");
            return handleEmailExistError(res,"EMAIL YA REGISTRADO");
        }
        const verificationCode = Math.floor(100000 + Math.random() * 900000);
        // cifrear contraseña
        const password= await encrypt(req.password);
        console.log("Contraseña cifrada:", password);

        const user = await usersModel.create({ ...req, password, verificationCode, verificationAttempts: 3 });
        console.log("Usuario creado en la base de datos:", user);

        // user.set("password", undefined, { strict: false });
        res.send({ token: await tokenSign(user), user });
        
    }catch (error){
        console.error("Error en registerCtrl:", error);
        handleHttpError(res, "ERROR_REGISTER_USER");
    }
}

const validationCtrl= async (req, res)=> {
    try{
        const token= req.params.token;
        const code=req.body.verificationCode;
        
        if(!token){
            console.log("Token no proporcionado.");
            return handleHttpError(res, "TOKEN_FALTANTE");
        }
        
        //se obtiene el código del token 
        const decoded= verifyToken(token);
        
        if (!decoded) {
            console.log("Token no válido o expirado.");
            return handleHttpError(res, "TOKEN_INVALIDO");
        }

        const user = await usersModel.findById(decoded._id);

        if(!user){
            return handleHttpError(res, "USUARIO_NO_ENCONTRADO");
        }
        
        

        if(user.verificationAttempts<=0){
            return handleHttpError(res, "ATTEMPTS_LIMIT");
        }

        //comprobar si el código es correcto
        if(user.verificationCode!==code){
            console.log("Código de verificación incorrecto.");
            user.verificationAttempts-=1;
            await user.save();
            return handleHttpError(res, "CÓDIGO_INCORRECTO");
        }

        user.status= 'verified';
        await user.save();
        console.log("Usuario verificado:", user);
        return res.status(200).json({ message: "Usuario verificado correctamente" });
        
    }catch (error){
        console.error("Error en validationCtrl:", error);
        handleHttpError(res, "ERROR_VALIDATION_CODE");
    }
}

const loginCtrl= async (req, res)=>{
    try {
        req = matchedData(req);
        const user = await usersModel.findOne({ email: req.email });
        if (!user) return handleHttpError(res, "USER_NOT_EXISTS", 404);
        
        const check = await compare(req.password, user.password);
        if (!check) return handleHttpError(res, "INVALID_PASSWORD", 401);
        
        user.set("password", undefined, { strict: false });
        //si las credenciales son correctas, se crea el token con las credenciales del usuario. el token será unico para cada sesión
        res.send({ token: await tokenSign(user), user });
    } catch (err) {
        handleHttpError(res, "ERROR_LOGIN_USER");
    }
}


const PersonalDataCtrl= async (req,res) => {
    try{
        
        console.log(req.body.name, req.body.lastName, req.body.nif);
        const token= req.params.token;

        if(!token){
            return handleHttpError(res, "TOKEN_FALTANTE");
        }

        const decoded = verifyToken(token);

        if (!decoded) {
            return handleHttpError(res, "TOKEN_INVALIDO");
        }

        const user = await usersModel.findById(decoded._id);

        if(!user){
            return handleHttpError(res, "USUARIO_NO_ENCONTRADO");
        }

        user.name = req.body.name;
        user.lastName = req.body.lastName;
        user.nif = req.body.nif;

        await user.save();

        console.log(user.lastName, user.name, user.nif);

        res.send({ message: "Datos personales actualizados correctamente", user });


    }catch(err){
        console.error(err);
        handleHttpError(res, "ERROR_VALIDATION_PERSONAL_DATA");
    }
}


const CompanyDataCtrl= async (req,res) => {
    try{
        
        console.log(req.body);
        // console.log(req.body.name, req.body.lastName, req.body.nif);
        
        // const token= req.params.token;

        // if(!token){
        //     return handleHttpError(res, "TOKEN_FALTANTE");
        // }

        // const decoded = verifyToken(token);

        // if (!decoded) {
        //     return handleHttpError(res, "TOKEN_INVALIDO");
        // }

        // const user = await usersModel.findById(decoded._id);

        // if(!user){
        //     return handleHttpError(res, "USUARIO_NO_ENCONTRADO");
        // }

        // user.name = req.body.name;
        // user.lastName = req.body.lastName;
        // user.nif = req.body.nif;

        // await user.save();

        // console.log(user.lastName, user.name, user.nif);

        // res.send({ message: "Datos personales actualizados correctamente", user });


    }catch(err){
        console.error(err);
        handleHttpError(res, "ERROR_VALIDATION_PERSONAL_DATA");
    }
}

const LogoCtrl= ()=>{

}

module.exports={registerCtrl, validationCtrl, loginCtrl, PersonalDataCtrl, CompanyDataCtrl, LogoCtrl}