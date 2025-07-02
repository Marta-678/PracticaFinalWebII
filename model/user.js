const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      // required: true
    },
    lastName:{
      type: String
    },
    nif:{
      type: String
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },
    status:{
      type: String,
      enum: ['pending', 'verified'],
      default: 'pending'
    },
    verificationCode:{
      type: String
    },
    verificationAttempts:{
        type:Number,
        default:3
    },
    userType:{
      type: String, 
      enum: ["autonomo", "compania"],
      default:"autonomo"
    },
    

    company:{
      name:{type: String},
      cif: {type: String},
      street: {},
      number: {type:Number},
      postal: {type:Number},
      city: {type: String},
      province: {type: String}
    }
  },
  {
    timestamps: true, 
    versionKey: false
  }
);

UserSchema.plugin(mongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("users", UserSchema);


