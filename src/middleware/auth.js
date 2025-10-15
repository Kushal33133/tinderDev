const jwt = require("jsonwebtoken");
const User = require("../modals/user");

const userAuth = async (req,res,next)=>{

  try {
      const cookies = req.cookies;
    const {token} = cookies;

    if(!token){
        res.status(401).send("Unauthorized: No token provided");
    }

    const decodedObj = await jwt.verify(token,"SECRET_KEY");
    
    const {_id} = decodedObj;
    const user  = await User.findById(_id);
    if(!user){
        res.status(401).send("Unauthorized: No user found");
    }

    req.user = user;
    next();
    
  } catch (error) {

    res.status(500).send(`Error creating user: ${error.message}`);
    
  }

};


module.exports = {userAuth};