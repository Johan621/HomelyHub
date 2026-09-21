//user Schema

import mongoose, { mongo } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import crypto from "node:crypto";
import { kMaxLength } from "node:buffer";

const userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"Please enter your name"],
            // '        Johan        ' ==> 'Johan'
            trim:true,
            maxlength: [50,"your name cannot be longer than 50 characters"],
        },
        email:{
            type:String,
            required:[true,"Please enter email id"],
            unique:true,
            lowercase:true,
            trim:true,
            validate:[validator.isEmail,"Please enter valid email address"]
        },
        password:{
            type:String,
            required:[true,"Please enter password."],
            minlength:[6,"Your password must be longer than 6 characters"],
            select:false,
        },
        passwordConfirm:{
            type:String,
            required:[true,"Please confirm your password"],
            validate:{
                validator:function(el){
                    return el === this.password;
                },
                message:"Password are not same !"
            }

        },
        phoneNumber:{
            type:String,
            required:true,
            unique:true,
            trim:true,
        },
        role:{
            type:String,
            enum: ["user","admin"],
            default:"user"
        },
        avatar:{
            url:{type:String},
            public_id:{type:String}
        },
        passwordChangedAt:{
            type:Date,
        },
        passwordResetToken:{
            type:String,
            select:false,
            index:true
        },
        passwordRestExpires:{
            type:Date,
            select:false
        },
    },
    {timestamps:true}
)


//settings to not pass in response from server
userSchema.set("toJSON",{
    transform:function (doc,ret){
        delete ret.password;
        delete ret.passwordConfirm;
        delete ret.passwordResetToken;
        delete ret.passwordRestExpires;
        delete ret.__v;
        return ret;
    }
})

//password logic bcrypt
//Hashing

userSchema.pre("save",async function(){
    if(!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password,12)
    this.passwordConfirm = undefined;

})

//login check
//test123 === engggrj567hbeghj65 
//hashed password cannot be reversed for that we are using this
userSchema.methods.correctPassword = async function(candidatePassword, userPassword){
    return await bcrypt.compare(candidatePassword, userPassword);
}

//
userSchema.methods.changePasswordAfter = function(JWTTimestamp){
    if(this.passwordChangedAt){
        const changedTimestamp = parseInt(
            this.passwordChangedAt.getTime()/1000, 
            10
        );
        return JWTTimestamp < changedTimestamp
    }
    return false;
}

//forgot password
userSchema.methods.createPasswordResetToken = function(){
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto.createHash("sha256")
    .update(resetToken)
    .digest("hex");
    
    this.passwordResetExpires = Date.now() +10 *60 *1000;
    return resetToken;
}

const User = mongoose.model("User", userSchema);
//in mongodb: users automatically changes User => users
export {User};