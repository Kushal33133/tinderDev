const validator = require("validator");


const validateSihnUp = (req) =>{

    const {firstName, lastName,password,emailId} = req.body;
    
     if(!firstName || !lastName){
        throw new Error("First name and last name are required");
     }
     else if(!validator.isEmail(emailId)){
        throw new Error("Invalid Email ID");
     }
     else if(!validator.isStrongPassword(password)){
        throw new Error("Password is not strong enough");
     }




}


module.exports = {validateSihnUp}