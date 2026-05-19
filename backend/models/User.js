const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        minlength:[2,"fullname should contain min 2"],
        required:[true,"please enter fullname"],
        maxlength:[50,"fullname should only contain 50"]
    },
      email:{
        type:String,
        require:[true,"please enter email"],
        unique:[true,"this email already exists"]
    },
      password:{
        type:String,
        minlength:[2,"password should contain min 2"],
        required:[true,"please enter password"],
       
    },
    status:{
        type:Boolean,
        default:true,
       
    },
},{
  timestamps: true
})

userSchema.pre("save", async function(){
  if(this.isModified("password")){
    this.password = await bcrypt.hash(this.password,10)
  }
})
const User = mongoose.model("User",userSchema);
module.exports = User;