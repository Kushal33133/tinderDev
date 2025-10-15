const mongoose = require("mongoose");
const validator = require("validatorjs")

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 4,
    maxLength: 30,
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
    required: true,
    unique:true,
    lowercase:true,
    // validate(value){
    //     if(!validator.isEmail(value)){
    //         throw new Error("Invalid Email ID");
    //     }
    // }
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    // min: 18,
    validate(value){
        if(!["male","female","other"].includes(value)){
            throw new Error("Gender must be male, female or other");
        }
    }
  },
  gender: {
    type: String,
  },
  photoUrl: {
    type: String,
    default:"https://avatars.githubusercontent.com/u/7790161?v=4",
    //   validate(value){
    //     if(!validator.isURL(value)){
    //         throw new Error("Invalid URL");
    //     }
    // }  
},
  about: {
    type: String,
    default: "Hey there! I am using DevTinder.",
  },
  skills: {
    type: [String],
  }
},
{
 timestamps: true,
}
);


// userSchema.methods.getJWT = async function(){
//   const user = this;
//   const token = await jwt.sign({ _id:user._id},"SECRET_KEY",{expiresIn:"1d"})
//   return token;
// }

const User = mongoose.model("User", userSchema);

module.exports = User;
